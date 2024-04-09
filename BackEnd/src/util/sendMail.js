const nodemailer = require('nodemailer');

function sendVerifyOTP (Email, OTP){
    console.log("OTP: ", OTP)
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
        to: 'hieusinhbackend@gmail.com',
        subject: 'Mã xác minh đăng kí',
        html: '<h1><%= OTP %></h1>'
    };
    const filledHtml = mailOptions.html.replace(/<%= OTP %>/g, OTP);
        mailOptions.html = filledHtml;
        transporter.sendMail( mailOptions, function(err, info){
        if( err){
            console.log( 'Error: ' , err);
        } else {
            console.log('Email sent: ', info.response);
            
        }
    });
    return OTP;
}

module.exports = {
    sendVerifyOTP: sendVerifyOTP,
}
