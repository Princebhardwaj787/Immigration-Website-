import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40 },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    consent: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Completed', 'Archived'],
      default: 'New',
    },
  },
  { timestamps: true },
);

export type ContactMessageDoc = InferSchemaType<typeof contactMessageSchema>;
export const ContactMessage: Model<ContactMessageDoc> = model(
  'ContactMessage',
  contactMessageSchema,
);
