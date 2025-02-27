import 'dotenv/config'
import cors from 'cors'
import express, { json } from 'express'
import nodemailer from 'nodemailer'
import nodemailerMailgun from 'nodemailer-mailgun-transport'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'

const app = express()
const mg = nodemailerMailgun

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

app.set('trust proxy', 1);
app.use(limiter)

app.use(json())
app.use(helmet())
app.use(cors())



app.post('/submit', (req, res) => {
    const { name, number } = req.body;
    const auth = {
        auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN
        }
    }

    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
        from: 'aysharehabdev@gmail.com',
        to: 'info@aysharehab.ae', // An array if you have multiple recipients.
        cc: 'aysharehabilitation@gmail.com',
        subject: 'New Enquiry on your Website',
        'replyTo': 'aysharehabdev@gmail.com',
        html: `<p> Please contact the following individual as soon as possible.(Website Enquiry)<br/> <b>Name: ${name}. Contact : ${number}</b></p>`
    }, (err, info) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send('Encountered Error. Try Again');
        }
        else {
            console.log(`Response: ${info}`);
            res.send('Contact Detail Received');
        }
    });

    console.log(name, number);

})

app.get('/', (req, res) => {
    res.send('Rehab Form Handler Working')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})