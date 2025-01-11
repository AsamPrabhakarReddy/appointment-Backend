
const Slot = require('../Models/appointment.model');
const { sendMail } = require('../helpers/sendMail');
const nodemailer = require("nodemailer");

exports.BookingSlots = async(req, res)=>{
    
  try {
    const { selectedSlot, formData, service,staffMember } = req.body;
    console.log(selectedSlot);
    console.log(formData);
    console.log(service);
    const formattedDate = new Date(selectedSlot.date);
    const newSlot = new Slot({
      date: formattedDate,
      time: selectedSlot.time,
      name: formData.name,
      email: formData.email,
      service:service,
      staffMember:staffMember
    });

    // Save to database
    await newSlot.save();

    // Extract values from formData and selectedSlot
    const { name, email } = formData;
    const { date, time } = selectedSlot;
    const { _id: appointmentId } = newSlot; 
    const transporter = nodemailer.createTransport({
      name: "hostgator",
      host: "gator3008.hostgator.com",
      port: 587,
      // secure: true,
      auth: {
        user: "info@alchemindssolutions.com",
        pass: "AMS@11539@ams!",
      },
    });

    var mailOptions = {
      from: "info@alchemindssolutions.com",
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
                      background-color: #F1F5F9;
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
                  .btn-cancel-reschedule {
                    background-color: #28a745;  
                    color: white;             
                    font-weight: bold;        
                    padding: 8px 16px;        
                    border: none;             
                    border-radius: 5px;       
                    cursor: pointer;          
                    font-size: 14px;          
                    margin-left: 15px; 
                    margin-right: 5px; 

                  }

                .btn-cancel-reschedule:hover {
                  opacity: 0.9;
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
                      <p class="confirmation">Your Consultation is Confirmed!</p>
                    </div>

                    <!-- Booking Details -->
                  <div class="details">
                      <div class="field">Service: ${service}</div>
                      <div class="field">Staff Member: ${staffMember}</div>
                      
                      <!-- Date and Time field with the button -->
                      ${appointmentId ? (
                        `<button class="btn-cancel-reschedule"><a href="https://mannam-syndeo-ui.vercel.app/cancel-reschedule/${appointmentId}">Cancel / Reschedule</a></button>`
                      ) : (
                        `<button class="btn-cancel-reschedule"><a href="https://mannam-syndeo-ui.vercel.app/cancel-reschedule">Cancel / Reschedule</a></button>`
                      )}
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



//  getting data by appointmentId
exports.getDataById = async (req, res) => {
  const { Id } = req.body; 
  
  if (!Id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const results = await Slot.findById(Id);  
    if (!results) {
      return res.status(404).json({ message: "No data found for the given ID" });
    }
    res.status(200).json(results);  
  } catch (error) {
    console.error("Error fetching data by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete the data from db

exports.deleteAppointment = async (req, res) => {
  const { Id } = req.body;

  if (!Id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const deletedSlot = await Slot.findByIdAndDelete(Id);

    if (!deletedSlot) {
      return res.status(404).json({ message: "No data found for the given ID" });
    }
    res.status(200).json({ message: "Appointment canceled successfully", deletedSlot });
  } catch (error) {
    console.error("Error deleting appointment", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateAppointment = async (req, res) => {

  const { appointmentId, newDate, newTime } = req.body;
  if (!appointmentId || !newDate || !newTime) {
      return res.status(400).json({ message: "Missing required fields" });
  }
  try {
      const updatedSlot = await Slot.findByIdAndUpdate(
          appointmentId, 
          {
              date: new Date(newDate), 
              time: newTime, 
          },
          { new: true } 
      );
      if (!updatedSlot) {
          return res.status(404).json({ message: "Slot not found" });
      }
      res.status(200).json({
          message: "Appointment updated successfully",
          updatedSlot,
      });
  } catch (error) {
      console.error("Error updating appointment:", error);
      res.status(500).json({ message: "Server error" });
  }
}



exports.getDateAndSlots = async(req, res)=>{

  try{
    const results = await Slot.find();
    res.status(201).json({message: "fetched successfully", results});

  }catch(error){
     console.log("Error while fetching the time slots", error);
     res.send(404).json({message: "rror while fetching the time slots", error});
  }
}

