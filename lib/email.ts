import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'marketing.nexoradigital@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});

// Contact form email data type
type ContactFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  country: string;
  services: string[];
  message: string;
};

// Send contact form email to marketing team
export async function sendContactFormEmail(data: ContactFormData) {
  const { name, email, phoneNumber, companyName, country, services, message } = data;

  const servicesList = services.length > 0 ? services.join(', ') : 'None specified';

  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Services Interested In:</strong> ${servicesList}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><em>This message was sent from the Nexora Digital contact form.</em></p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'marketing.nexoradigital@gmail.com',
    to: 'marketing.nexoradigital@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    html: emailContent,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully');
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
} 