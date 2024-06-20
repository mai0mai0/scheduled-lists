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
    const checkboxStatus = Object.entries(checkboxes).map(([item, checks]) => {
        const checksFormatted = Object.entries(checks).map(([check, status]) => {
          return `${check}: ${status ? 'true' : 'false'}`;
        }).join(', ');
        return `${item}: { ${checksFormatted} }`;
      }).join('\n');

    // Create the email content
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'aaron.mai@knak.com', 
      subject: `Form Submission`,
      html: `<body style="word-spacing:normal;background-color:#FFFFFF;" class="body" id="body"><div style="background-color:#FFFFFF;background-position:center center;background-size:auto;background-repeat:repeat;" id="main"><!--[if mso]>
      <table border="0" cellpadding="0" cellspacing="0" width="100%"><![endif]--><!--[if mso]>
      <tr>
      <td><![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:transparent;width:100%;" class="section">
      <tr>
      <td align="center"><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="block-grid-outlook" style="width:600px;" width="600" >
      <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:transparent;background-color:transparent;Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:transparent;width:100%;">
      <tr>
      <td style="font-size:0px;padding:0;text-align:center;vertical-align:top;" class="block-grid"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:0px;vertical-align:top;" width="100%">
      <tr>
      <td style="font-size:0px;padding:0 0 0 0;word-break:break-word;"><div style="line-height:20px;height:20px;mso-line-height-alt:20px;">&nbsp;</div>
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table><!--[if mso]>
      </td>
      </tr><![endif]-->
      <!--[if mso]>
      <tr>
      <td><![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" class="section">
      <tr>
      <td align="center"><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="block-grid-outlook" style="width:600px;" width="600" >
      <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tr>
      <td style="font-size:0px;padding:0px;text-align:center;vertical-align:top;" class="block-grid"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:0px;vertical-align:top;" width="100%">
      <tr>
      <td class="text-container" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;text-align:center;"><div class="links-0068A5"><div style="font-family:'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace;font-size:18px;letter-spacing:none;line-height:1.2;text-align:center;mso-line-height-alt:1.375em;color:#000000;"><p style="margin: 0 0;"><span style="font-size: 18px;">Weekly Meeting Room Checks</span></p></div></div>
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table><!--[if mso]>
      </td>
      </tr><![endif]-->
      <!--[if mso]>
      <tr>
      <td><![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" class="section">
      <tr>
      <td align="center"><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="block-grid-outlook" style="width:600px;" width="600" >
      <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tr>
      <td style="font-size:0px;padding:0px;text-align:center;vertical-align:top;" class="block-grid"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:0px;vertical-align:top;" width="100%">
      <tr>
      <td class="text-container" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;text-align:left;"><div class="links-0068A5"><div style="font-family:'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace;font-size:13px;letter-spacing:none;line-height:1.2;text-align:left;mso-line-height-alt:1em;color:#000000;"><p style="margin: 0 0;">${checkboxStatus}</p></div></div>
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table><!--[if mso]>
      </td>
      </tr><![endif]-->
      <!--[if mso]>
      <tr>
      <td><![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" class="section">
      <tr>
      <td align="center"><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="block-grid-outlook" style="width:600px;" width="600" >
      <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tr>
      <td style="font-size:0px;padding:0px;text-align:center;vertical-align:top;" class="block-grid"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:0px;vertical-align:top;" width="100%">
      <tr>
      <td style="font-size:0px;padding:0 0 0 0;word-break:break-word;"><div style="line-height:20px;height:20px;mso-line-height-alt:20px;">&nbsp;</div>
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table><!--[if mso]>
      </td>
      </tr><![endif]-->
      <!--[if mso]>
      <tr>
      <td><![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" class="section">
      <tr>
      <td align="center"><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="block-grid-outlook" style="width:600px;" width="600" >
      <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tr>
      <td style="font-size:0px;padding:0px;text-align:center;vertical-align:top;" class="block-grid"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:0px;vertical-align:top;" width="100%">
      <tr>
      <td class="text-container" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;text-align:left;"><div class="links-0068A5"><div style="font-family:'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace;font-size:13px;letter-spacing:none;line-height:1.2;text-align:left;mso-line-height-alt:1em;color:#000000;"><p style="margin: 0 0;">Notes: ${notes}</p></div></div>
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table><!--[if mso]>
      </td>
      </tr><![endif]-->
      <!--[if mso]>
      <tr>
      <td><![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" class="section">
      <tr>
      <td align="center"><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="block-grid-outlook" style="width:600px;" width="600" >
      <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tr>
      <td style="font-size:0px;padding:0px;text-align:center;vertical-align:top;" class="block-grid"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:0px;vertical-align:top;" width="100%">
      <tr>
      <td style="font-size:0px;padding:0 0 0 0;word-break:break-word;"><div style="line-height:20px;height:20px;mso-line-height-alt:20px;">&nbsp;</div>
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table></div><!--[if mso | IE]>
      </td>
      </tr>
      </table><![endif]-->
      </td>
      </tr>
      </table><!--[if mso]>
      </td>
      </tr><![endif]--><!--[if mso]>
      </table><![endif]--></div>
      </body>`
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
