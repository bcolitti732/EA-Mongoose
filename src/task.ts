import { ObjectId, Schema, model } from 'mongoose';

export interface ITask {
    title: string;
    description: string;
    project: string;
    completed: boolean;
    _id?: string;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        completed: { type: Boolean, default: false }
    },
);

export const TaskModel = model('Task', taskSchema);