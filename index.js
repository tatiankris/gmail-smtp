const express = require('express');
'use strict';

const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

let transporter = nodemailer.createTransport({

        service: 'gmail',
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        // requireTLS: true,
        auth: {
            user: smtp_login, // generated ethereal user "kristanya00@gmail.com"
            pass: smtp_password, // generated ethereal password "hcsszrhjchxsvxyy"
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



let port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log('Example app listening on port 3010!')
});
