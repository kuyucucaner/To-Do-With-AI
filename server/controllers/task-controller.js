const TaskModel = require('../models/task-model');
const UserModel = require('../models/user-model');
const TaskController = {

    getAllTaskByUserId : async function (req, res) {
        const userId = req.user.id;
        try {
            const tasks = await TaskModel.find({ userId });
            if(!tasks){
                return res.status(404).json({ message : 'No tasks found for this user!'});
            }
            console.log("Task with userId:" , tasks);
            return res.status(200).json({ tasks : tasks , message : 'Task successfully retrieved!'});
        }
        catch (error) {
            res.status(500).json({ message : error.message});
        }
    },
    createTask : async function (req,res) {
        const { userId , title , description , completed, dueDate , tags } = req.body;
        const userAuthenticate = req.user.id;
        try {
            const user = await UserModel.findById(userAuthenticate);
            if(!user) {
                return res.status(404).json({ message : 'User not found!'});
            }

            const newTask = new TaskModel({
                userId : userAuthenticate,
                title,
                description,
                completed,
                dueDate,
                tags
            });
            const saveNewTask = await newTask.save();
            return res.status(201).json({ newTask : saveNewTask , message : 'Congratz! You create a new task!'});
        }
        catch(error){
            return res.status(500).json({ message : error.message});
        }
    },
    updateTask : async function(req,res){
        const { id } = req.params;
        const { title , description , completed, dueDate , tags } = req.body;
        try {
            const task = await TaskModel.findById(id);
            if(!task) {
                return res.status(404).json({ message : 'Task not found!'});
            }
            task.title = title || task.title;
            task.description = description || task.description;
            task.completed = completed || task.completed;
            task.dueDate = dueDate || task.dueDate;
            task.tags = tags || task.tags;

            const updatedTask = await task.save();
            return res.status(200).json({ updatedTask : updatedTask, message : 'Task updated successfully!'});
        }
        catch(error){
            return res.status(500).json({ message : error.message});
        }
    },
    deleteTask : async function ( req, res) {
        const { id } = req.params;
        try{
            const task = await TaskModel.findByIdAndDelete(id);
            if(!task) {
                return res.status(404).json({ message : 'Task not found!'});
            }
            return res.status(200).json({ message : 'Task deleted successfully!'});
        }
        catch(error){
            return res.status(500).json({ message : error.message});
        }
    }


};

module.exports = TaskController;