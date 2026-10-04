import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Consultation Scheduled',
  'In Progress',
  'Completed',
] as const;

export const LEAD_SOURCES = ['consultation', 'eligibility', 'contact'] as const;

const noteSchema = new Schema(
  {
    body: { type: String, required: true, trim: true, maxlength: 2000 },
    author: { type: String, default: 'admin', trim: true },
  },
  { _id: true, timestamps: { createdAt: true, updatedAt: false } },
);

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    phone: { type: String, trim: true, maxlength: 40 },
    country: { type: String, trim: true, maxlength: 80 },
    visaType: { type: String, trim: true, maxlength: 80 },
    preferredDate: { type: String, trim: true, maxlength: 40 },
    preferredTime: { type: String, trim: true, maxlength: 40 },
    message: { type: String, trim: true, maxlength: 3000 },
    source: { type: String, enum: LEAD_SOURCES, default: 'consultation' },
    status: { type: String, enum: LEAD_STATUSES, default: 'New', index: true },
    consent: { type: Boolean, default: false },
    archived: { type: Boolean, default: false, index: true },
    /** Extra answers captured by the eligibility checker (never an eligibility claim). */
    eligibility: {
      type: new Schema(
        {
          ageRange: String,
          residence: String,
          destination: String,
          purpose: String,
          education: String,
          experience: String,
          budget: String,
          timeline: String,
        },
        { _id: false },
      ),
      default: undefined,
    },
    notes: { type: [noteSchema], default: [] },
  },
  { timestamps: true },
);

leadSchema.index({ name: 'text', email: 'text', phone: 'text' });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ visaType: 1 });
leadSchema.index({ country: 1 });

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export const Lead: Model<LeadDoc> = model('Lead', leadSchema);
