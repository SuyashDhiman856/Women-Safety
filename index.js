const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const app = express();

const accountSid = 'AC2b06d0c9bd650fb1f4bbc2f7e45bd8d7';
const authToken = 'ba1d859d64090d4580e8d73e1af9fef2';
const twilioClient = twilio(accountSid, authToken);

app.use('/', express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "script")));
app.use(require(path.join(__dirname, "router/router.js")))

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'suyashdhiman856@gmail.com',
        pass: 'vpgs afij judu ayst'
    }
});

app.use(cors());
app.use(bodyParser.json());

// POST route to send SOS
app.post('/api/send-sos', (req, res) => {
    const { latitude, longitude, recipientEmail, recipientPhone } = req.body;

    // Google Maps link
    const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;

    // Send Email
    const mailOptions = {
        from: 'suyashdhiman856@gmail.com',
        to: recipientEmail,
        subject: 'SOS Alert - Location',
        text: `The user has send SOS message, location of the user is: ${locationLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email', error });
        } else {
            console.log('Email sent: ' + info.response);

            twilioClient.messages
                .create({
                    body: `SOS Alert! The User is at this location: ${locationLink}`,
                    from: '+16466817466',
                    to: recipientPhone,
                })
                .then(message => console.log(message.sid))
                .done();
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});