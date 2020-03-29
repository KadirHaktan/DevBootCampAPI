const nodemailer=require('nodemailer')



const sendEmail=async(options)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user:process.env.SMTP_EMAIL, // generated ethereal user
          pass:process.env.SMTP_PASSWORD// generated ethereal password
        }
      });

      const message={
          from:`${process.env.FROM_NAME} <${process.env.FROM_MAIL}`,
          to:options.email,
          subject:options.subject,
          text:options.message
      }

      const info=await transporter.sendMail(message)

      console.log(info.messageId)
    
}

module.exports=sendEmail