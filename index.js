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
    // Determine if the media is a video or image
    let resourceType = mediaUrl.endsWith('.mp4') ? 'video' : 'image';
    console.log("Resource Type:", resourceType);  // Log the resource type for debugging

    const uploadResponse = await cloudinary.uploader.upload(mediaUrl, {
      resource_type: resourceType  // Explicitly specify 'video' for video files
    });

    res.json({
      status: '✅ Upload successful!',
      secure_url: uploadResponse.secure_url  // Send the secure_url for the uploaded file
    });
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);  // Log the error for debugging
    res.json({
      status: '❌ Upload failed',
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
