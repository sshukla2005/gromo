const express = require('express');
const app = express();
app.use(express.json());

// config from env
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_verify_token';
const PORT = process.env.PORT || 3000;

// GET route for webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
  res.sendStatus(400);
});

// POST route for receiving messages
app.post('/webhook', (req, res) => {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  // Acknowledge quickly
  res.sendStatus(200);

  // TODO: parse req.body and handle messages/events as needed
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

