const { app, globalShortcut, BrowserWindow } = require('electron');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    // Spacebar press detection
    let spacebarCount = 0;
    globalShortcut.register('Space', () => {
        spacebarCount++;
        if (spacebarCount >= 3) {
            triggerSOS();
            spacebarCount = 0;
        }
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

function triggerSOS() {
    sendSMS();
    sendEmail();
    startRecording();
}

function sendSMS() {
    const client = twilio('AC2b06d0c9bd650fb1f4bbc2f7e45bd8d7', '5462c019e0a9526b16bfb81190679cb5');
    client.messages.create({
        body: 'SOS Alert! Location: https://maps.google.com/?q=latitude,longitude',
        from: '+16466817466',
        to: '+917417074864',
    }).then(message => console.log(message.sid));
}

function sendEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'suyashdhiman856@gmail.com',
            pass: 'vpgs afij judu ayst',
        },
    });

    let mailOptions = {
        from: 'suyashdhiman856@gmail.com',
        to: 'codebits7@gmail.com',
        subject: 'SOS Alert!',
        text: 'SOS Alert with location.',
        attachments: [{
            path: './path-to-video-file.mp4',
        }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

function startRecording() {
    // Implement camera recording logic (Electron has limited camera access, use a third-party library if needed)
    console.log('Recording started...');
}
