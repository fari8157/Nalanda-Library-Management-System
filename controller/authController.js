const User=require("../models/user")
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      
      if (!name || name.trim().length < 3) {
        return res.status(400).json({ message: "Please provide a valid name with at least 3 characters." });
      }
      if (!email) {
        return res.status(400).json({ message: "Please provide your email" });
      }
      if (!password || password.trim().length === 0) {
        return res.status(400).json({ message: "Please provide your password" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const user = await User.create({ name, email, password });
      return res.status(201).json({
        status: "success",
        data: { id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
     
      next(err);
    }
  };

const login = async (req,res,next)=>{
    try{ 
        const {email,password}=req.body
        if (!email || !password) {
            return res.status(400).json({
              message: "Please provide email and password",
            });
          }
          const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email ",
      });
    }
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
  
      
      res.status(200).json({ status: "success", token });
        
    }catch(err){
        next(err)
    }
}






  module.exports={
    register,
    login

  }
  
