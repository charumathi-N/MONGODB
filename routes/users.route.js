import express, { response } from "express";
import { createUser} from "../services/users.service.js" 
import { getUserByName} from "../services/users.service.js"
import {client} from "../index.js";
import bcrypt from "bcrypt";
import  Jwt from "jsonwebtoken";

const router = express.Router();

async function generateHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}
// generateHashedPassword("password@123");


//middleware - express.json()
//api creation for post method
//Signup Creation
router.post("/signup",express.json(),async function(req,res){
    const {username,password} = req.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB+"got it");
    if(userFromDB){
        res.status(400).send({message:"Username already exists"});
    }
    else if(password.length <8){
        response.status(400).send({message:"Password must be at least 8 characters"});
    }
   else{
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUser({
        username : username,
        password : hashedPassword
    });
    res.send(result);
   }
});

//SignIn creation
router.post("/login",express.json(),async function(req,res){
    const {username,password} = req.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    if(!userFromDB){
        res.status(401).send({message:"Invalid Creentials"});
    }
    else{
        const storedDBPassword = userFromDB.password;
        const isPasswordCheck = bcrypt.compare(password,storedDBPassword);
        console.log(isPasswordCheck);
        if(isPasswordCheck){
            const token = Jwt.sign({ id: userFromDB._id }, process.env.SECRECT_KEY);
            res.send({message:"successfull login", token: token});
        }
        else{
            res.status(401).send({message:"Invalid credentials"});
        }
    }
});

export default router;

