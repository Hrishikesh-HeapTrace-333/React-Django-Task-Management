const { auth } = require('express-openid-connect');
import dotenv from 'dotenv';
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${process.env.SECRET_KEY}`,
  baseURL: `${process.env.BASE_URL}`,
  clientID: `${process.env.CLIENT_ID}`,
  issuerBaseURL: `${process.env.ISSUER_BASE_URL}`
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
