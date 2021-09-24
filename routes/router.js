const {generatToken, accessToken} = require('../Auth/jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require("express")
const knex = require('../database/db')
const router = express.Router()
router.use(express.json())

//// This is for check that we are our home page or not 
router.get('/home', (req, res) => {
    res.send("We have reached our home page...")
})

//// This is a signup api 
router.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.Password,10)
    console.log(hash)
    knex.select('*').from('details').where('Email_id', req.body.Email_id).then((data) => {
        if (data.length < 1){
            knex('details').insert({
                "First_Name" : req.body.First_Name,
                "Last_Name" : req.body.Last_Name,
                "Email_id" : req.body.Email_id,
                "Password" : hash,
                "Organization_Name" : req.body.Organization_Name
            }).then((data) => {
                res.send({"data":"inserted"})
            }).catch((err) => {
                res.send(err)
            })
        } else{
            res.send("You have already signup :")
        }
    })
})

//// This is a login api
router.get('/login', (req, res) => { 
    knex.select("*").from('details').where('Email_id',req.body.Email_id).then((data) => {
        if (data < 1) {
            res.send('You cant login this page\nBecause you did not signup yet..')
        } else {
            const match = bcrypt.compareSync(req.body.Password, data[0].Password)
            if(match){
                const token = generatToken(req.body.Email_id)
                res.cookie('token', token) 
                res.send("Your login has completed successfully..")
            }else{
                res.send({ "Error": "Password is invalid" })
            }
        }
    })
})

//// This is a all data api
router.get('/all',(req, res) => {
    knex.select('*').from('details').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a get by id api
router.get('/get/:id', (req, res) => {
    knex.select('*').from('details').where({'id':req.params.id}).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a change by id api
router.put('/change/:id', (req, res) => {
    knex('details')
    .where({id : req.params.id})
    .update(req.body).then((data) => {
        res.send({'message' : 'change data'})
    }).catch((err) => {
        res.send(err.message)
    })
})

//// This is a delete by id api
router.delete('/delete/:id', (req, res) => {
    knex('details').where({id : req.params.id}).del().then((data) => {
        res.send("Your data deleted..")
    }).catch((err) => {
        res.send(err.message)
    })
})

//// this is a search api
router.get('/search',(req,res)=>{
    var search= req.query.search_data
    knex.select('First_Name','Last_Name','Id').from('details').where('First_Name','like',`%${search}%`)
    .orWhere('Last_Name', 'like', `%${search}%`)
    .orWhere('Id', 'like', `%${search}%`).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a sort api by first name
router.get("/firstname",(req, res) => {
    knex('details').orderBy('First_Name').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a sort api by last name
router.get('/lastname', (req, res) => {
    knex('details').orderBy('Last_Name').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a sort api by email
router.get('/email', (req, res) => {
    knex('details').orderBy('Email_id').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a sort api by Organization Name
router.get('/organization', (req, res) => {
    knex('details').orderBy('Organization_Name').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a sort api by employ id
router.get('/employ_id', (req, res) => {
    knex('details').orderBy("id").then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
