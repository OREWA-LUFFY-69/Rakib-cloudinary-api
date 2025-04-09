const express = require('express');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

// Cloudinary config
cloudinary.config({
  cloud_name: 'dq9pwrrhy',
  api_key: '644483598291864',
  api_secret: '4hLPqzwCkzlMZWhSAS2bNuYmiEk'
});

app.get('/', (req, res) => {
  res.send('Cloudinary uploader API by Rakib Adil');
});

app.get('/upload', async (req, res) => {
  const mediaUrl = req.query.url;
  if (!mediaUrl) return res.json({ error: 'Missing ?url=' });

  try {
    const resourceType = mediaUrl.endsWith('.mp4') ? 'video' : 'image';
    const uploadResponse = await cloudinary.uploader.upload(mediaUrl, {
      resource_type: resourceType
    });

    res.json({
      status: '✅ Upload successful!',
      url: uploadResponse.secure_url
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: '❌ Upload failed',
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
