const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  title: { type: String , required: true},
  description: { type: String , required: true},
  completed: { type: Boolean, default: false },
  dueDate: { type: Date , default: Date.now},
  imageUrl: { type: String },
  fileUrl: { type: String },
  tags: { type: [String] , default: [] },
  recommendations: { type: [String] },
},  { timestamps: true } 
);

const TaskModel = mongoose.model('Task' ,taskSchema);

module.exports = TaskModel;