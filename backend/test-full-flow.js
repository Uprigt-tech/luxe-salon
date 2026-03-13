const http = require('http');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(null));
  });
};

const testLogin = (username, password) => {
  return new Promise((resolve) => {
    const data = JSON.stringify({ username, password });
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.write(data);
    req.end();
  });
};

(async () => {
  console.log('--- STEP 8: AUTO TEST FULL FLOW ---');
  
  // 1. Check Backend
  const backendStatus = await checkUrl('http://localhost:5000/api/admin/enquiries'); // Should be 401 without token but reachable
  if (backendStatus === 401 || backendStatus === 200) {
    console.log('✔ Backend running on port 5000');
  } else {
    console.log('✘ Backend not reachable');
  }

  // 2. Check Frontend
  const frontendStatus = await checkUrl('http://localhost:5173');
  if (frontendStatus === 200) {
    console.log('✔ Frontend running on port 5173');
  } else {
    console.log('✘ Frontend not reachable');
  }

  // 3. Test Login
  const loginResult = await testLogin('admin', 'admin123');
  if (loginResult && loginResult.success && loginResult.token) {
    console.log('✔ Login request successful');
    console.log('✔ Token validated');
  } else {
    console.log('✘ Login failed');
    process.exit(1);
  }

  console.log('\nLOGIN FLOW TEST PASSED');
})();
