import express from 'express';
import UserController from '../controllers/userController';
import ValidateId from '../middlewares/validateId';

const router = express.Router();

router.post('/client', ValidateAdmin.admin, UserController.userSignup);

export default router; 