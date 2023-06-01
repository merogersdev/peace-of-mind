// Require ENV

require('dotenv').config();
const port = process.env.PORT || 5000;

// Route Imports

const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');

// Express

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Passport

const passport = require('passport');
app.use(passport.initialize());
require('./middleware/passport');

app.use(express.json());

// CORS
const whitelist = [`${process.env.CLIENT_URL}`, 'http://localhost:5173'];

app.use(
  cors({
    origin: whitelist,
  })
);

app.use(helmet());

app.use('/users', userRoutes);
app.use(
  '/entries',
  passport.authenticate('jwt', { session: false }),
  entryRoutes
);

// --- Serve Static Frontend Files - Node.js Deployment Only --- //
if (process.env.NODE_DEPLOY === 'true') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  );
} else {
  app.get('/', (_req, res) => {
    res.send('Peace of Mind API');
  });
}

// Listen
app.listen(port, () => {
  console.log(`> Server running at http://localhost:${port} `);
});
