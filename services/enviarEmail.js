const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function enviarEmail(emails, assunto, corpo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  testAccount.user = `naoresponderfazendautopia@gmail.com`;
  testAccount.pass = `1siteorganico`;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });
  
  
  //DESATIVANDO SERVIÇO
  /* ------------------------------------
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fazenda Utopia" <naoresponderfazendautopia@gmail.com>', // sender address
    to: `${emails}`, // list of receivers "bar@example.com, baz@example.com"
    subject: `${assunto}`, // Subject line
    text: `Recebemos seu pedido com sucesso`, // plain text body
    html: `${corpo}` // html body
  });
  
  //SERVIÇO DESATIVADO
  ------------------------------------
  */ 
  
  
  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//main().catch(console.error);
//enviarEmail().catch(console.error);

module.exports = enviarEmail;