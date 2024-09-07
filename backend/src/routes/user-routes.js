import express from 'express';
import controller from '../controllers/user-controller.js';

const router = express.Router();

router.route('/users').get(controller.getAllUser);
router.route('/login').post(controller.loginUser);
router.route('/signin').post(controller.registerUser);


export default router;
