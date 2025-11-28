import Order from "../models/Order.js";
import axios from "axios";
import PDFDocument from "pdfkit"; // For generating the PDF
import dotenv from "dotenv";

dotenv.config();

// --- 1. Place Order & Send Email ---
export async function placeOrder(req, res) {
  try {
    // A. Save Order to Database
    const order = new Order(req.body);
    const savedOrder = await order.save();

    // B. Send Email via Brevo API
    try {
        const { name, email, mobile, address, items, totalAmount } = req.body;

        // 1. Generate the Download Link for the QR Code
        // This points to the new route we will create below
        const downloadLink = `${process.env.BACKEND_URL}/api/orders/invoice/${savedOrder._id}`;
        
        // 2. Generate QR Code Image URL (using a free public API)
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(downloadLink)}`;

        // 3. Create HTML Table for Items
        const itemsHtml = items.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${item.size}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">₹${item.price}</td>
            </tr>
        `).join("");

        // 4. Construct the Email HTML
        const emailContent = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    
                    <div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">RAWAURA</h1>
                        <p style="color: #888888; margin: 5px 0 0; font-size: 12px; text-transform: uppercase;">Order Confirmation</p>
                    </div>

                    <div style="padding: 30px;">
                        <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
                        <p style="color: #666; line-height: 1.6;">Thank you for your order! We are getting it ready for shipment.</p>

                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #eee;">
                            <h3 style="margin-top: 0; font-size: 14px; color: #1a1a1a; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Shipping Details</h3>
                            
                            <table style="width: 100%; font-size: 14px; color: #555;">
                                <tr>
                                    <td style="padding: 5px 0; width: 30%;"><strong>Email:</strong></td>
                                    <td>${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0;"><strong>Mobile:</strong></td>
                                    <td>${mobile}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; vertical-align: top;"><strong>Address:</strong></td>
                                    <td>
                                        ${address.building}, ${address.area}<br>
                                        ${address.city}, ${address.state}
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <h3 style="font-size: 18px; color: #333; margin-bottom: 10px;">Order Summary</h3>
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                            <thead>
                                <tr style="background-color: #f1f1f1;">
                                    <th style="padding: 10px; color: #555;">Product</th>
                                    <th style="padding: 10px; color: #555;">Size</th>
                                    <th style="padding: 10px; color: #555;">Qty</th>
                                    <th style="padding: 10px; color: #555;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; border-top: 2px solid #333;">Total Amount:</td>
                                    <td style="padding: 15px; font-weight: bold; border-top: 2px solid #333;">₹${totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div style="margin-top: 40px; text-align: center; border-top: 1px dashed #ccc; padding-top: 30px;">
                            <p style="font-weight: bold; color: #333; margin-bottom: 15px;">Scan to Download Invoice PDF</p>
                            <img src="${qrCodeUrl}" alt="QR Code" style="width: 150px; height: 150px; border: 4px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                            <p style="font-size: 12px; color: #999; margin-top: 10px;">(Or click <a href="${downloadLink}" style="color: #1a1a1a;">here</a> to download)</p>
                        </div>

                    </div>

                    <div style="background-color: #1a1a1a; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                        <p>&copy; 2025 RawAura Fashion. All rights reserved.</p>
                        <p>Questions? Email us at rawaura0102@gmail.com</p>
                    </div>
                </div>
            </div>
        `;

        // Brevo API Payload
        const emailData = {
            sender: { name: "RawAura Fashion", email: "rawaura0102@gmail.com" },
            to: [
                { email: email, name: name },
                { email: "rawaura0102@gmail.com", name: "RawAura Admin" }
            ],
            subject: `Order Confirmation: ${name} - ₹${totalAmount}`,
            htmlContent: emailContent
        };

        // Send Request
        await axios.post("https://api.brevo.com/v3/smtp/email", emailData, {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        });

        console.log("Email sent successfully.");

    } catch (emailError) {
        console.error("Failed to send email:", emailError.message);
    }

    res.json(savedOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// --- 2. Get User Orders ---
export async function getUserOrders(req, res) {
  try {
    const orders = await Order.find({ mobile: req.params.mobile });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

// --- 3. Generate Invoice PDF (Triggered by QR Code) ---
export async function generateInvoicePDF(req, res) {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send("Order not found");
        }

        // Initialize PDF
        const doc = new PDFDocument({ margin: 50 });

        // Set Headers to force download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=RawAura_Invoice_${orderId}.pdf`);

        // Pipe generated PDF to the response (client)
        doc.pipe(res);

        // --- PDF Design ---
        // Header
        doc.fontSize(20).text('RAWAURA FASHION', { align: 'center' });
        doc.fontSize(10).text('Invoice & Order Details', { align: 'center' });
        doc.moveDown();
        doc.text('---------------------------------------------------------------------------------------------------');
        doc.moveDown();

        // Details
        doc.fontSize(12).text(`Order ID: ${order._id}`);
        doc.text(`Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`);
        doc.text(`Customer Name: ${order.name}`);
        doc.text(`Mobile: ${order.mobile}`);
        doc.moveDown();
        
        doc.text('Shipping Address:');
        doc.font('Helvetica-Bold').text(`${order.address.building}, ${order.address.area}`);
        doc.text(`${order.address.city}, ${order.address.state}`);
        doc.font('Helvetica');
        
        doc.moveDown();
        doc.text('---------------------------------------------------------------------------------------------------');
        doc.moveDown();

        // Items Table Header
        let y = doc.y;
        doc.font('Helvetica-Bold');
        doc.text('Item', 50, y);
        doc.text('Size', 300, y);
        doc.text('Qty', 380, y);
        doc.text('Price', 450, y);
        doc.moveDown();
        doc.font('Helvetica');

        // Items Rows
        order.items.forEach(item => {
            y = doc.y;
            doc.text(item.name, 50, y);
            doc.text(item.size, 300, y);
            doc.text(item.quantity, 380, y);
            doc.text(`Rs. ${item.price}`, 450, y);
            doc.moveDown();
        });

        doc.moveDown();
        doc.text('---------------------------------------------------------------------------------------------------');
        
        // Total
        doc.fontSize(15).font('Helvetica-Bold').text(`Total Amount: Rs. ${order.totalAmount}`, { align: 'right' });

        // Footer
        doc.fontSize(10).font('Helvetica').text('Thank you for shopping with RawAura!', 50, 700, { align: 'center', width: 500 });

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error("PDF Error:", error);
        res.status(500).send("Error generating invoice");
    }
}