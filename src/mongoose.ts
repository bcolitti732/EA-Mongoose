import mongoose, { ObjectId } from 'mongoose';
import { UserModel, IUser } from './user.js';
import { ProjectModel, IProject } from './project.js';
import { TaskModel, ITask } from './task.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Conectado a MongoDB');

    // Crear un usuario
    const user1: IUser = {
      name: 'Bill',
      email: 'bill@initech.com',
      avatar: 'https://i.imgur.com/dM7Thhn.png'
    };

    const user2 = await new UserModel(user1).save();
    console.log("user2", user2);


    const task1: ITask = {
      title: 'Task 1',
      description: 'Do the thing',
      project: 'Project B',
      completed: false
    };

    const newTask1 = await new TaskModel(task1).save();

     const task2: ITask = {
      title: 'Task 2',
      description: 'Do the other thing',
      project: 'Project A',
      completed: true
    };

    const newTask2 = await new TaskModel(task2).save();

    const task3: ITask = {
      title: 'Task 3',
      description: 'Do the another thing',
      project: 'Project A',
      completed: false
    };

    const newTask3 = await new TaskModel(task3).save();

    const tasks: ObjectId[] = [newTask1.id, newTask2.id, newTask3.id];

    const project1: IProject = {
      name: 'Project A',
      description: 'doing the EA seminar',
      tasks: tasks
    };
    const newProject1 = await new ProjectModel(project1).save();
    console.log("project1", project1);
    const tasks2: ObjectId[] = [newTask1.id, newTask3.id];

    const project2: IProject = {
      name: 'Project B',
      description: 'making the EA seminar work, hopefully',
      tasks: tasks2
    };

    const newProject2 = await new ProjectModel(project2).save();
    console.log("newProject2", newProject2);

    const tasks3: ObjectId[] = [newTask1.id];

    const project3: IProject = {
      name: 'Project C',
      description: 'making the EA seminar work, finally!',
      tasks: tasks3
    };

    const newProject3 = await new ProjectModel(project3).save();

    // CRUD

    // Read
    const projects = await ProjectModel.find().populate('tasks');
    console.log("projects", projects);

    // Delete
    const projectToDelete = await ProjectModel.findOne({ name: 'Project A' }).populate('tasks');
    console.log("projectToDelete", projectToDelete);
    if (projectToDelete) {
      await projectToDelete.remove();
    }
    console.log("projectToDelete", projectToDelete);

    // Update
    const projectToUpdate = await ProjectModel.findOne({ name: 'Project B' }).populate('tasks');
    if (projectToUpdate) {
      projectToUpdate.name = 'Project X';
      await projectToUpdate.save();
    }
    console.log("projectToUpdate", projectToUpdate);  

     // Aggregation pipeline
     const completedTasks = await TaskModel.aggregate([
      { $match: { completed: true } }
    ]);
    console.log("completedTasks", completedTasks);
      

  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

main();