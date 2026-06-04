const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`)
})