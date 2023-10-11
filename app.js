'use strict'


const express = require('express')
var application = express()

const body_parser = require('body-parser')

//middleware - start

application.use(body_parser.urlencoded({ extended: true }));
application.use(body_parser.json());

application.set('view engine', 'ejs')
//middleware - end


var context = require('./models/person');
const { QueryTypes, where } = require('sequelize');
const sequelize = require('./models/dbcontext');

context.sync();
console.log("başarili senkron");



application.get('/', (req, res) => {
    res.render('index')
})


application.post('/post', (req, res) => {
    context.create({
        name: req.body.name,
        lastname: req.body.lastname
    });
    res.redirect('/')
})


application.get('/getAll', (req, res) => {
    context.findAll().then((result) => {
        res.render('getAll', { model: result });
    }).catch((err) => {
        console.log(err);
    });
})

application.get('/delete/:id', (req, res) => {
    sequelize.query(`DELETE FROM people WHERE id = ${req.params.id}`, { type: QueryTypes.DELETE });
    res.redirect('/getAll')
})

application.get('/update/:id', (req, res) => {
    context.findByPk(req.params.id).then((result) => {
        res.render('update', { model: result })
    }).catch((err) => {
        console.log(err);
    });
})

application.post('/update/:id', (req, res) => {

   context.update({
        name: req.body.name,
        lastname: req.body.lastname
    },{
        where:{
            id:req.params.id
        }
    })
    
    res.redirect('/')
});


application.listen(3000, x => {
    console.log('3000 portu ile dinlemede');
})