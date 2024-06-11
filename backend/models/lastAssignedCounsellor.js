// models/assignmentConfig.model.js
import mongoose from 'mongoose';

const assignmentConfigSchema = new mongoose.Schema({
  lastAssignedCounsellorIndex: {
    type: Number,
    default: 0
  }
},{timestamps:true});

const assignmentConfigModal = mongoose.model('AssignmentConfig', assignmentConfigSchema);

export default assignmentConfigModal;