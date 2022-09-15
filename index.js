const express = require('express');
'use strict';

const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({

        service: 'gmail',
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        // requireTLS: true,
        auth: {
            user: "kristanya00@gmail.com", // generated ethereal user
            pass: "hcsszrhjchxsvxyy", // generated ethereal password
        },
    });



    app.post('/sendMessage', async function (req, res) {


        let {name, email, message} = req.body;

        let info = await transporter.sendMail({
            from: 'kristanya00@gmail.com', // sender address
            to: "kristanya00@gmail.com", // list of receivers
            subject: "44Want to contact you!", // Subject line
            // text: "Hello world?", // plain text body
            html: "<b>Сообщение с вашего portfolio!</b>" +
                `<div>name: ${name}</div>` +
                `<div>email: ${email}</div>` +
                `<b>${message}</b>`,
        });


        res.send('Message will send!')
    });


app.get('/', (req, res) => {

    res.send('Hello!');
});





app.listen(3010, () => {
    console.log('Example app listening on port 3010!')
});
