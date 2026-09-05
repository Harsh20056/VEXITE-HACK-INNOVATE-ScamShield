const Report = require('../models/Report');
const { analyzeContentWithGemini } = require('../services/geminiService');

/**
 * Controller to verify job offer text or document for scam risk
 */
const verifyContent = async (req, res) => {
  try {
    const { textContent } = req.body;
    const file = req.files ? (req.files.document || req.files.file) : null;

    if (!textContent && !file) {
      return res.status(400).json({ error: 'Please provide text or an image/PDF document.' });
    }

    // Process analysis using Gemini AI service
    const analysisResult = await analyzeContentWithGemini(textContent, file);

    // Save report to MongoDB if database is connected
    try {
      const newReport = new Report(analysisResult);
      await newReport.save();
    } catch (dbError) {
      console.warn('Could not save report to MongoDB:', dbError.message);
    }

    return res.json(analysisResult);
  } catch (error) {
    console.error('Verification Controller Error:', error.message);
    return res.status(500).json({ 
      error: error.message || 'Failed to process scam verification request.' 
    });
  }
};

/**
 * Controller to fetch history of scan reports
 */
const getRecentReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(20);
    return res.json(reports);
  } catch (error) {
    console.error('Fetch Reports Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch scan history.' });
  }
};

module.exports = {
  verifyContent,
  getRecentReports,
};
