require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return response.text();
}



app.post('/api', async (req, res) => {
  prompt = req.body.prompt;
  try {
    const response = await run(prompt);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while generating the story.');
  }
});

app.listen(3333, () => console.log('Server is running on port 3333'));