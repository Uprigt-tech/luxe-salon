const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/salonDB';
console.log('Testing connection to:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ Connection successful!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection failed:', err.message);
        process.exit(1);
    });
