import React, { useState } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import moment, { Moment } from 'moment/moment';
import Spinner from '../../components/bootstrap/Spinner';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import Label from '../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';
import SuccessImg from '../../assets/success-page.png';
import { dashboardPagesMenu } from '../../menu';

const GitHubAccessPage = () => {
	const { themeStatus } = useDarkMode();

	const [successPageStatus, setSuccessPageStatus] = useState<boolean>(false);
	const [lastSave, setLastSave] = useState<Moment | null>(
		moment(localStorage.getItem('facit_githubRequestTime')).isValid()
			? moment(localStorage.getItem('facit_githubRequestTime'))
			: null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const encode = (data: { [x: string]: string | boolean }) => {
		return Object.keys(data)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&');
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			username: '',
			purchaseCodes: '',
			emailSave: true,
		},
		validate: (values) => {
			const errors: { email?: string; username?: string; purchaseCodes?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.username) {
				errors.username = 'Required field.';
			} else if (values.username.length < 3) {
				errors.username = 'Must be 3 characters or more.';
			}

			if (!values.purchaseCodes) {
				errors.purchaseCodes = 'Required field.';
			} else if (values.purchaseCodes.length < 36) {
				errors.purchaseCodes = 'Must be 36 characters or more.';
			}

			return errors;
		},
		onSubmit: (values) => {
			console.log(values);

			setIsLoading(true);
			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: encode({ 'form-name': 'GitHubRequest', ...values }),
			})
				.then(() => {
					setIsLoading(false);
					setLastSave(moment());

					localStorage.setItem('facit_githubRequestTime', moment().format());

					if (values.name !== '') {
						localStorage.setItem('facit_githubRequestName', values.name);
					}
					setSuccessPageStatus(true);
				})
				.catch((error) => alert(error));
		},
	});

	return (
		<PageWrapper title={dashboardPagesMenu.github.text + ' Request'}>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Github' />
					<span>
						Access request to <strong>Github</strong> repository
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					{!successPageStatus && (
						<Button
							icon={isLoading ? undefined : 'Send'}
							isLight
							color={lastSave ? 'info' : 'success'}
							isDisable={isLoading || !formik.isValid}
							onClick={formik.handleSubmit}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading
								? (lastSave && 'Submitting again') || 'Submitting'
								: (lastSave && 'Submit again') || 'Submit'}
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				{successPageStatus ? (
					<div className='row d-flex align-items-center h-100'>
						<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
							<div
								className='text-success fw-bold'
								style={{ fontSize: 'calc(2rem + 2vw)' }}>
								Success! 🎉
							</div>
							<div
								className='text-dark fw-bold'
								style={{ fontSize: 'calc(1rem + 1vw)' }}>
								Your request has reached us. Will be processed within 24 hours.
							</div>
						</div>
						<div className='col-12 d-flex align-items-baseline justify-content-center'>
							<img src={SuccessImg} alt='Success' style={{ height: '50vh' }} />
						</div>
					</div>
				) : (
					<>
						<form
							name='GitHubRequest'
							onSubmit={formik.handleSubmit}
							className='row h-100 align-content-start'>
							<input type='hidden' name='form-name' value='GitHubRequest' />
							<div className='col-md-8'>
								<Card>
									<CardHeader>
										<CardLabel icon='Person' iconColor='info'>
											<CardTitle>Personal Information</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											<FormGroup
												id='name'
												label='Name'
												className='col-md-6'
												isFloating>
												<Input
													autoComplete='name'
													onChange={formik.handleChange}
													value={formik.values.name}
												/>
											</FormGroup>
											<FormGroup
												id='email'
												label='Email'
												formText='Enter your GitHub email address.'
												className='col-md-6'
												isFloating>
												<Input
													autoComplete='email'
													onChange={formik.handleChange}
													value={formik.values.email}
													onBlur={formik.handleBlur}
													isValid={formik.isValid}
													isTouched={formik.touched.email}
													invalidFeedback={formik.errors.email}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</CardBody>
								</Card>
								<Card>
									<CardHeader>
										<CardLabel icon='Storefront' iconColor='success'>
											<CardTitle>Envato Information</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											<FormGroup
												id='username'
												label='Themeforest Username'
												className='col-12'
												isFloating>
												<Input
													autoComplete='username'
													onChange={formik.handleChange}
													value={formik.values.username}
													onBlur={formik.handleBlur}
													isValid={formik.isValid}
													isTouched={formik.touched.username}
													invalidFeedback={formik.errors.username}
													validFeedback='Looks good!'
												/>
											</FormGroup>
											<FormGroup
												id='purchaseCodes'
												label='Purchase codes'
												formText={
													<>
														If you don't know, you can find it{' '}
														<a
															href='https://themeforest.net/item/facit-react-admin-dashboard-template/33296086/support'
															target='_blank'
															rel='noreferrer'>
															here
														</a>
														.
													</>
												}
												className='col-12'
												isFloating>
												<Input
													onChange={formik.handleChange}
													value={formik.values.purchaseCodes}
													onBlur={formik.handleBlur}
													isValid={formik.isValid}
													isTouched={formik.touched.purchaseCodes}
													invalidFeedback={formik.errors.purchaseCodes}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card className='position-sticky sticky-top-size'>
									<CardHeader>
										<CardLabel icon='MarkEmailUnread'>
											<CardTitle>Email notification</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row'>
											<div className='col-12'>
												<FormGroup>
													<Label>
														Select the lists where you want your email
														address saved.
													</Label>
													<ChecksGroup>
														<Checks
															type='switch'
															id='inlineCheckOne'
															label='Updates notifications'
															name='emailSave'
															onChange={formik.handleChange}
															checked={formik.values.emailSave}
														/>
													</ChecksGroup>
												</FormGroup>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</form>
						<div className='row'>
							<div className='col-12'>
								<Card>
									<CardBody>
										<div className='row align-items-center'>
											<div className='col'>
												{lastSave ? (
													<>
														<Icon
															icon='DoneAll'
															size='lg'
															className='me-2 text-muted'
														/>
														<span className='me-2 text-muted'>
															The date you submit your request.
														</span>
														<strong>
															{moment(lastSave).format(
																'MMMM Do, YYYY - HH:mm',
															)}
														</strong>
													</>
												) : (
													<>
														<Icon
															icon='Warning'
															size='lg'
															className='me-2 text-warning'
														/>
														<span className='text-warning'>
															You have not submitted a request before.
															(It may take 24 hours.)
														</span>
													</>
												)}
											</div>
											<div className='col-auto'>
												<div className='row g-1'>
													<div className='col-auto'>
														<Button
															className='me-3'
															icon={isLoading ? undefined : 'Send'}
															isLight
															color={lastSave ? 'info' : 'success'}
															isDisable={isLoading || !formik.isValid}
															onClick={formik.handleSubmit}>
															{isLoading && (
																<Spinner isSmall inButton />
															)}
															{isLoading
																? (lastSave &&
																		'Submitting again') ||
																  'Submitting'
																: (lastSave && 'Submit again') ||
																  'Submit'}
														</Button>
													</div>
													<div className='col-auto'>
														<Dropdown direction='up'>
															<DropdownToggle hasIcon={false}>
																<Button
																	color={themeStatus}
																	icon='MoreVert'
																/>
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button
																		className='me-3'
																		icon='Save'
																		isLight
																		isDisable={isLoading}
																		onClick={formik.resetForm}>
																		Reset
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
					</>
				)}
			</Page>
		</PageWrapper>
	);
};

export default GitHubAccessPage;
