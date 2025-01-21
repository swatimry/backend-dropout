import express from 'express';
import { releaseScheme ,viewAllSchemes} from '../controllers/schemeController.js';
import { Checkauth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Route to release a new scheme (Admin only)
router.post('/release', Checkauth, isAdmin, releaseScheme);
router.get('/getallschemes', Checkauth, viewAllSchemes);
router.get('/getsc',Checkauth,isAdmin,()=>{
    console.log("after admin")
})
export default router;
