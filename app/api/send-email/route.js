import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create transporter (using Gmail as example - configure based on your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Email templates
const emailTemplates = {
  create: (data) => ({
    subject: 'Welcome to Durable Furniture! Your Account Has Been Created',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Durable Furniture!</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>Your account has been successfully created with the following details:</p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p><strong>Role:</strong> ${data.role}</p>
              <p><strong>Account Type:</strong> ${data.role === 'admin' ? 'Administrator' : 'Customer'}</p>
            </div>

            ${data.role === 'customer' ? `
              <p>You can now browse our furniture collection, place orders, and track your purchases.</p>
            ` : `
              <p>As an administrator, you have access to the management dashboard to oversee users, products, and orders.</p>
            `}

            <p style="text-align: center; margin: 30px 0;">
              <a href="${data.loginUrl}" class="button">Access Your Account</a>
            </p>

            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  update: (data) => ({
    subject: 'Your Durable Furniture Account Has Been Updated',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .changes { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Updated</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>Your Durable Furniture account has been successfully updated.</p>
            
            <div class="changes">
              <p><strong>The following changes were made to your account:</strong></p>
              <ul>
                ${data.changes.map(change => `<li>${change}</li>`).join('')}
              </ul>
            </div>

            <p>If you did not request these changes or believe this was done in error, please contact our support team immediately.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  status_change: (data) => ({
    subject: `Account ${data.newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${data.newStatus === 'active' ? '#10B981' : '#EF4444'}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .status-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account ${data.newStatus === 'active' ? 'Activated' : 'Deactivated'}</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <div class="status-info">
              <p><strong>Account Status:</strong> 
                <span style="color: ${data.newStatus === 'active' ? '#10B981' : '#EF4444'}; font-weight: bold;">
                  ${data.newStatus === 'active' ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </p>
              <p>${data.statusMessage}</p>
            </div>

            ${data.newStatus === 'active' ? `
              <p>You can now access all features of your Durable Furniture account.</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="https://durablefurniture.com/auth/login" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Login to Your Account
                </a>
              </p>
            ` : `
              <p>If you believe this was done in error or need assistance reactivating your account, please contact our support team.</p>
            `}
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  delete: (data) => ({
    subject: 'Durable Furniture Account Deletion Confirmation',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6B7280; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .deletion-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #EF4444; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Deletion Confirmation</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <div class="deletion-info">
              <p><strong>Your Durable Furniture account has been permanently deleted.</strong></p>
              <p><strong>Deletion Date:</strong> ${data.deletionDate}</p>
            </div>

            <p>All your personal data, order history, and account information have been removed from our systems in accordance with our privacy policy.</p>

            <p>If you did not request this deletion or believe this was done in error, please contact our support team immediately.</p>

            <p>We're sorry to see you go and hope you'll consider us for your future furniture needs.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
order_created: (data) => ({
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .order-items { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .order-items th { background: #f8f9fa; text-align: left; padding: 12px; border-bottom: 2px solid #dee2e6; }
          .order-items td { padding: 12px; border-bottom: 1px solid #dee2e6; }
          .total-row { font-weight: bold; background: #f8f9fa; }
          .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .status-pending { background: #fff3cd; color: #856404; }
          .status-processing { background: #cce7ff; color: #004085; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.customerName},</h2>
            <p>Thank you for your order! We're getting it ready to be shipped.</p>
            
            <div class="order-info">
              <h3>Order Details</h3>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Order Date:</strong> ${data.orderDate}</p>
              <p><strong>Status:</strong> <span class="status-badge status-${data.status}">${data.status}</span></p>
              
              <table class="order-items">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.items.map(item => `
                    <tr>
                      <td>${item.product}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price}</td>
                      <td>$${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="3" style="text-align: right;">Total:</td>
                    <td>$${data.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p>We'll notify you when your order ships. You can check the status of your order anytime by visiting your account.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  status_updated: (data) => ({
    subject: `Order Status Update - ${data.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #8B5CF6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .status-update { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #8B5CF6; }
          .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .status-${data.newStatus} { 
            ${data.newStatus === 'shipped' ? 'background: #e0e7ff; color: #3730a3;' : ''}
            ${data.newStatus === 'delivered' ? 'background: #d1fae5; color: #065f46;' : ''}
            ${data.newStatus === 'processing' ? 'background: #dbeafe; color: #1e40af;' : ''}
            ${data.newStatus === 'cancelled' ? 'background: #fee2e2; color: #991b1b;' : ''}
          }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Updated</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.customerName},</h2>
            
            <div class="status-update">
              <h3>Your order status has been updated</h3>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Previous Status:</strong> ${data.oldStatus}</p>
              <p><strong>New Status:</strong> <span class="status-badge status-${data.newStatus}">${data.newStatus}</span></p>
            </div>

            ${data.newStatus === 'shipped' ? `
              <p>Your order has been shipped! You should receive it soon.</p>
              <p>Track your package using the tracking number provided in your account.</p>
            ` : ''}
            
            ${data.newStatus === 'delivered' ? `
              <p>Your order has been delivered! We hope you love your new furniture.</p>
              <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
            ` : ''}

            <p>You can view your order details and track its progress by visiting your account dashboard.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  payment_received: (data) => ({
    subject: `Payment Received - ${data.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .payment-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10B981; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.customerName},</h2>
            
            <div class="payment-info">
              <h3>Payment Received</h3>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Amount Paid:</strong> $${data.amount}</p>
              <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Payment Status:</strong> <span style="color: #10B981; font-weight: bold;">Paid</span></p>
            </div>

            <p>Thank you for your payment! We're now processing your order and will notify you when it ships.</p>

            <p>If you have any questions about your payment or order, please contact our support team.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  refund_approved: (data) => ({
    subject: `Refund Approved - ${data.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .refund-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10B981; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Refund Approved</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.customerName},</h2>
            
            <div class="refund-info">
              <h3>Refund Processed</h3>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Refund Amount:</strong> $${data.refundAmount}</p>
              <p><strong>Refund Date:</strong> ${new Date().toLocaleDateString()}</p>
              ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
              <p><strong>Status:</strong> <span style="color: #10B981; font-weight: bold;">Refund Approved</span></p>
            </div>

            <p>Your refund has been processed successfully. The amount should appear in your original payment method within 5-7 business days.</p>

            <p>If you don't see the refund in your account after this time, please contact your bank or payment provider.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  refund_denied: (data) => ({
    subject: `Refund Update - ${data.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .refund-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #EF4444; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Refund Request Update</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.customerName},</h2>
            
            <div class="refund-info">
              <h3>Refund Request Decision</h3>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Status:</strong> <span style="color: #EF4444; font-weight: bold;">Refund Denied</span></p>
              ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
            </div>

            <p>We've reviewed your refund request and unfortunately, we're unable to process it at this time.</p>

            <p>If you believe this decision was made in error or would like to discuss this further, please contact our customer support team.</p>

            <p>You can reach us by:</p>
            <ul>
              <li>Email: support@durablefurniture.com</li>
              <li>Phone: 1-800-DURABLE</li>
              <li>Live Chat: Available on our website</li>
            </ul>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  invoice: (data) => ({
    subject: `Invoice for Order ${data.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6B7280; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .invoice-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .invoice-items { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .invoice-items th { background: #f8f9fa; text-align: left; padding: 12px; border-bottom: 2px solid #dee2e6; }
          .invoice-items td { padding: 12px; border-bottom: 1px solid #dee2e6; }
          .total-row { font-weight: bold; background: #f8f9fa; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Invoice</h1>
          </div>
          <div class="content">
            <div class="invoice-info">
              <h2>INVOICE ${data.invoiceNumber}</h2>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Customer:</strong> ${data.customerName}</p>
              
              <table class="invoice-items">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.items.map(item => `
                    <tr>
                      <td>${item.product}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price}</td>
                      <td>$${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="3" style="text-align: right;">Total:</td>
                    <td>$${data.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p><strong>Payment Status:</strong> Paid</p>
            <p><strong>Payment Method:</strong> Credit Card</p>

            <p>Thank you for your business! This invoice has already been paid.</p>

            <p>If you have any questions about this invoice, please contact our billing department.</p>
            
            <p>Best regards,<br>The Durable Furniture Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Durable Furniture. All rights reserved.</p>
            <p>This is an automated invoice. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
}
 export async function POST(request) {
    try {
        const { to, subject, template, data } = await request.json()

        // Validate required fields
        if (!to || !template) {
        return NextResponse.json(
            { error: 'Missing required fields: to and template are required' },
            { status: 400 }
        )
        }

        // Get email template
        const templateConfig = emailTemplates[template]
        if (!templateConfig) {
        return NextResponse.json(
            { error: 'Invalid template type' },
            { status: 400 }
        )
        }

        const emailContent = templateConfig(data)
        const finalSubject = subject || emailContent.subject

        // Email options
        const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@durablefurniture.com',
        to,
        subject: finalSubject,
        html: emailContent.html,
        }

        // Send email
        const result = await transporter.sendMail(mailOptions)

        console.log('Email sent successfully:', {
        to,
        template,
        messageId: result.messageId,
        })

        return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: 'Email sent successfully',
        })
    } catch (error) {
        console.error('Error sending email:', error)
        
        return NextResponse.json(
        { 
            error: 'Failed to send email',
            details: error.message 
        },
        { status: 500 }
        )
    }
}