# 🛡️ ScamShield AI - Antigravity Agent Blueprint

**Agent Instructions:** 
You are tasked with building a full-stack MERN-style application (React + Express) called ScamShield AI. Please read through this entire document, generate a Task Plan, and execute the steps to build the application. Follow the exact file structures, commands, and code snippets provided below.

---

## 1. Project Overview
ScamShield AI is an internship and job scam detection platform. It allows users to input text or upload screenshots/PDFs of job offers. The backend uses the Google Gemini 1.5 Flash API to analyze the input and return a structured JSON risk report, which is saved to MongoDB. The frontend displays this report via a React dashboard styled with Tailwind CSS.

---

## 2. Environment Setup & Execution Plan
**Agent Action:** Run these commands to initialize the workspaces.

### 2.1 Backend Initialization
```bash
mkdir scamshield && cd scamshield
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv @google/genai express-fileupload
npm install --save-dev nodemon
```

### 2.2 Frontend Initialization
```bash
cd ../
npm create vite@latest frontend -- --template react
cd frontend
npm install axios lucide-react react-circular-progressbar clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 3. Backend Implementation (Express.js)
**Agent Action:** Create the following files in the `backend` directory.

### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/scamshield
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```
*(Agent Note: Leave placeholder for user to fill API keys later)*

### `backend/models/Report.js`
```javascript
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
```

### `backend/routes/verify.js`
```javascript
const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Report = require('../models/Report');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SCAM_DETECTOR_SYSTEM_PROMPT = `
You are an expert Cybersecurity & Fraud Detection Engine.
Analyze the provided image (screenshot/document) or text input for scam indicators. 

Check for:
1. Financial demands (security deposits, training fees).
2. Informal communication (Telegram/WhatsApp, free webmail).
3. Scam tactics ("Comment INTERESTED", forced Telegram joins).
4. Domain spoofing.
5. Immediate selection without interviews.

Output strictly valid JSON format matching this schema:
{
  "riskScore": number (0-100),
  "verdict": "SAFE" | "SUSPICIOUS" | "HIGH_RISK_SCAM",
  "companyClaimed": string,
  "summary": string,
  "redFlags": string[],
  "greenFlags": string[],
  "verificationSteps": string[]
}
`;

router.post('/', async (req, res) => {
  try {
    const { textContent } = req.body;
    let file = req.files ? req.files.document : null;
    
    if (!textContent && !file) {
      return res.status(400).json({ error: 'Please provide text or an image/pdf.' });
    }

    const contents = [];
    if (textContent) {
      contents.push({ text: `Analyze this job posting/link/text: ${textContent}` });
    }

    if (file) {
      const mimeType = file.mimetype === 'application/pdf' ? 'application/pdf' : file.mimetype;
      contents.push({
        inlineData: {
          mimeType: mimeType,
          data: file.data.toString('base64'),
        },
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        { role: "user", parts: [{ text: SCAM_DETECTOR_SYSTEM_PROMPT }, ...contents] }
      ],
      config: { responseMimeType: "application/json" },
    });

    const cleanText = response.text().replace(/\`\`\`json|\`\`\`/g, '').trim();
    const result = JSON.parse(cleanText);

    const newReport = new Report(result);
    await newReport.save();

    res.json(result);
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process request with Gemini.' });
  }
});

module.exports = router;
```

### `backend/server.js`
```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api/verify', require('./routes/verify'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 4. Frontend Implementation (React + Tailwind)
**Agent Action:** Configure Tailwind and create the React components in the `frontend` directory.

### `frontend/tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### `frontend/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f9fafb;
}
```

### `frontend/src/components/ScannerForm.jsx`
```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Loader2 } from 'lucide-react';

export default function ScannerForm({ onResult, onError }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !file) return onError("Please enter text or upload a file.");
    
    setLoading(true);
    onError(null);

    const formData = new FormData();
    if (text) formData.append('textContent', text);
    if (file) formData.append('document', file);

    try {
      const res = await axios.post('http://localhost:5000/api/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onResult(res.data);
    } catch (err) {
      console.error(err);
      onError(err.response?.data?.error || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Paste Job Description or URL</label>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
          rows="4"
          placeholder="e.g., Immediate hiring for Software Engineer! Pay 2000 INR deposit..."
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Offer Letter or Screenshot</label>
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 font-medium">{file ? file.name : "Click to upload PDF or Image"}</p>
            <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, PDF up to 5MB</p>
          </div>
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*,application/pdf" />
        </label>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-70"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {loading ? 'Analyzing with AI...' : 'Scan for Risk'}
      </button>
    </form>
  );
}
```

### `frontend/src/components/ResultDashboard.jsx`
```jsx
import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Info } from 'lucide-react';

export default function ResultDashboard({ data }) {
  if (!data) return null;

  const isSafe = data.verdict === 'SAFE';
  const isSuspicious = data.verdict === 'SUSPICIOUS';
  
  const containerClass = isSafe ? 'border-green-200 bg-green-50' : isSuspicious ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50';
  const textClass = isSafe ? 'text-green-800' : isSuspicious ? 'text-yellow-800' : 'text-red-800';
  const Icon = isSafe ? ShieldCheck : isSuspicious ? AlertTriangle : ShieldAlert;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Banner */}
      <div className={`flex items-center justify-between p-5 rounded-xl border ${containerClass}`}>
        <div className="flex items-center gap-4">
          <Icon className={`w-10 h-10 ${textClass}`} />
          <div>
            <h3 className={`text-2xl font-black ${textClass}`}>{data.verdict.replace(/_/g, ' ')}</h3>
            <p className={`text-sm font-semibold opacity-90 ${textClass}`}>Risk Score: {data.riskScore}/100</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase text-gray-500">Entity Detected</p>
          <p className="text-lg font-bold text-gray-900">{data.companyClaimed}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed font-medium">{data.summary}</p>

      {/* Flags Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.redFlags?.length > 0 && (
          <div className="bg-red-50/50 p-5 rounded-xl border border-red-100">
            <h4 className="font-bold text-red-700 flex items-center mb-3"><AlertTriangle className="w-4 h-4 mr-2"/> Critical Red Flags</h4>
            <ul className="list-disc pl-5 text-sm text-red-900 space-y-2">
              {data.redFlags.map((flag, idx) => <li key={idx}>{flag}</li>)}
            </ul>
          </div>
        )}
        
        {data.greenFlags?.length > 0 && (
          <div className="bg-green-50/50 p-5 rounded-xl border border-green-100">
            <h4 className="font-bold text-green-700 flex items-center mb-3"><ShieldCheck className="w-4 h-4 mr-2"/> Green Flags</h4>
            <ul className="list-disc pl-5 text-sm text-green-900 space-y-2">
              {data.greenFlags.map((flag, idx) => <li key={idx}>{flag}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Next Steps */}
      {data.verificationSteps?.length > 0 && (
        <div className="mt-6 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-800 flex items-center mb-3"><Info className="w-4 h-4 mr-2"/> Recommended Actions</h4>
          <ul className="list-decimal pl-5 text-sm text-blue-900 space-y-2">
            {data.verificationSteps.map((step, idx) => <li key={idx}>{step}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### `frontend/src/App.jsx`
```jsx
import React, { useState } from 'react';
import ScannerForm from './components/ScannerForm';
import ResultDashboard from './components/ResultDashboard';
import { Shield } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">ScamShield <span className="text-blue-600">AI</span></h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Protect Your Career.</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">Upload a screenshot, offer letter, or paste a sketchy recruiter message to verify its authenticity instantly using AI.</p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <ScannerForm onResult={setResult} onError={setError} />
        <ResultDashboard data={result} />
      </main>
    </div>
  );
}
```

---

## 5. Agent Testing & Validation
Once the files are created, the Agent should:
1. Ensure `mongod` is running locally.
2. Start the backend: `cd backend && npm run dev`
3. Start the frontend: `cd frontend && npm run dev`
4. Confirm both servers launch without errors.
