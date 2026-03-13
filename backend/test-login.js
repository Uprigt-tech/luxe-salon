const http = require('http');

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
        resolve({ status: res.statusCode, body: JSON.parse(body) });
      });
    });
    req.on('error', (e) => resolve({ error: e.message }));
    req.write(data);
    req.end();
  });
};

(async () => {
  console.log('--- STEP 7: AUTO TEST LOGIN ---');
  const result = await testLogin('admin', 'admin123');
  console.log('STATUS:', result.status);
  console.log('BODY:', JSON.stringify(result.body));
  
  if (result.status === 200 && result.body.success === true && result.body.message === "Login successful") {
    console.log('✔ TEST PASSED');
  } else {
    console.log('✘ TEST FAILED');
    process.exit(1);
  }
})();
