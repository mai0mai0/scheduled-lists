const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    try {
        const { checkboxes, notes } = JSON.parse(event.body);

        // Ensure EMAIL_USER and EMAIL_PASS are defined
        // EMAIL_USER and EMAIL_PASS are netlify environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials are not set.');
        }

        // Create a nodemailer transporter object with the email credentials from netlify
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Format checkbox data
        // to add: type of checkbox should be pulled from JSON, eg. "working/not working" or "checked/unchecked", etc 
        const checkboxStatus = Object.entries(checkboxes).map(([item, checks]) => {
            const checksFormatted = Object.entries(checks).map(([check, status]) => {
              return `${check}: ${status ? 'working' : 'not working'}`;
            }).join(', ');
            return `${item}: \n ${checksFormatted} \n`;
        }).join('\n');

        // Create the email content
        // to add: additional email formatted, potentially with HTML
        let mailOptions = {
          from: process.env.EMAIL_USER,
          // addressed to my work email for now
          to: 'aaron.mai@knak.com', 
          subject: `Form Submission`,
          text: `Checks:\n\n${checkboxStatus}\n\nNotes: ${notes}`,
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
