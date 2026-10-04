import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

const adminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export type AdminDoc = InferSchemaType<typeof adminSchema>;
export const Admin: Model<AdminDoc> = model('Admin', adminSchema);
