require('dotenv').config();
const nodemailer = require('nodemailer');
 function sendConfirmationEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com, smtp.vaa.edu.vn',
        port: 587,
        secure: false,
        auth: {
            user: '2154810083@vaa.edu.vn',
            pass: 'zxep ysph thzs vuwn'
        }
    });
  
    const mailOptions = {
        from: '2154810083@vaa.edu.vn',
        to: 'sinhfullstack27@gmail.com',
        subject: 'Confirm Login',
        text: `Click the following link to confirm your login: ${process.env.APP_URL}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendConfirmationEmail: sendConfirmationEmail,
}
