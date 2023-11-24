// ENV
const privateKey = process.env.JWT_SECRET;

// Passport
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const pool = require("../config/db");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: privateKey,
};

// Knex
// const db = require("../knex");

// Passport Middleware
passport.use(
  new Strategy(options, async (jwtPayload, done) => {
    try {
      const user = await pool.query("SELECT * FROM users WHERE id = $1", [
        jwtPayload.id,
      ]);
      // If no user found, return false
      if (user.rows[0] === undefined) {
        return done(null, false);
      }
      return done(null, user.rows[0]);
    } catch (error) {
      return done(error, false);
    }
  })
);
