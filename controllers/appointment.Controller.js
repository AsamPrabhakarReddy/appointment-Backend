
const Slot = require('../Models/appointment.model');

const { sendMail } = require('../helpers/sendMail');

exports.BookingSlots = async(req, res)=>{
    
  try {
    const { selectedSlot, formData } = req.body;
    const formattedDate = selectedSlot.date;
    const newSlot = new Slot({
      date: formattedDate,
      time: selectedSlot.time,
      name: formData.name,
      email: formData.email
    });

    // Save to database
    await newSlot.save();

    // Extract values from formData and selectedSlot
    const { name, email } = formData;
    const { date, time } = selectedSlot;

    // Send confirmation email
    sendMail(
      email,
      `Confirmed: Immigration Consultation @ ${date}, ${time}`,
      `Hi, ${name}. Thanks for booking the slot.`,
      `<!DOCTYPE html>
      <html>
        <head>
          <style>
          body {
            font-family: Arial, sans-serif;
            height: 100%;
            width: 100%;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

            .header {
              text-align: center;
              margin-bottom: 20px;
            }

            .header h1 {
              color: #333;
              font-size: 22px;
              font-weight: 600;
              text-align: center;
            }

            .content {
              margin-bottom: 30px;
            }

            .content p {
              margin: 0 0 10px;
              line-height: 1.5;
            }

            .content #para p {
              margin-top: 20px;
            }

            .content .button {
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              margin-bottom: 20px;
            }

            .content .button a {
              border-radius: 40px;
              padding-top: 16px;
              padding-bottom: 16px;
              padding-left: 100px;
              padding-right: 100px;
              background-color: #007ae1;
              text-decoration: none;
              color: white;
              font-weight: 600;
            }

            /* .footer {
              text-align: center;
            } */

            .footer p {
              color: #999;
              font-size: 14px;
              margin: 0;
              margin-top: 8px;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MANNAM AND ASSOCIATES</h1>
            </div>
            <div class="content">
              <p>
                  Your booking has been confirmed!
              </p>
              
              <div>
                  <h1> Date: ${date}</h1>
                  <h1>Time : ${time} </h1>
                  <h1>Name: ${name}</h1>
                  <h1>Email : ${email} </h1>
              </div>
            </div>
            <p>Thanks for helping to keep Syndèo secure!</p>
            <div class="footer">
              <p>Team Syndèo</p>
            </div>
          </div>
        </body>
      </html>`
    );

    // Respond with success message
    res.status(201).json({
      message: 'Slot saved successfully',
      data: newSlot
    });
  } catch (error) {
    console.error('Error saving slot:', error);
    res.status(500).json({
      message: 'Failed to save slot',
      error: error.message
    });
  }
} 

