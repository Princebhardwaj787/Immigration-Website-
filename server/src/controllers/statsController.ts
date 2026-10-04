import { asyncHandler } from '../middleware/error';
import { Lead } from '../models/Lead';
import { BlogPost } from '../models/BlogPost';

/** GET /api/admin/stats */
export const getStats = asyncHandler(async (_req, res) => {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [totalLeads, newLeads, consultationRequests, activeLeads, byVisaType, byCountry, recent, byStatus] =
    await Promise.all([
      Lead.countDocuments({ archived: false }),
      Lead.countDocuments({ status: 'New', archived: false }),
      Lead.countDocuments({ source: 'consultation', archived: false }),
      Lead.find({ archived: false }).sort({ createdAt: -1 }).limit(8).lean(),
      Lead.aggregate([
        { $match: { archived: false } },
        { $group: { _id: '$visaType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $match: { archived: false, country: { $exists: true, $ne: '' } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Lead.find({ archived: false }).sort({ createdAt: -1 }).limit(6).lean(),
      Lead.aggregate([
        { $match: { archived: false } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

  const totalBlog = await BlogPost.countDocuments();

  res.json({
    success: true,
    data: {
      totals: {
        leads: totalLeads,
        new: newLeads,
        consultations: consultationRequests,
        publishedPosts: totalBlog,
      },
      byVisaType: byVisaType.map((b) => ({ label: b._id || 'Unspecified', count: b.count })),
      byCountry: byCountry.map((b) => ({ label: b._id || 'Unspecified', count: b.count })),
      byStatus: byStatus.map((b) => ({ label: b._id || 'Unspecified', count: b.count })),
      recent: recent.map((l) => ({ ...l, id: l._id })),
      recentApplications: activeLeads.map((l) => ({ ...l, id: l._id })),
    },
  });
});
