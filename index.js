import cors from 'cors'

import express, { json } from 'express'
const app = express()

app.use(json())
app.use(cors())

app.post('/submit', (req, res) => {
    const { name, number } = req.body;
    // const mailOptions = {
    //     from: email,
    //     to: 'your-email@gmail.com',
    //     subject: 'Contact Form',
    //     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    // };

    console.log(name, number);
    res.send('form received and happy');

})

app.get('/', (req, res) => {
    console.log('hello');
    res.send('Hello World')
})

const PORT = 1290;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})