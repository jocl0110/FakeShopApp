import mongoose from "mongoose";
import zod from "zod";
const mongooseUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminCode: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "user",
  },
});
const userSchema = zod.object({
  firstName: zod
    .string()
    .min(3, "First name must be between 3 and 30 characters")
    .max(30, "First name must be between 3 and 30 characters"),
  lastName: zod
    .string()
    .min(3, "Last name must be between 3 and 30 characters")
    .max(30, "Last name must be between 3 and 30 characters"),
  username: zod
    .string()
    .min(3, "Username must be between 3 and 30 characters")
    .max(30, "Username must be between 3 and 30 characters"),
  email: zod.string().email("Email must be a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
  adminCode: zod.string().optional(),
});
const User = mongoose.model("User", mongooseUserSchema);

export function validateUser(user) {
  const result = userSchema.safeParse(user);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map((error) => error.message),
    };
  }
  return { success: true };
}

export default User;
