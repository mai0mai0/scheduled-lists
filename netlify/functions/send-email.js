const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  try {
    const { checkboxes, notes } = JSON.parse(event.body);

    // Ensure EMAIL_USER and EMAIL_PASS are defined
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials are not set.');
    }

    // Create a transporter object using your email service credentials
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //Format checkbox data
    const checkBoxStatus = object.keys(checkboxes).map(item => {
        const checks = Object.keys(checkboxes[item]).map(check => {
            return `${check}: ${checkboxes[item][check] ? 'true' : 'false'}`;
        }).join(', ');
        return `${item}: { ${checks} }`;
    }).join('\n');

    // Create the email content
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'aaron.mai@knak.com', // Replace with your recipient email address
      subject: 'Form Submission',
      text: `Checkboxes:\n${checkboxStatus}\n\nNotes: ${notes}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};