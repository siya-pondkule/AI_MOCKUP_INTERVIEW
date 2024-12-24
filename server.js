import express from 'express';
import fetch from 'node-fetch'; // Ensure you're using a version that supports the import syntax
import cors from 'cors'; // Add CORS support if needed

const app = express();
const PORT = 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON

app.post('/api/generate', async (req, res) => {
  const { inputPrompt } = req.body;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/211859139101:generateContent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer AIzaSyA7o8cPAMYecsV_xCt9wkIzUw2yn7HtjkU`, // Replace with your API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: inputPrompt }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      const errorText = await response.text();
      console.error('Error Response:', errorText);
      res.status(response.status).send(errorText);
      return;
    }

    const data = await response.json(); // Parse the response as JSON
    res.json(data); // Send the response back to the client
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch from API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
