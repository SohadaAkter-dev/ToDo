const nodemailer = require("nodemailer");

// send a transporter using smtp
const SendEmailUtility = async(EmailTo,EmailSubject,EmailText)=>{
    const transporter = nodemailer.createTransport({
        service: "Gmail", 
        auth: {
          user: "shohanarahman907@gmail.com",
          pass: "axti usyj ldpl oibb",
        },
      });
    //   the email message
      let mailOption = {
        from: '"To-Do-Tasker" <shohanarahman907@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
      };
    //   send email
      return await transporter.sendMail(mailOption);
}
module.exports = SendEmailUtility;