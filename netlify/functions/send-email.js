const nodemailer = require('nodemailer')

exports.handler = async(event,context) => {
    const {checkboxes,notes} = JSON.parse(event.body)

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'aaron.mai@knak.com',
        subject: 'Form Submission',
        text: `Checkboxes: ${JSON.stringify(checkboxes)}\nNotes: ${notes}`,
    }

    try{
        await transporter.sendEmail(mailOptions)
        return{
            statusCode: 200,
            body: JSON.stringify({success:true}),
        }
    } catch (error){
        console.error('Error sending email:', error)
        return{
            statusCode: 500,
            body: JSON.stringify({succes: false, error: error.message}),
        }
    }
}