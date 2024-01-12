const EmailTraper = require("nodemailer");
const emailtraper = async (option) => {
  const emailtransport = EmailTraper.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed6990159e4dcc",
      pass: "86d8b94f6b7505",
    },
    
  });


  const message = {
    to : option.emailto,
    from: "oussemaferchichi@gmail.com",
    text: option.text,
    subject: option.subject,
  }
   await emailtransport.sendMail(message)
};
module.exports = emailtraper;
