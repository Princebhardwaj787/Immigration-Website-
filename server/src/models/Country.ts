import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

const countrySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    image: { type: String, trim: true, maxlength: 500 },
    tagline: { type: String, trim: true, maxlength: 240 },
    overview: { type: String, required: true, trim: true, maxlength: 4000 },
    visaCategories: { type: [String], default: [] },
    popularPurposes: { type: [String], default: [] },
    /** General, non-binding information only - always paired with a disclaimer in the UI. */
    eligibilityOverview: { type: String, trim: true, maxlength: 3000 },
    documents: { type: [String], default: [] },
    processSteps: {
      type: [{ title: String, detail: String }],
      default: [],
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type CountryDoc = InferSchemaType<typeof countrySchema>;
export const Country: Model<CountryDoc> = model('Country', countrySchema);
