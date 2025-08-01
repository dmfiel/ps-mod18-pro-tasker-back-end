import mongoose, { Schema } from 'mongoose';

export type StatusType = 'To Do' | 'In Progress' | 'Done';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    priority: {
      type: String,
      enum: ['3-low', '2-medium', '1-high']
    },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
