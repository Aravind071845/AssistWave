import express from "express";
import bcrypt from "bcrypt";
import connectToDatabase from "../lib/db.js";
import env from "dotenv";
env.config();

const router = express.Router();

router.get('/reviews', async (req,res) => {
      try{
        const db = await connectToDatabase();
        const result = await db.query('SELECT * FROM reviews');
        return res.json({message: "Success",value: result.rows});
      }
      catch(err){
        return res.json({error: "Internal server error"});
      }
});


export default router;