import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { SignIn } from "../service/auth.service";
import { Strategy as JWTStraegy, ExtractJwt as ExtractJWT } from "passport-jwt";

const local = passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await SignIn({ email, password });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (e: any) {
      console.log("error", e.message);
      return done(e);
    }
  })
);
