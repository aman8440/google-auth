import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
    allowNull: true,
  }
});
export default mongoose.model("User", userSchema);