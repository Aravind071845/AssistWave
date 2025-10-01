import express from "express";
import connectToDatabase from "../lib/db.js";
import env from "dotenv";
import twilio from "twilio";
import axios from "axios";

const router = express.Router();
env.config();

const  formatPhoneNumber = (phoneNumber) => {
    return `+91${phoneNumber}`;
};

router.post('/emergency', async (req,res) => {
     
    //twilio configurations
   const twilioClient = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);


    const { deviceId,latitude, longitude,heartRate } = req.body;

    try{

      //check if device ID exists in the database
      const db = await connectToDatabase();
      const deviceQuery = await db.query("SELECT * FROM users WHERE device_id = $1",[deviceId]);

      if(deviceQuery.rowCount === 0){
        return res.status(404).json({error:"Device not found"});
      }


      const device = deviceQuery.rows[0];
      const { name, relative_num} = device;

      const formattedRelativeNum = formatPhoneNumber(relative_num);
      
      const message = `Emergency Alert for ${name}!\n Location: https://www.google.com/maps?q=${latitude},${longitude} \n Heart Rate: ${heartRate} BPM`;

     //triggering the emergency message using twilio API
      twilioClient.messages.create({
        body:message,
        to:formattedRelativeNum,
        from:process.env.PHONE_NUMBER
      })
      .then((message) => console.log(message))
      .catch((error) => {
         console.log(error);
      });
      
      //finding the nearest hospitals
     

        try{
          const hereApiKey = process.env.HERE_API_KEY
          const hospitalResponse = await axios.get(`https://discover.search.hereapi.com/v1/discover`, {
            params: {
              at: `${latitude},${longitude}`,
              q: 'hospital',
              limit: 5,
              apiKey: hereApiKey
            }
          });

          const hospitalDetails = hospitalResponse.data.items.map(hospital => ({
            title: hospital.title,
            address: hospital.address 
                ? `${hospital.address.street || 'Unknown Street'}, ${hospital.address.city || 'Unknown City'}, ${hospital.address.countryName || 'Unknown Country'}` 
                : 'Address not available',
            contacts: hospital.contacts && hospital.contacts[0] && hospital.contacts[0].phone
                ? hospital.contacts[0].phone[0].value
                : 'Contact not available'
        }));
        
        }
        catch(err){
          console.log("google error" + err);
        }

      

      res.status(200).json({message: "Received emergency data"});
    }
    catch(err){
        return res.json({message:"error"});
    }
});



export default router;