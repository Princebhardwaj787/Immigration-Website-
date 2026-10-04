import { Schema, model, type InferSchemaType, type Model } from 'mongoose';

export const BLOG_CATEGORIES = [
  'Visa Updates',
  'Study Abroad',
  'Work Abroad',
  'Immigration',
  'Travel',
  'Country Guides',
  'Documentation',
  'Student Guides',
] as const;

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, trim: true, maxlength: 500 },
    content: { type: String, required: true, trim: true, maxlength: 60000 },
    category: { type: String, enum: BLOG_CATEGORIES, default: 'Immigration' },
    author: { type: String, trim: true, maxlength: 100, default: 'Editorial Team' },
    coverImage: { type: String, trim: true, maxlength: 500 },
    metaDescription: { type: String, trim: true, maxlength: 180 },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

blogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export type BlogPostDoc = InferSchemaType<typeof blogPostSchema>;
export const BlogPost: Model<BlogPostDoc> = model('BlogPost', blogPostSchema);
