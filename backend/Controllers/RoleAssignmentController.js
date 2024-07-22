const UserRole = require('../database/models/UserRole');
const RoleScope = require('../database/models/RoleScope');
const exceptionHandler = require('../utilities/Exceptions');
// const KafkaProducer = require('../kafka/Producer');

/**
 *
 * @summary This function will assign provided role to provided user in provided tenant
 * @param {number} userId Unique id of the user
 * @param {number} tenantId Unique id of the tenant
 * @param {number} roleId Unique id of the role
 * @returns {object} Object containg result with data or error with message
 * @example assignRole(number, number, number)
 */
const assignRole = async function (body, tenantId) {
	try {
		console.log('BODY => ', body);
		const data = await UserRole.query().insertGraph({
			user_id: body.user_id,
			tenant_id: tenantId,
			role_id: body.role_id,
			role_scopes: {
				user_role_id: body.role_id,
				team_id: body.team_id,
			},
		});

	

		return { result: { status: 201, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const updateUserRoleScopes = async function ({ user_teams }, tenantId) {
	const trx = await UserRole.startTransaction();
	try {
		const teams = user_teams.filter((x) => {
			return x.role_id !== 12 && x.role_id !== 11;
		});
		if (teams.length >= 1) {
			const userRoles = await UserRole.query(trx)
				.where({
					user_id: teams[0].user_id,
				})
				.whereNotIn('role_id', [11, 12])
				.withGraphFetched('role_scopes');

			let tempArr = [];
			teams.map((user_team) => {
				if (!tempArr.find((element) => element.role_id === user_team.role_id)) {
					tempArr.push(user_team);
				}
			});

			tempArr = tempArr.map((user) => {
				let userRoleObject = userRoles.find(userRole => userRole.role_id === user.role_id && userRole.user_id === user.user_id && userRole.tenant_id === tenantId) ? userRoles.find(userRole => userRole.role_id === user.role_id && userRole.user_id === user.user_id && userRole.tenant_id === tenantId) : null;

				return {
					...(userRoleObject && { id: userRoleObject.id }),
					user_id: user.user_id,
					role_id: user.role_id,
					tenant_id: tenantId,
					role_scopes: teams
						.map((userTeam) => {
							if (user.role_id == userTeam.role_id) {
								return {
									team_id: userTeam.team_id,
								};
							}
							return false;
						})
						.filter((element) => element.team_id),
				};
			});


			userRoles.map(async userRole => {
				if (!tempArr.find(e => userRole.id === e.id)) {
					await UserRole.query(trx).deleteById(userRole.id);
				}
			});

			await UserRole.query(trx).upsertGraph(tempArr);
		}

		await trx.commit();

		return { result: { status: 200, data: 'User role updated' } };
	} catch (err) {
		await trx.rollback();
		return { error: exceptionHandler.getError(err) };
	}
};

const updateTeamRoleScopes = async function ({ user_teams }, tenantId) {
	const trx = await UserRole.startTransaction();
	try {
		let userRole, roleScope;
		const teams = user_teams.filter((x) => {
			return x.role_id !== 12 && x.role_id !== 11;
		});
		if (teams.length >= 1) {

			for (let i = 0; i < teams.length; i++) {
				userRole = await UserRole.query(trx)
					.where({
						user_id: teams[i].user_id,
						role_id: teams[i].role_id,
						tenant_id: tenantId,
					})
					.first();
				if (userRole) {
					roleScope = await RoleScope.query(trx).where({ user_role_id: userRole.id, team_id: teams[i].team_id }).first();
					if (!roleScope) {
						await RoleScope.query(trx).insert({
							user_role_id: userRole.id,
							team_id: teams[i].team_id,
						});
					}
				} else {
					await UserRole.query(trx).insertGraph({
						user_id: teams[i].user_id,
						role_id: teams[i].role_id,
						tenant_id: tenantId,
						role_scopes: [{ team_id: user_teams[i].team_id }],
					});
				}

			}

			let team_user_roles;
			team_user_roles = await RoleScope.query(trx).where({
				team_id: teams[0].team_id,
			}).withGraphFetched('user_role.role_scopes');
			team_user_roles = team_user_roles.map((x) => { return x.user_role; });

			for (let i = 0; i < team_user_roles.length; i++) {
				const userRole = team_user_roles[i];
				if (!teams.find(e => userRole.user_id === e.user_id && userRole.role_id === e.role_id)) {
					if (userRole.role_scopes.length > 1) {
						await RoleScope.query(trx).delete().where({ user_role_id: userRole.id, team_id: teams[0].team_id });
					} else {
						await UserRole.query(trx).deleteById(userRole.id);
					}
				}
			}
		}

		await trx.commit();

		return { result: { status: 200, data: 'Team role updated' } };
	} catch (err) {
		await trx.rollback();
		console.log('error===>', err);
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will remove provided role against provided user in provided tenant
 * @param {number} userId Unique id of the user
 * @param {number} tenantId Unique id of the tenant
 * @param {number} roleId Unique id of the role
 * @returns {object} Object containg result with data or error with message
 * @example removeRole(number, number, number)
 */
const removeRole = async function (userId, tenantId, roleId, team_id) {
	try {
		const roles = await RoleScope.query().where({
			team_id: team_id,
		});

		for (let i = 0; i < roles.length; i++) {
			await UserRole.query()
				.delete()
				.where({
					user_id: userId,
					tenant_id: tenantId,
					role_id: roleId,
					id: roles[i],
				})
				.throwIfNotFound();
		}

		console.log(roles);


		return { result: { status: 200, message: 'Role removed' } };
	} catch (err) {
		console.log('ERROR => ', err);
		return { error: exceptionHandler.getError(err) };
	}
};
const removeTeamRole = async function (userId, tenantId, roleId, team_id) {
	try {
		const roles = await RoleScope.query().select('user_role_id').where({
			team_id: team_id,
		});
		// console.log('ROLES => ', roles);
		for (let i = 0; i < roles.length; i++) {
			console.log('ROLES => ', roles[i].user_role_id);
			await UserRole.query()
				.delete()
				.where({
					id: Number(roles[i].user_role_id),
				})
				.throwIfNotFound();
		}

		console.log(roles);

		

		return { result: { status: 200, message: 'Role removed' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will list roles assigned against provided tenant
 * @param {number} tenantId
 * @returns {object} Object containg result with data or error with message
 * @example listRole(number)
 */
const listRole = async function (tenantId, { expand } = {}) {
	try {
		const data = await UserRole.query()
			// .select('*', 'roles.role_name')
			.withGraphFetched(expand)
			// .joinRelated('roles')
			.where({ tenant_id: tenantId })
			.throwIfNotFound();
		return { result: { status: 200, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const getChild = async function (user, expand) {
	try {
		console.log('Child => ', expand);
		const data = await UserRole.query()
			// .select('*', 'roles.role_name')
			.withGraphJoined(expand)
			// .joinRelated(expand)
			// .joinRelated('role_scopes')
			.where({ tenant_id: user.tenant_id, user_id: user.id })
			.throwIfNotFound();
		return { result: { status: 200, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const getChildById = async function (user, tenant_id, expand) {
	try {
		console.log('Child => ', expand);
		const data = await UserRole.query()
			// .select('*', 'roles.role_name')
			.withGraphJoined(expand)
			// .joinRelated(expand)
			// .joinRelated('role_scopes')
			.where({ tenant_id: tenant_id, user_id: user })
			.throwIfNotFound();
		return { result: { status: 200, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const updateUserTeams = async function (body, tenant_id) {
	try {
		// let user_role_data = [];
		for (let i = 0; i < body.length; i++) {
			const userRole = await UserRole.query()
				.joinRelated('role_scopes')
				.where({
					user_id: body[i].user_id,
					tenant_id,
					team_id: body[i].team_id,
				})
				.first();

			if (userRole) {
				await UserRole.query()
					.patch({ role_id: body[i].role_id })
					.findById(userRole.id);
			}
		}

		return { result: { status: 200, data: 'Update Successfully' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = {
	assignRole,
	updateUserRoleScopes,
	removeRole,
	removeTeamRole,
	listRole,
	getChild,
	getChildById,
	updateUserTeams,
	updateTeamRoleScopes
};
