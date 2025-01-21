import express from 'express';
import { studentSignup, studentLogin, adminLogin } from '../controllers/authController.js';

const router = express.Router();


router.post('/student/signup', studentSignup);
router.post('/student/login', studentLogin);

router.get("/test", (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

router.post('/admin/login', adminLogin);

export default router;
