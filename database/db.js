require('dotenv').config()
const knex = require('knex')({
    client : "mysql",
    connection : {
        host : process.env.db_host,
        user : process.env.db_user,
        password : process.env.db_pass,
        database : process.env.db_database
    }
});


knex.schema.createTable("details", (table) => {
    table.increments("Id")
    table.string('First_Name').notNullable()
    table.string('Last_Name').notNullable()
    table.string('Email_id').notNullable()
    table.string("Password").notNullable()
    table.string('Organization_Name').notNullable()
}).then((data) => {
    console.log("Table created :")
}).catch((err) => {
    console.log("Table already created :")
})

module.exports = knex

