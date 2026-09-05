const express = require('express');
const router = express.Router();
const { verifyContent, getRecentReports } = require('../controllers/verifyController');

// POST /api/verify - Scan text or uploaded image/PDF for fraud indicators
router.post('/', verifyContent);

// GET /api/verify/history - Get recent verification reports
router.get('/history', getRecentReports);

module.exports = router;
