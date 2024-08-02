var express = require('express');
var cors = require('cors');
require('dotenv').config()
// mutler for uploading files
var multer = require('multer');
// path for file paths
const path = require('path');

var app = express();
// where files are uploaded
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// endpoint for uploading files
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if(!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const { originalname: name, size, mimetype: type } = req.file;
  res.json({ name, size, type });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
