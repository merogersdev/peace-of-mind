// ENV
const privateKey = process.env.JWT_SECRET;

// Passport
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: privateKey,
};

// Knex
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig);

// Passport Middleware
passport.use(
  new Strategy(options, async (jwtPayload, done) => {
    try {
      // Search for user in DB with user ID in payload
      const user = await db("users").where("id", "=", jwtPayload.id).first();
      // If no user found, return false
      if (user === undefined) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
