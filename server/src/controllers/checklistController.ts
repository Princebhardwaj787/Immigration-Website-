import { asyncHandler } from '../middleware/error';
import { ApiError } from '../utils/ApiError';
import { CHECKLISTS, CHECKLIST_DISCLAIMER } from '../data/checklists';

/** GET /api/checklists - all checklists (summary) */
export const listChecklists = asyncHandler(async (_req, res) => {
  const data = Object.values(CHECKLISTS).map((c) => ({
    visaType: c.visaType,
    label: c.label,
    note: CHECKLIST_DISCLAIMER,
    count: c.items.length,
  }));
  res.json({ success: true, data, disclaimer: CHECKLIST_DISCLAIMER });
});

/** GET /api/checklists/:visaType */
export const getChecklist = asyncHandler(async (req, res) => {
  const item = CHECKLISTS[String(req.params.visaType).toLowerCase()];
  if (!item) throw ApiError.notFound('Checklist not found for that visa type.');
  res.json({
    success: true,
    data: { ...item, note: CHECKLIST_DISCLAIMER },
    disclaimer: CHECKLIST_DISCLAIMER,
  });
});
