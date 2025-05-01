const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Stream video route
app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'videos', 'Tokidoki Bosotto/[Kayoanime] Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san - S01E01.mkv'); // replace with your actual filename if different
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    res.status(400).send("Requires Range header");
    return;
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  const chunkSize = end - start + 1;
  const file = fs.createReadStream(videoPath, { start, end });

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  });

  file.pipe(res);
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
