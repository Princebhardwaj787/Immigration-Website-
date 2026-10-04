import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 300 },
    answer: { type: String, required: true, trim: true, maxlength: 3000 },
    category: { type: String, trim: true, maxlength: 80, default: 'General' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type FaqDoc = InferSchemaType<typeof faqSchema>;
export const Faq: Model<FaqDoc> = model('Faq', faqSchema);
