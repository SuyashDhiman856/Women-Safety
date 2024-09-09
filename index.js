const express = require("express");
const path = require("path");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const twilio = require('twilio');
const app = express();
const upload = multer();

const accountSid = 'AC2b06d0c9bd650fb1f4bbc2f7e45bd8d7';
const authToken = '5462c019e0a9526b16bfb81190679cb5';
const twilioClient = twilio(accountSid, authToken);

app.use('/', express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "script")));
app.use(require(path.join(__dirname, "router/router.js")))

app.use(cors());
app.use(bodyParser.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'suyashdhiman856@gmail.com',
        pass: 'vpgs afij judu ayst'
    }
});

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

app.post('/api/send-video', upload.single('video'), (req, res) => {
    const mailOptionsVideo = {
        from: 'suyashdhiman856@gmail.com',
        to: 'codebits7@gmail.com',
        subject: 'SOS Video Recording',
        text: 'Video recording from SOS button',
        attachments: [
            {
                filename: 'sos-video.webm',
                content: req.file.buffer,
            },
        ],
    };

    transporter.sendMail(mailOptionsVideo, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.post('/api/send-audio', upload.single('audio'), (req, res) => {
    const audio = req.file;

    // Set up email transport using Nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'suyashdhiman856@gmail.com',
            pass: 'vpgs afij judu ayst',
        },
    });

    // Set up email data
    let mailOptionAudio = {
        from: 'suyashdhiman856@gmail.com',
        to: 'codebits7@gmail.com',
        subject: 'SOS Audio Recording',
        text: 'Attached is the 10-second audio recording.',
        attachments: [{
            filename: 'recording.wav',
            content: audio.buffer,
        }],
    };

    // Send the email
    transporter.sendMail(mailOptionAudio, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.send('Audio email sent successfully');
    });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});