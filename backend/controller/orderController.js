import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// --- UPDATED EMAIL CONFIGURATION (PORT 587) ---
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,             // CHANGE: Use 587 instead of 465
  secure: false,         // CHANGE: Must be false for port 587 (it uses STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false, // Helps avoid certificate errors in cloud environments
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
});

export async function placeOrder(req, res) {
  try {
    // 1. Existing Logic: Create and Save Order
    const order = new Order(req.body);
    await order.save();

    // 2. New Logic: Send Emails
    try {
        const { name, email, mobile, address, items, totalAmount } = req.body;

        const itemsHtml = items.map(item => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.size}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
            </tr>
        `).join("");

        const mailOptions = {
            from: `"RawAura Fashion" <${process.env.EMAIL_USER}>`,
            to: `${process.env.EMAIL_USER}, ${email}`, 
            subject: `Order Confirmation: ${name} - ₹${totalAmount}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee;">
                    <h2 style="color: #000; text-align: center;">Order Received Successfully</h2>
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Thank you for your order! We have received your request. Here are the details:</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px;">
                        <p style="margin: 5px 0;"><strong>Mobile:</strong> ${mobile}</p>
                        <p style="margin: 5px 0;"><strong>Address:</strong> ${address.building}, ${address.area}, ${address.city}, ${address.state}</p>
                    </div>

                    <h3>Order Summary:</h3>
                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr style="background-color: #1C1C1C; color: white;">
                                <th style="padding: 10px;">Product</th>
                                <th style="padding: 10px;">Size</th>
                                <th style="padding: 10px;">Qty</th>
                                <th style="padding: 10px;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>

                    <h3 style="text-align: right; margin-top: 20px;">Total: ₹${totalAmount}</h3>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="text-align: center; font-size: 12px; color: #888;">
                        RawAura Fashion<br/>
                        For any queries, contact us at ${process.env.EMAIL_USER}
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Order confirmation emails sent successfully.");

    } catch (emailError) {
        console.error("Failed to send email:", emailError);
    }

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getUserOrders(req, res) {
  try {
    const orders = await Order.find({ mobile: req.params.mobile });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}