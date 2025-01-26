const Task = require('../models/taskModel')
const mongoose = require('mongoose')

//GET all tasks
const getTasks = async (req, res) =>{
    const tasks = await Task.find({}).sort({createdAt: -1})
    res.status(200).json(tasks)
}

//GET a single task
const getTask = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)

}

//POST a new task
const createTask = async (req, res) => {
    const {title, description, status} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        const task = await Task.create({title, description, status})
        res.status(200).json(task)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

//UPDATE a task
// const updateTask = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such task'})
//     }

//     const task = await Task.findByIdAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if (!task) {
//         return res.status(404).json({error: 'No such task'})
//     }

//     res.status(200).json(task)

// }

//UPDATE a task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findByIdAndUpdate(
        {_id: id}, 
        {...req.body},
        {new: true}
    )

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)

}


module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}