const nodemailer = require("nodemailer")

exports.sendMail  = (req,res)=>{
    const transport = nodemailer.createTransport({
        service: "gamil",
        host: "smtp.gmail.com",
        port: 465,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    })

    const mailOptions ={
        from: `${req.body.name} <${req.body.email}>`,
        to: process.env.EMAIL,
        subject:"Queri solving contact",
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.text}`,
    }   
    console.log(mailOptions);
    
    transport.sendMail(mailOptions, (err,info)=>{
        if(err) return res.send(err)
            return res.send(
        "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1><a href='/'>HomePage</a>"
    )
    })
}