const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  companyClaimed: { type: String, default: 'Unknown' },
  riskScore: { type: Number, required: true },
  verdict: { type: String, enum: ['SAFE', 'SUSPICIOUS', 'HIGH_RISK_SCAM'], required: true },
  summary: { type: String, required: true },
  redFlags: { type: [String], default: [] },
  greenFlags: { type: [String], default: [] },
  verificationSteps: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
