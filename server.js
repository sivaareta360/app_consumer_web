import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

const app = express();
app.use(cors()); // Enable CORS for all origins

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// API Key (must match what's in your FastAPI .env file)
const API_KEY = '970bb1c524a215b76c66b7ed029c260f78c99a9712ceb294903729f84cbcf34c';

// Upload endpoint that forwards to your FastAPI server
app.post('/vton', upload.fields([
  { name: 'person_image', maxCount: 1 },
  { name: 'garment_image', maxCount: 1 }
]), async (req, res) => {
  try {
    const personImage = req.files['person_image'][0];
    const garmentImage = req.files['garment_image'][0];

    const formData = new FormData();
    formData.append('person_image', fs.createReadStream(personImage.path));
    formData.append('garment_image', fs.createReadStream(garmentImage.path));

    // Make the POST request to FastAPI server
    const response = await axios.post(
      'https://aretaapiserver.onrender.com/process',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': API_KEY // Include the required API key here
        },
        responseType: 'stream' // Expecting a streamed image
      }
    );

    // Forward the image stream to the frontend
    res.setHeader('Content-Type', 'image/png');
    response.data.pipe(res);

    // Clean up uploaded files after streaming
    response.data.on('end', () => {
      fs.unlinkSync(personImage.path);
      fs.unlinkSync(garmentImage.path);
    });

  } catch (err) {
    console.error('Error forwarding images:', err.message);
    // Check if response headers have already been sent
    if (!res.headersSent) {
        res.status(500).send('Something went wrong while processing images.');
    }
  }
});

// Start the backend server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
}); 