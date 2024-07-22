exports.up = function (knex) {
    return knex.schema.table('User', function (t) {
        // Add new columns without default values
        t.string('firstname');
        t.string('lastname');
        t.string('company');
        t.string('contact').unique();
    }).then(function () {
        // Update existing rows with dummy values
        return knex('User').where('id', 10000).update({
            firstname: 'AdminFirst',
            lastname: 'AdminLast',
            company: 'Levvy',
            contact: '1234567890'
        }).then(() => {
            return knex('User').where('id', 10001).update({
                firstname: 'Arsalan',
                lastname: 'Yasir',
                company: 'Visionerds',
                contact: '0987654321'
            });
        }).then(() => {
            return knex('User').where('id', 10002).update({
                firstname: 'Hamza',
                lastname: 'Sheikh',
                company: 'Visionerds',
                contact: '1122334455'
            });
        });
    }).then(function () {
        // Alter columns to enforce the notNullable constraint
        return knex.schema.table('User', function (t) {
            t.string('firstname').notNullable().alter();
            t.string('lastname').notNullable().alter();
            t.string('company').notNullable().alter();
            t.string('contact').notNullable().alter();
        });
    });
};

exports.down = function (knex) {
    return knex.schema.table('User', function (t) {
        t.dropColumn('firstname');
        t.dropColumn('lastname');
        t.dropColumn('company');
        t.dropColumn('contact');
    });
};
