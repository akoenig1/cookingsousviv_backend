import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import { stringify } from 'uuid';

const Schema = mongoose.Schema;
const userSchema = new Schema (
  {
    id: { 
      type: String, 
      required: true,
    },
    email: { 
      type: String, 
      required: true,
    },
    name: { 
      type: String, 
      required: true,
    },
    imageUrl: { 
      type: String,
    },
    admin: { 
      type: Boolean, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
)

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);