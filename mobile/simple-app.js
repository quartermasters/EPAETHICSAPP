// EPA Ethics Mobile App - Simplified for Local Testing
// Developed by St. Michael Enterprises LLC - EPA Contract 68HERD25Q0050

const express = require('express');
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
            .header {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                color: #1B365D;
                padding: 1.5rem 1rem;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                position: sticky;
                top: 0;
                z-index: 100;
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
                overflow: hidden;
                padding: 6px;
            }
            .logo-icon img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                background: white;
                border-radius: 10px;
            }
            .container {
                max-width: 400px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                min-height: 100vh;
                box-shadow: 0 0 60px rgba(0, 0, 0, 0.15);
                border-radius: 0;
                overflow: hidden;
                position: relative;
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
            .navigation {
                display: flex;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(27, 54, 93, 0.1);
                position: fixed;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                max-width: 400px;
                box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
                border-radius: 24px 24px 0 0;
            }
            .nav-item {
                flex: 1;
                text-align: center;
                padding: 1rem 0.5rem;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                text-decoration: none;
                color: #64748B;
                font-size: 0.75rem;
                font-weight: 500;
                position: relative;
            }
            .nav-item:hover, .nav-item.active {
                background: linear-gradient(135deg, rgba(27, 54, 93, 0.1) 0%, rgba(165, 28, 48, 0.1) 100%);
                color: #1B365D;
                transform: translateY(-2px);
            }
            .nav-item.active::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 32px;
                height: 3px;
                background: linear-gradient(135deg, #1B365D 0%, #A51C30 100%);
                border-radius: 0 0 8px 8px;
            }
            .nav-icon {
                font-size: 1.4rem;
                margin-bottom: 0.25rem;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .nav-item:hover .nav-icon {
                transform: scale(1.1);
            }
            .content {
                padding: 0;
                padding-bottom: 6rem;
            }
            .feature-card {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
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
            .feature-card:hover .feature-icon {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(27, 54, 93, 0.3);
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
            .api-status {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
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
            .developer-logo {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 0.5rem;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 2px;
                overflow: hidden;
            }
            
            /* Smooth scrolling and performance */
            html {
                scroll-behavior: smooth;
            }
            
            /* Loading animations */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .feature-card {
                animation: fadeInUp 0.6s ease-out;
            }
            
            .feature-card:nth-child(1) { animation-delay: 0.1s; }
            .feature-card:nth-child(2) { animation-delay: 0.2s; }
            .feature-card:nth-child(3) { animation-delay: 0.3s; }
            .feature-card:nth-child(4) { animation-delay: 0.4s; }
            .feature-card:nth-child(5) { animation-delay: 0.5s; }
            
            /* Modern focus states for accessibility */
            .feature-card:focus, .nav-item:focus {
                outline: 2px solid #1B365D;
                outline-offset: 2px;
            }
            
            /* Progressive enhancement for supported browsers */
            @supports (backdrop-filter: blur(20px)) {
                .header, .container, .navigation {
                    backdrop-filter: blur(20px);
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <div class="logo-icon">
                        <img src="st-michael-logo.png" alt="St. Michael Enterprises LLC">
                    </div>
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
                
                <div class="feature-card" onclick="showFeature('ethics-guide')">
                    <div class="feature-icon">GUIDE</div>
                    <div class="feature-title">Ethics Guide</div>
                    <div class="feature-desc">Interactive guide to federal ethics requirements</div>
                </div>
                
                <div class="feature-card" onclick="showFeature('quiz')">
                    <div class="feature-icon">QUIZ</div>
                    <div class="feature-title">Test Your Knowledge</div>
                    <div class="feature-desc">Quiz to test your ethics understanding</div>
                </div>
                
                <div class="feature-card" onclick="showFeature('videos')">
                    <div class="feature-icon">VIDEO</div>
                    <div class="feature-title">Training Videos</div>
                    <div class="feature-desc">Whiteboard training sessions</div>
                </div>
                
                <div class="feature-card" onclick="showFeature('resources')">
                    <div class="feature-icon">DOCS</div>
                    <div class="feature-title">Resources</div>
                    <div class="feature-desc">FAQs, glossary, and documents</div>
                </div>
                
                <div class="developer-info">
                    <div class="developer-logo">
                        <img src="st-michael-logo.png" alt="St. Michael Enterprises LLC" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    </div>
                    <div>Developed by St. Michael Enterprises LLC</div>
                    <div>EPA Contract 68HERD25Q0050</div>
                    <div style="margin-top: 0.5rem; font-size: 0.7rem; opacity: 0.8;">Professional Federal Ethics Solutions</div>
                </div>
            </div>
            
            <div class="navigation">
                <a href="#" class="nav-item active" onclick="showHome()">
                    <div class="nav-icon">🏠</div>
                    <div>Home</div>
                </a>
                <a href="#" class="nav-item" onclick="showFeature('ethics-guide')">
                    <div class="nav-icon">📚</div>
                    <div>Guide</div>
                </a>
                <a href="#" class="nav-item" onclick="showFeature('quiz')">
                    <div class="nav-icon">🧠</div>
                    <div>Quiz</div>
                </a>
                <a href="#" class="nav-item" onclick="showFeature('videos')">
                    <div class="nav-icon">🎥</div>
                    <div>Videos</div>
                </a>
                <a href="#" class="nav-item" onclick="showFeature('resources')">
                    <div class="nav-icon">📋</div>
                    <div>Resources</div>
                </a>
            </div>
        </div>

        <script>
            // Check backend API status
            async function checkAPIStatus() {
                try {
                    const response = await fetch('http://localhost:3001/api/health');
                    const data = await response.json();
                    document.getElementById('apiStatus').innerHTML = \`
                        <span class="status-indicator status-online"></span>
                        Backend connected - \${data.developer}
                    \`;
                } catch (error) {
                    document.getElementById('apiStatus').innerHTML = \`
                        <span class="status-indicator status-offline"></span>
                        Backend offline - Start backend on port 3001
                    \`;
                }
            }
            
            function showHome() {
                setActiveNav(0);
                document.getElementById('content').innerHTML = \`
                    <div class="welcome">
                        <h2>Welcome to EthicsGo</h2>
                        <p>Your guide to federal ethics awareness and compliance</p>
                    </div>
                    
                    <div class="api-status" id="apiStatus">
                        <span class="status-indicator status-offline"></span>
                        Checking backend connection...
                    </div>
                    
                    <div class="feature-card" onclick="showFeature('ethics-guide')">
                        <div class="feature-icon">GUIDE</div>
                        <div class="feature-title">Ethics Guide</div>
                        <div class="feature-desc">Interactive guide to federal ethics requirements</div>
                    </div>
                    
                    <div class="feature-card" onclick="showFeature('quiz')">
                        <div class="feature-icon">QUIZ</div>
                        <div class="feature-title">Test Your Knowledge</div>
                        <div class="feature-desc">Quiz to test your ethics understanding</div>
                    </div>
                    
                    <div class="feature-card" onclick="showFeature('videos')">
                        <div class="feature-icon">VIDEO</div>
                        <div class="feature-title">Training Videos</div>
                        <div class="feature-desc">Whiteboard training sessions</div>
                    </div>
                    
                    <div class="feature-card" onclick="showFeature('resources')">
                        <div class="feature-icon">DOCS</div>
                        <div class="feature-title">Resources</div>
                        <div class="feature-desc">FAQs, glossary, and documents</div>
                    </div>
                    
                    <div class="developer-info">
                        <div class="developer-logo">
                            <img src="st-michael-logo.png" alt="St. Michael Enterprises LLC" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        </div>
                        <div>Developed by St. Michael Enterprises LLC</div>
                        <div>EPA Contract 68HERD25Q0050</div>
                        <div style="margin-top: 0.5rem; font-size: 0.7rem; opacity: 0.8;">Professional Federal Ethics Solutions</div>
                    </div>
                \`;
                checkAPIStatus();
            }
            
            async function showFeature(feature) {
                const content = document.getElementById('content');
                
                switch(feature) {
                    case 'ethics-guide':
                        setActiveNav(1);
                        content.innerHTML = await loadEthicsGuide();
                        break;
                    case 'quiz':
                        setActiveNav(2);
                        content.innerHTML = await loadQuiz();
                        break;
                    case 'videos':
                        setActiveNav(3);
                        content.innerHTML = await loadVideos();
                        break;
                    case 'resources':
                        setActiveNav(4);
                        content.innerHTML = await loadResources();
                        break;
                }
            }
            
            function setActiveNav(index) {
                document.querySelectorAll('.nav-item').forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
            }
            
            async function loadEthicsGuide() {
                try {
                    const response = await fetch('http://localhost:3001/api/content/modules');
                    const data = await response.json();
                    
                    if (data.success) {
                        return \`
                            <h2 style="color: #0066CC; margin-bottom: 1rem;">📚 Ethics Guide</h2>
                            <p style="margin-bottom: 1.5rem; color: #666;">Interactive modules covering key ethics topics</p>
                            \${data.data.map(module => \`
                                <div class="feature-card">
                                    <div class="feature-title">\${module.title}</div>
                                    <div class="feature-desc">\${module.description}</div>
                                    <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #0066CC;">\${module.estimatedTime}</div>
                                </div>
                            \`).join('')}
                        \`;
                    }
                } catch (error) {
                    return '<p>Error loading ethics modules. Make sure backend is running.</p>';
                }
            }
            
            async function loadQuiz() {
                try {
                    const response = await fetch('http://localhost:3001/api/content/quiz');
                    const data = await response.json();
                    
                    if (data.success) {
                        return \`
                            <h2 style="color: #0066CC; margin-bottom: 1rem;">🧠 Test Your Knowledge</h2>
                            <p style="margin-bottom: 1.5rem; color: #666;">Quiz questions to test your understanding</p>
                            \${data.data.map((question, index) => \`
                                <div class="feature-card">
                                    <div class="feature-title">Question \${index + 1}</div>
                                    <div class="feature-desc">\${question.question}</div>
                                    <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #0066CC;">Category: \${question.category}</div>
                                </div>
                            \`).join('')}
                        \`;
                    }
                } catch (error) {
                    return '<p>Error loading quiz questions. Make sure backend is running.</p>';
                }
            }
            
            async function loadVideos() {
                try {
                    const response = await fetch('http://localhost:3001/api/content/videos');
                    const data = await response.json();
                    
                    if (data.success) {
                        return \`
                            <h2 style="color: #0066CC; margin-bottom: 1rem;">🎥 Training Videos</h2>
                            <p style="margin-bottom: 1.5rem; color: #666;">Whiteboard training sessions</p>
                            \${data.data.map(video => \`
                                <div class="feature-card">
                                    <div class="feature-title">\${video.title}</div>
                                    <div class="feature-desc">\${video.description}</div>
                                    <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #0066CC;">Duration: \${video.duration}</div>
                                </div>
                            \`).join('')}
                        \`;
                    }
                } catch (error) {
                    return '<p>Error loading videos. Make sure backend is running.</p>';
                }
            }
            
            async function loadResources() {
                try {
                    const faqResponse = await fetch('http://localhost:3001/api/content/faq');
                    const glossaryResponse = await fetch('http://localhost:3001/api/content/glossary');
                    
                    const faqData = await faqResponse.json();
                    const glossaryData = await glossaryResponse.json();
                    
                    return \`
                        <h2 style="color: #0066CC; margin-bottom: 1rem;">📋 Resources</h2>
                        
                        <h3 style="color: #333; margin: 1.5rem 0 1rem 0;">Frequently Asked Questions</h3>
                        \${faqData.success ? faqData.data.map(faq => \`
                            <div class="feature-card">
                                <div class="feature-title">\${faq.question}</div>
                                <div class="feature-desc">\${faq.answer}</div>
                            </div>
                        \`).join('') : '<p>Error loading FAQ</p>'}
                        
                        <h3 style="color: #333; margin: 1.5rem 0 1rem 0;">Glossary Terms</h3>
                        \${glossaryData.success ? glossaryData.data.map(term => \`
                            <div class="feature-card">
                                <div class="feature-title">\${term.term}</div>
                                <div class="feature-desc">\${term.definition}</div>
                            </div>
                        \`).join('') : '<p>Error loading glossary</p>'}
                    \`;
                } catch (error) {
                    return '<p>Error loading resources. Make sure backend is running.</p>';
                }
            }
            
            // Initialize
            checkAPIStatus();
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  EPA ETHICS MOBILE APP - EthicsGo');
  console.log('  Developed by St. Michael Enterprises LLC');
  console.log('  EPA Contract 68HERD25Q0050');
  console.log('  Professional Federal Ethics Solutions');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Mobile App running on port ${PORT}`);
  console.log(`  Main App: http://localhost:${PORT}`);
  console.log(`  Modern UI: http://localhost:${PORT}/screens/index.html`);
  console.log('  Simulate mobile: Press F12 in browser and click mobile icon');
  console.log('═══════════════════════════════════════════════════════════');
});