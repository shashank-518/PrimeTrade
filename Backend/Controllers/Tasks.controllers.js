import Task from "../Models/Task.model.js";
import mongoose from "mongoose"; 

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ message, data });
};


export const createTask = async (req, res) => {

    console.log(req.body);
    
    try {
        const { title } = req.body;
        // console.log(title);
        
        
        const userId = req.user.id; 

        // console.log(userId);
        
        if (!title) {
            return handleResponse(res, 400, "Task title is required.");
        }

        const newTask = new Task({
            title,
            user: userId, 
        });

        const savedTask = await newTask.save();
        
        return handleResponse(res, 201, "Task created successfully.", savedTask);

    } catch (error) {
        console.error("Error creating task:", error);
        return handleResponse(res, 500, "Server error: Could not create task.");
    }
};


export const getUsersTask = async (req, res) => {
    try {
        const userId = req.user.id; 

        
        const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

        if (!tasks || tasks.length === 0) {
            return handleResponse(res, 200, "No tasks found for this user.", []);
        }

        return handleResponse(res, 200, "Tasks fetched successfully.", tasks);

    } catch (error) {
        console.error("Error fetching user tasks:", error);
        return handleResponse(res, 500, "Server error: Could not fetch tasks.");
    }
};


export const updateTaskbyId = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const { title, completed } = req.body;

        // console.log(taskId);
        // console.log(userId);
        // console.log(req.body);
        

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return handleResponse(res, 400, "Invalid task ID format.");
        }

        
        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            { $set: { title, completed } },
            { new: true } 
        );

        if (!task) {
            return handleResponse(res, 404, "Task not found or user not authorized.");
        }

        return handleResponse(res, 200, "Task updated successfully.", task);

    } catch (error) {
        console.error("Error updating task:", error);
        return handleResponse(res, 500, "Server error: Could not update task.");
    }
};


export const deleteTaskbyId = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return handleResponse(res, 400, "Invalid task ID format.");
        }

        
        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

        if (!task) {
            return handleResponse(res, 404, "Task not found or user not authorized.");
        }

        return handleResponse(res, 200, "Task deleted successfully.", task);

    } catch (error) {
        console.error("Error deleting task:", error);
        return handleResponse(res, 500, "Server error: Could not delete task.");
    }
};