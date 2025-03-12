import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const Checkauth = (req, res, next) => {
  console.log("reached auth check")
  console.log("here");
  try {
    console.log("cookies",req.cookies);
    console.log("cookie" , req.cookies.token);
    console.log("body" , req.body.token);
    console.log("header", req.header("Authorization"));
   
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
    
    if(!token || token === undefined) {
        return res.status(401).json({
            success:false,
            message:'Token Missing',
        });
    }

    //verify the token
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        //why this ?
        req.user = payload;
    } catch(error) {
       console.log(error)
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
    }
    next();
} 
catch(error) {
    return res.status(401).json({
        success:false,
        message:'Something went wrong, while verifying the token',
        error:error.message,
    });
}
};


export const isStudent = (req, res, next) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Access restricted to students',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Role verification failed',
    });
  }
};

// Middleware to allow access to the admin only
export const isAdmin = (req, res, next) => {
  console.log("reached admin check")
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access restricted to admin',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Role verification failed',
    });
  }
};
