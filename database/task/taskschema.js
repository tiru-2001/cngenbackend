import mongoose from 'mongoose';

const taskschema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    addressType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    carwash: {
      type: String,
      enum: ['exterior', 'interior', 'both'],
      required: true,
      default: 'both',
    },
    vehicleType: {
      type: String,
      required: true,
    },
    assignTime: {
      type: String,
      
    },
    assignDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const taskmodel = mongoose.model('taskmodel', taskschema);
export default taskmodel;
