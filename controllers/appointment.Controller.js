
const Slot = require('../Models/appointment.model');
const { sendMail } = require('../helpers/sendMail');
const nodemailer = require("nodemailer");

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

    const transporter = nodemailer.createTransport({
      host: "mail.clouddatanetworks.com",
      port: 465,
      secure: true,
      auth: {
        user: "syndrome-noreply@clouddatanetworks.com",
        pass: "CDN@Syndeo@",
      },
    });

    var mailOptions = {
      from: "info@syndeo.com",
      to: email,
      subject: `Confirmed: Immigration Consultation @ ${date}, ${time}`,
      html: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }

      .container {
        max-width: 600px;
        width: 100%;
        background-color: rgb(209, 204, 204);
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
      }

      .header h1 {
        font-size: 24px;
        color: #AE275F; /* Unique color for "MANNAM AND ASSOCIATES" */
        margin-bottom: 20px;
      }

      .content p.confirmation {
        font-size: 20px;
        color: #AE275F; /* Unique color for "Your booking has been confirmed!" */
        margin: 20px 0;
        font-weight: bold;
      }

      .details {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }

      .details .field {
        width: 80%;
        background-color: #f5f5f5;
        padding: 10px 15px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
      }

      .footer p {
        font-size: 14px;
        color: #AE275F;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>MANNAM AND ASSOCIATES</h1>
      </div>

      <!-- Booking Confirmation -->
      <div class="content">
        <p class="confirmation">Your booking has been confirmed!</p>
      </div>

      <!-- Booking Details -->
      <div class="details">
        <div class="field">Service: Immigration Consultation 1 hour</div>
        <div class="field">Staff Member: Mannam & Associates, LLC [Attorney / Paralegal]</div>
        <div class="field">Date: ${date}</div>
        <div class="field">Time: ${time}</div>
        <div class="field">Name: ${name}</div>
        <div class="field">Email: ${email}</div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>- Team Syndèo</p>
      </div>
    </div>
  </body>
</html>

`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: false, message: "Error in sending mail" });
      } else {
        console.log("This is for the testing purposes");
        return res.status(201).json(newUser);
      }
    });

    
    // Send confirmation email
    // sendMail(
    //   email,
    //   `Confirmed: Immigration Consultation @ ${date}, ${time}`,
    //   `Hi, ${name}. Thanks for booking the slot.`,
    //   `<!DOCTYPE html>
    //   <html>
    //     <head>
    //       <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         height: 100%;
    //         width: 100%;
    //       }

    //       .container {
    //         max-width: 600px;
    //         margin: 0 auto;
    //         padding: 20px;
    //         background-color: #fff;
    //         border-radius: 5px;
    //         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    //       }

    //         .header {
    //           text-align: center;
    //           margin-bottom: 20px;
    //         }

    //         .header h1 {
    //           color: #333;
    //           font-size: 22px;
    //           font-weight: 600;
    //           text-align: center;
    //         }

    //         .content {
    //           margin-bottom: 30px;
    //         }

    //         .content p {
    //           margin: 0 0 10px;
    //           line-height: 1.5;
    //         }

    //         .content #para p {
    //           margin-top: 20px;
    //         }

    //         .content .button {
    //           text-align: center;
    //           display: flex;
    //           justify-content: center;
    //           align-items: center;
    //           margin-top: 20px;
    //           margin-bottom: 20px;
    //         }

    //         .content .button a {
    //           border-radius: 40px;
    //           padding-top: 16px;
    //           padding-bottom: 16px;
    //           padding-left: 100px;
    //           padding-right: 100px;
    //           background-color: #007ae1;
    //           text-decoration: none;
    //           color: white;
    //           font-weight: 600;
    //         }

    //         /* .footer {
    //           text-align: center;
    //         } */

    //         .footer p {
    //           color: #999;
    //           font-size: 14px;
    //           margin: 0;
    //           margin-top: 8px;
    //           margin-bottom: 8px;
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <div class="container">
    //         <div class="header content ">
    //           <h1>MANNAM AND ASSOCIATES</h1>
    //         </div>
    //         <div class="content ">
    //           <p styles="text-center "class="content">
    //               Your booking has been confirmed!
    //           </p>
                 
    //           <div>
    //               <p> Date: ${date}</p>
    //               <p>Time : ${time} </h1>
    //               <h1>Name: ${name}</h1>
    //               <h1>Email : ${email} </h1>
    //           </div>
    //         </div>
    //         <p>Thanks for helping to keep Syndèo secure!</p>
    //         <div class="footer">
    //           <p>Team Syndèo</p>
    //         </div>
    //       </div>
    //     </body>
    //   </html>`
    // );

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

