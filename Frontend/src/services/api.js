import axios from 'axios';
import { mockAnalyze, saveReportToHistory } from './mockAiService';

const BACKEND_URL = 'http://localhost:5000/api/verify';

export const verifyJobOffer = async ({ textContent, file }) => {
  try {
    const formData = new FormData();
    if (textContent) formData.append('textContent', textContent);
    if (file) formData.append('document', file);

    const response = await axios.post(BACKEND_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 5000 // 5 sec timeout to fallback smoothly if backend is offline
    });

    const data = response.data;
    const report = {
      id: data._id || `report-${Date.now()}`,
      companyClaimed: data.companyClaimed || 'Unknown',
      riskScore: data.riskScore ?? 50,
      verdict: data.verdict || 'SUSPICIOUS',
      summary: data.summary || '',
      redFlags: data.redFlags || [],
      greenFlags: data.greenFlags || [],
      verificationSteps: data.verificationSteps || [],
      createdAt: data.createdAt || new Date().toISOString()
    };

    saveReportToHistory(report);
    return report;
  } catch (error) {
    console.warn('Backend unavailable or network error. Using ScamShield AI Mock Analyzer engine:', error.message);
    return await mockAnalyze({ textContent, file });
  }
};
