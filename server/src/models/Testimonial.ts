import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    country: { type: String, trim: true, maxlength: 80 },
    visaType: { type: String, trim: true, maxlength: 80 },
    review: { type: String, required: true, trim: true, maxlength: 1200 },
    avatar: { type: String, trim: true, maxlength: 500 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    /** Demo placeholder content must stay clearly separated from real client reviews. */
    isDemo: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema>;
export const Testimonial: Model<TestimonialDoc> = model('Testimonial', testimonialSchema);
