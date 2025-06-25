// EPA Ethics Admin Portal - Simplified for Local Testing
// Developed by St. Michael Enterprises LLC - EPA Contract 68HERD25Q0050

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Main admin portal page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EPA Ethics Admin Portal</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                width: 100%;
                max-width: 400px;
            }
            .logo {
                text-align: center;
                margin-bottom: 2rem;
            }
            .logo-circle {
                width: 80px;
                height: 80px;
                background: linear-gradient(45deg, #1B365D, #A51C30);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                color: white;
                font-weight: bold;
                font-size: 1.2rem;
            }
            .title {
                color: #1B365D;
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            .subtitle {
                color: #A51C30;
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }
            .contract {
                color: #666;
                font-size: 0.8rem;
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            label {
                display: block;
                margin-bottom: 0.5rem;
                color: #333;
                font-weight: 500;
            }
            input {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #ddd;
                border-radius: 5px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            input:focus {
                outline: none;
                border-color: #1B365D;
                box-shadow: 0 0 0 3px rgba(27, 54, 93, 0.1);
            }
            .btn {
                width: 100%;
                padding: 0.75rem;
                background: #1B365D;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 1rem;
                cursor: pointer;
                transition: background 0.3s;
            }
            .btn:hover {
                background: #2C4A6B;
            }
            .btn:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
            .status {
                margin-top: 1rem;
                padding: 0.75rem;
                border-radius: 5px;
                text-align: center;
                font-weight: 500;
            }
            .success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            .info {
                background: #e7f6f8;
                color: #0c5460;
                border: 1px solid #bee5eb;
                margin-top: 1.5rem;
                font-size: 0.9rem;
            }
            .features {
                margin-top: 2rem;
                padding-top: 1.5rem;
                border-top: 1px solid #eee;
            }
            .feature {
                display: flex;
                align-items: center;
                margin-bottom: 0.75rem;
                font-size: 0.9rem;
                color: #666;
            }
            .check {
                color: #28a745;
                margin-right: 0.5rem;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <div class="logo-circle">SM</div>
                <div class="title">EPA Ethics Admin Portal</div>
                <div class="subtitle">Developed by St. Michael Enterprises LLC</div>
                <div class="contract">EPA Contract 68HERD25Q0050</div>
            </div>
            
            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <div class="form-group" id="mfaGroup" style="display: none;">
                    <label for="mfaCode">MFA Code</label>
                    <input type="text" id="mfaCode" name="mfaCode" placeholder="Enter 6-digit code">
                </div>
                
                <button type="submit" class="btn" id="loginBtn">Sign In</button>
            </form>
            
            <div id="status"></div>
            
            <div class="info">
                <strong>Test Credentials:</strong><br>
                Username: admin<br>
                Password: TestPassword123!<br>
                MFA Code: 123456
            </div>
            
            <div class="features">
                <div class="feature">
                    <span class="check">✓</span>
                    FedRAMP Low Authorized
                </div>
                <div class="feature">
                    <span class="check">✓</span>
                    Section 508 Compliant
                </div>
                <div class="feature">
                    <span class="check">✓</span>
                    Multi-Factor Authentication
                </div>
                <div class="feature">
                    <span class="check">✓</span>
                    Secure Content Management
                </div>
            </div>
        </div>

        <script>
            let mfaRequired = false;
            
            document.getElementById('loginForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const mfaCode = document.getElementById('mfaCode').value;
                const statusDiv = document.getElementById('status');
                const btn = document.getElementById('loginBtn');
                
                btn.disabled = true;
                btn.textContent = 'Signing In...';
                
                try {
                    const response = await fetch('http://localhost:3001/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, password, mfaCode })
                    });
                    
                    const data = await response.json();
                    
                    if (data.mfaRequired && !mfaRequired) {
                        mfaRequired = true;
                        document.getElementById('mfaGroup').style.display = 'block';
                        statusDiv.innerHTML = '<div class="status success">Please enter your MFA code</div>';
                        btn.textContent = 'Verify MFA Code';
                    } else if (data.success) {
                        statusDiv.innerHTML = '<div class="status success">Login successful! Welcome to EPA Ethics Admin Portal</div>';
                        setTimeout(() => {
                            showDashboard();
                        }, 2000);
                    } else {
                        statusDiv.innerHTML = '<div class="status error">' + (data.message || 'Login failed') + '</div>';
                        btn.textContent = 'Sign In';
                        mfaRequired = false;
                        document.getElementById('mfaGroup').style.display = 'none';
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<div class="status error">Connection error. Make sure backend is running on port 3001.</div>';
                    btn.textContent = 'Sign In';
                }
                
                btn.disabled = false;
            });
            
            function showDashboard() {
                document.body.innerHTML = \`
                    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        <header style="background: #1B365D; color: white; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h1 style="margin: 0; font-size: 1.8rem;">EPA Ethics Admin Dashboard</h1>
                            <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Developed by St. Michael Enterprises LLC - Contract 68HERD25Q0050</p>
                        </header>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                <h3 style="color: #1B365D; margin-bottom: 1rem;">📚 Content Management</h3>
                                <p>Manage ethics modules, quizzes, and training materials</p>
                                <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1B365D; color: white; border: none; border-radius: 5px; cursor: pointer;">Manage Content</button>
                            </div>
                            
                            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                <h3 style="color: #1B365D; margin-bottom: 1rem;">👥 User Management</h3>
                                <p>Manage admin accounts and permissions</p>
                                <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #A51C30; color: white; border: none; border-radius: 5px; cursor: pointer;">Manage Users</button>
                            </div>
                            
                            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                <h3 style="color: #1B365D; margin-bottom: 1rem;">📊 Analytics</h3>
                                <p>View usage statistics and compliance reports</p>
                                <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">View Reports</button>
                            </div>
                        </div>
                        
                        <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h3 style="color: #1B365D; margin-bottom: 1rem;">🚀 Quick Actions</h3>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                <button onclick="testAPI()" style="padding: 0.75rem 1.5rem; background: #17a2b8; color: white; border: none; border-radius: 5px; cursor: pointer;">Test Backend API</button>
                                <button onclick="window.open('http://localhost:19006', '_blank')" style="padding: 0.75rem 1.5rem; background: #fd7e14; color: white; border: none; border-radius: 5px; cursor: pointer;">View Mobile App</button>
                                <button onclick="window.location.reload()" style="padding: 0.75rem 1.5rem; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
                            </div>
                        </div>
                        
                        <div id="apiResults" style="margin-top: 2rem;"></div>
                    </div>
                \`;
            }
            
            window.testAPI = async function() {
                const resultsDiv = document.getElementById('apiResults');
                resultsDiv.innerHTML = '<div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><h3>Testing Backend API...</h3></div>';
                
                try {
                    const response = await fetch('http://localhost:3001/api/health');
                    const data = await response.json();
                    
                    resultsDiv.innerHTML = \`
                        <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h3 style="color: #28a745; margin-bottom: 1rem;">✅ Backend API Test Results</h3>
                            <pre style="background: #f8f9fa; padding: 1rem; border-radius: 5px; overflow-x: auto; font-size: 0.9rem;">\${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    \`;
                } catch (error) {
                    resultsDiv.innerHTML = \`
                        <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h3 style="color: #dc3545; margin-bottom: 1rem;">❌ API Test Failed</h3>
                            <p>Error: \${error.message}</p>
                            <p>Make sure the backend is running on port 3001</p>
                        </div>
                    \`;
                }
            }
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('========================================');
  console.log('EPA Ethics Admin Portal');
  console.log('Developed by St. Michael Enterprises LLC');
  console.log('EPA Contract 68HERD25Q0050');
  console.log('========================================');
  console.log(`Admin Portal running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log('Test Credentials:');
  console.log('  Username: admin');
  console.log('  Password: TestPassword123!');
  console.log('  MFA Code: 123456');
  console.log('========================================');
});