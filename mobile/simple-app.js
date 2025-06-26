// EPA Ethics Mobile App - Web Demo Server
// Developed by St. Michael Enterprises LLC - EPA Contract 68HERD25Q0050

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 19007;

app.use(express.static('.'));
app.use('/screens', express.static('screens'));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EPA Ethics App - EthicsGo</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Inter', sans-serif;
                background: linear-gradient(135deg, #1B365D 0%, #A51C30 100%);
                min-height: 100vh;
                overflow-x: hidden;
            }
            .container {
                max-width: 400px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                min-height: 100vh;
                box-shadow: 0 0 60px rgba(0, 0, 0, 0.15);
            }
            .header {
                background: rgba(255, 255, 255, 0.95);
                color: #1B365D;
                padding: 1.5rem 1rem;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .logo-icon {
                width: 60px;
                height: 60px;
                background: white;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 24px rgba(27, 54, 93, 0.3);
                font-size: 1.5rem;
                color: #1B365D;
                font-weight: bold;
            }
            .welcome {
                padding: 2rem;
                text-align: center;
                background: linear-gradient(135deg, rgba(27, 54, 93, 0.1) 0%, rgba(165, 28, 48, 0.1) 100%);
                border-bottom: 1px solid rgba(27, 54, 93, 0.1);
                margin-bottom: 1rem;
            }
            .welcome h2 {
                background: linear-gradient(135deg, #1B365D 0%, #A51C30 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 1rem;
                font-size: 1.8rem;
                font-weight: 700;
            }
            .api-status {
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid rgba(27, 54, 93, 0.2);
                border-radius: 16px;
                padding: 1rem;
                margin: 0 1rem 1.5rem 1rem;
                text-align: center;
                box-shadow: 0 4px 16px rgba(27, 54, 93, 0.1);
                font-weight: 500;
            }
            .status-indicator {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 0.5rem;
                box-shadow: 0 0 8px currentColor;
                animation: pulse 2s infinite;
            }
            .status-online { background: #10B981; }
            .status-offline { background: #EF4444; }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
            .feature-card {
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid rgba(27, 54, 93, 0.1);
                border-radius: 20px;
                padding: 1.5rem;
                margin: 0 1rem 1rem 1rem;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 8px 32px rgba(27, 54, 93, 0.1);
                position: relative;
                overflow: hidden;
            }
            .feature-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #1B365D 0%, #A51C30 100%);
            }
            .feature-card:hover {
                box-shadow: 0 16px 64px rgba(27, 54, 93, 0.2);
                transform: translateY(-8px) scale(1.02);
                border-color: rgba(27, 54, 93, 0.2);
            }
            .feature-icon {
                font-size: 0.8rem;
                font-weight: 700;
                letter-spacing: 0.1em;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, #1B365D 0%, #A51C30 100%);
                color: white;
                padding: 0.8rem 1.2rem;
                border-radius: 12px;
                display: inline-block;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 12px rgba(27, 54, 93, 0.2);
            }
            .feature-title {
                font-size: 1.2rem;
                font-weight: 700;
                color: #1E293B;
                margin-bottom: 0.5rem;
                letter-spacing: -0.025em;
            }
            .feature-desc {
                color: #64748B;
                font-size: 0.9rem;
                line-height: 1.6;
                font-weight: 400;
            }
            .developer-info {
                background: linear-gradient(135deg, #1B365D 0%, #A51C30 100%);
                color: white;
                padding: 1.5rem;
                text-align: center;
                font-size: 0.8rem;
                margin: 2rem 1rem 6rem 1rem;
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(27, 54, 93, 0.3);
                position: relative;
                overflow: hidden;
            }
            .developer-info::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
                pointer-events: none;
            }
            .content {
                padding: 0;
                padding-bottom: 2rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <div class="logo-icon">EPA</div>
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold;">EthicsGo</div>
                        <div style="font-size: 0.8rem; opacity: 0.9;">Federal Ethics Awareness</div>
                    </div>
                </div>
            </div>
            
            <div class="content" id="content">
                <div class="welcome">
                    <h2>Welcome to EthicsGo</h2>
                    <p>Your guide to federal ethics awareness and compliance</p>
                </div>
                
                <div class="api-status" id="apiStatus">
                    <span class="status-indicator status-offline"></span>
                    Checking backend connection...
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">GUIDE</div>
                    <div class="feature-title">Ethics Guide</div>
                    <div class="feature-desc">Interactive guide to federal ethics requirements</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">QUIZ</div>
                    <div class="feature-title">Test Your Knowledge</div>
                    <div class="feature-desc">Quiz to test your ethics understanding</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">VIDEO</div>
                    <div class="feature-title">Training Videos</div>
                    <div class="feature-desc">Professional training sessions</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">DOCS</div>
                    <div class="feature-title">Resources</div>
                    <div class="feature-desc">FAQs, glossary, and documents</div>
                </div>
                
                <div class="developer-info">
                    <div>Developed by St. Michael Enterprises LLC</div>
                    <div>EPA Contract 68HERD25Q0050</div>
                    <div style="margin-top: 0.5rem; font-size: 0.7rem; opacity: 0.8;">Professional Federal Ethics Solutions</div>
                </div>
            </div>
        </div>

        <script>
            // Check backend API status
            async function checkAPIStatus() {
                try {
                    const response = await fetch('http://localhost:3002/api/health');
                    const data = await response.json();
                    document.getElementById('apiStatus').innerHTML = 
                        '<span class="status-indicator status-online"></span>' +
                        'Backend connected - ' + data.developer;
                } catch (error) {
                    document.getElementById('apiStatus').innerHTML = 
                        '<span class="status-indicator status-offline"></span>' +
                        'Backend offline - Start backend on port 3002';
                }
            }
            
            // Initialize
            checkAPIStatus();
            
            // Refresh API status every 10 seconds
            setInterval(checkAPIStatus, 10000);
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('======================================================================');
  console.log('  EPA ETHICS MOBILE APP - WEB DEMO');
  console.log('  Contract: EPA 68HERD25Q0050');
  console.log('  Developer: St. Michael Enterprises LLC');
  console.log('======================================================================');
  console.log('  Mobile App Web Demo: http://localhost:' + PORT);
  console.log('  For mobile testing: Use Expo Go with QR code');
  console.log('  Simulate mobile: Press F12 in browser and click mobile icon');
  console.log('======================================================================');
});
