import { ObjectId, Schema, model } from 'mongoose';

export interface IProject {
    name: string;
    description: string;
    tasks: ObjectId[]; 
}

const projectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true,},
        description: { type: String, required: true},
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }] 
    },
);

export const ProjectModel = model('Project', projectSchema);