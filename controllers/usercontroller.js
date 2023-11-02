const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: asyncHandler(async (req, res) => {
    console.log(req.body);
    // Create a new user
    const { name, email, password } = req.body;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    } else if (trimmedPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password cannot exceed 6 characters" });
    } else {
      let user = await User.findOne({ email: trimmedEmail });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(trimmedPassword, saltRounds);
    const newUser = new User({
      name: trimmedName,
      email: trimmedEmail,
      password: passwordHashed,
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success message
    res.status(201).json({ message: "User created successfully" });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return res.status(400).send("Please provide an email and password");
    }
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(trimmedPassword, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid credentials");
    }
    // Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.cookie(String(user._id),token ,{
        path:'/',
        expires:new Date(Date.now()+1000*30),
        httpOnly:true,
        sameSite:'lax'

    })
    



    res.json({ message: "Logged in", token });
  }),

  getUser:asyncHandler(async(req,res,next)=>{
    const userId= req.id
    let user;
    try{
        user =await User.findById(userId,"-password")
    }catch (err){
        return new Error(err)

    }

    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({user})
  })

};
