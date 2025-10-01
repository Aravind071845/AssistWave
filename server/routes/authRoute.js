import express from "express";
import bcrypt from "bcrypt";
import connectToDatabase from "../lib/db.js";
import passport from "passport";
import  session  from "express-session";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import env from "dotenv";
env.config();

const router = express.Router();
const SALTROUNDS = 10;

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

router.use(passport.initialize());
router.use(passport.session());


router.post('/signup', async (req,res) => {
      
    const name = req.body.name;
    const email = req.body.email;
    const dev_id = req.body.device_id;
    const phone_number = req.body.phone_num;
    const relative_number = req.body.relative_num;

    try{
        const db = await connectToDatabase();
        const chechResult = await db.query("SELECT * FROM users WHERE email = $1",[email]);
       
        if(chechResult.rows.length > 0){
            res.json({Status: "Already a user"});
        }
        else{

            bcrypt.hash(req.body.password.toString(),SALTROUNDS, async (err,hash) => {

                if(err)
                {
                    return res.json({error: "Error in hashing the password"});
                }
                else
                {
                    const result = await db.query("INSERT INTO users (name,email,device_id,password,phone_num,relative_num) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
                        [name,email,dev_id,hash,phone_number,relative_number]
                    );
                    return res.json({Status: "Success"});
                }
                
            });
        }
    }
    catch(err)
    {
        return res.json({error: err.message});
      
    }
});

passport.use('local',new LocalStrategy(
    {usernameField: "email",passwordField: "password"},
    async (email,password,done) => {
        try{
            const db = await connectToDatabase();
            const chechResult = await db.query("SELECT * FROM users WHERE email = $1",[email]);
            
            if(chechResult.rows.length === 0){
                return done(null,false,{message: "User not found"});
            }
    
            else{
                const isMatching = await bcrypt.compare(password,chechResult.rows[0].password);
                if(!isMatching){
                    return done(null,false,{message: "Incorrect password"});
                }
                
                return done(null,chechResult.rows[0]);
            }
        }
        catch(err){
           console.log(err);
           return done(err);
        }
    }
))

passport.use('google',new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK,
    passReqToCallback: true
}, async (req,accessToken,refreshToken,profile,done) => {
       try{
         const db = await connectToDatabase();
         const email = profile.emails[0].value;

         const chechResult = await db.query("SELECT * FROM users WHERE email = $1",[email]);
         
         if(chechResult.rows.length === 0){
            return done(null,false,{message: "User not found,Kindly register"});
         }
         return done(null,chechResult.rows[0]);
       }
       catch(err){
         return done(err);
       }
}));

passport.serializeUser((user,done) => {
    done(null,user.id);
})

passport.deserializeUser( async (id,done) => {
   try{
    const db = await connectToDatabase();
    const chechResult = await db.query("SELECT name,email,device_id,phone_num,relative_num FROM users WHERE id = $1",[id]);
    done(null,chechResult.rows[0]);
   }
   catch(err){
    done(err);
   }
   
})

router.post("/login", (req,res,next) =>{
     passport.authenticate('local',(err,user,info) => {
        if(err){
            return res.json({Status: "Error",message: "Internal Server Error"});
        }

        if(!user){
            return res.json({Status: "Error",message: info.message});
        }

        req.login(user,(loginErr) => {
            if(loginErr){
                return res.json({Status: "Error",message:"Login failed"});
            }
            return res.json({Status: "Success",user});
        });
     })(req,res,next);
});

router.get('/google',passport.authenticate('google',{scope: 
    ['email','profile']
}));

router.get('/google/callback',passport.authenticate('google',{
    failureRedirect: "http://localhost:3000/login",
}),(req,res) => {
    res.redirect("http://localhost:3000/dashboard");
});

const verifyUser = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.json({Error: "you are not authenticated"});
}

router.get('/dashboard',verifyUser, (req,res) => {
    return res.json({Status: "Success",user: req.user});
})

router.patch('/profile', verifyUser, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { phone_number, relative_number } = req.body;
        const userEmail = req.user.email;

        // Ensure at least one field is provided
        if (!phone_number && !relative_number) {
            return res.status(400).json({ error: "At least one field must be provided for update" });
        }

        const updateQuery = `UPDATE users SET phone_num = $1, relative_num = $2 WHERE email = $3 RETURNING *`;
        const result = await db.query(updateQuery,[phone_number,relative_number,userEmail]);

        if(result.rowCount === 0){
            return res.json({error: "User not found"});
        }

        return res.json({Status: "Success",updatedUser: result.rows[0]});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post('/reviews', verifyUser, async (req,res) => {
     try{
        const db = await connectToDatabase();
        const {review,rating,name} = req.body;
       
        const result = await db.query("INSERT INTO reviews (name,rating,review) VALUES ($1,$2,$3) RETURNING *",
                        [name,rating,review]
                    );

        return res.status(200).json({message: "Success"});
     }
     catch(err){
        return res.json({error: err.message});
     }
})

router.delete("/logout", (req,res) => {
    req.logOut((err) => {
        if(err){
            return res.json({Status: "Error",message: "Logout failed"});
        }
        req.session.destroy( () => {
            res.clearCookie("connect.sid");
            return res.json({Status: "Success",message: "Logged Out Successfully"});
        })
    });
    
});




export default router;