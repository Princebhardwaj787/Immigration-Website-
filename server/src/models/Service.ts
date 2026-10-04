import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

const serviceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    icon: { type: String, default: 'FileText', trim: true },
    tagline: { type: String, trim: true, maxlength: 240 },
    summary: { type: String, required: true, trim: true, maxlength: 600 },
    description: { type: String, trim: true, maxlength: 6000 },
    benefits: { type: [String], default: [] },
    checklist: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type ServiceDoc = InferSchemaType<typeof serviceSchema>;
export const Service: Model<ServiceDoc> = model('Service', serviceSchema);
