import express from 'express';
import { releaseScheme ,viewAllSchemes,applyToScheme ,approveOrRejectApplication, getschemenames, getparticular_schemedetails, getparticular_studentapplication_details} from '../controllers/schemeController.js';
import { Checkauth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Route to release a new scheme (Admin only)
router.post('/release', Checkauth, isAdmin, releaseScheme);
router.post('/approveorrejct', Checkauth, isAdmin, approveOrRejectApplication);
router.post("/apply",Checkauth,applyToScheme);
router.get('/getallschemes', Checkauth, viewAllSchemes);
router.get('/getsc',Checkauth,isAdmin,()=>{
    console.log("after admin")
})
router.get('/getschemenames',Checkauth,getschemenames)
router.post('/getparticulardetails',Checkauth,getparticular_schemedetails)
router.get('/getparticular_studentdetails',Checkauth,getparticular_studentapplication_details)
export default router;
