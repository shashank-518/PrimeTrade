import express from 'express';
import { createTask, getUsersTask, updateTaskbyId, deleteTaskbyId } from '../Controllers/Tasks.controllers.js';

const router = express.Router();


router.post('/create', createTask);


router.get('/', getUsersTask); 


router.put('/update/:id', updateTaskbyId);


router.delete('/:id', deleteTaskbyId);

export default router;