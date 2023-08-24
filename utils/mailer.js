var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'benmos16@gmail.com',
    pass: 'mosboy24$',
  },
});

var mailOptions = {
  from: 'benmos16@gmail.com',
  to: 'mgenius303@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
};

const sendMail = () =>
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

module.exports = { sendMail };
