import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config({path:".env"});


export const studentSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'student';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      success: true,
      message: 'Student registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Registration failed, please try again',
    });
  }
};

// Student Login
export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the details',
      });
    }

    let user = await User.findOne({ email, role: 'student' });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not registered',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: 'Password is incorrect',
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
          
          return  res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'student Logged in successfully',
            });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Login failure',
    });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found',
      });
    }
    let user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'admin not registered',
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: 'Password is incorrect',
      });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

          return  res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'student Logged in successfully',
            });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Admin login failure',
    });
  }
};
