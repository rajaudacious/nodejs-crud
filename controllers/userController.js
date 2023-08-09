const { Mongoose } = require("mongoose");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { json } = require("express");
const SECRET_KEY = "superSecretKey";

const signupUser = async (req, res) => {

    try {
        const { username, phone, email, userType, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({
            username, phone, email, userType,
            password: hash,
        });
        console.log(user);
        const savedUser = await user.save();
        const token = jwt.sign(
            { email: user.email },
            SECRET_KEY,
            { expiresIn: 300 }
        )
        console.log(savedUser);
        return res.status(200).json({
            message: "user created successfully", token: token, user: user
        })
    } catch (error) {
        res.status(500).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user,email,password);
        if (!user) {
            return res.status(400).json({message: "email and password not match"})
        }
        const comparePassword = bcrypt .compareSync(password, user.password);
        console.log(comparePassword);
        if (!comparePassword) {
            return res.status(400).json({message: "email and password not match"})
        }
        const token = jwt.sign(
            { email: user.email },
            SECRET_KEY,
            { expiresIn: 300 }
        )
        return res.status(200).json({message: "Login successfully",token: token})

    }
    catch (error) {
        res.status(400).json({ error });
      }
}
    
const changPassword = async (req, res) => {
    try{
        const { email, oldPassword, newPassword } = req.body;
        console.log(email, oldPassword, newPassword );
        const user = await User.find({ email :email});
        console.log(user,".....");
        if (!user) {
            return res.status(400).json({message: "email not match"})
        }
        const comparePassword = bcrypt.compareSync(oldPassword, user[0].password);
        if(!comparePassword){
            return res.status(400).json({message: "old password not match"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        await User.updateOne(
            {
                email
            },
            {
                password:hash
            }
        )
     return res.status(200).json({message:"password changed successfully"})
    }catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
}

module.exports = {
    signupUser,
    loginUser,
    changPassword
}

