import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import bcrypt from 'bcrypt';
import UserManager from '../dao/user.manager.js';
import config from '../config.js';

const userManager = new UserManager();
const localStrategy = local.Strategy;

const initAuthStrategies = () => {
    // Local Login Strategy
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'username' },
        async (req, username, password, done) => {
            try {
                if (username && password) {
                    const user = await userManager.getOne({ email: username });
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid credentials' });
                    }
                } else {
                    return done(null, false, { message: 'Missing fields: username and password are required' });
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));

    // GitHub 
    passport.use('ghlogin', new GitHubStrategy(
        {
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.GITHUB_CALLBACK_URL
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json?.email || null;
                if (email) {
                    const foundUser = await userManager.getOne({ email });
                    if (!foundUser) {
                        const user = {
                            firstName: profile._json.name.split(' ')[0],
                            lastName: profile._json.name.split(' ')[1],
                            email,
                            password: 'none'
                        };
                        const process = await userManager.add(user);
                        return done(null, process);
                    } else {
                        return done(null, foundUser);
                    }
                } else {
                    return done(new Error('Missing profile data'), null);
                }
            } catch (err) {
                return done(err.message, false);
            }
        }
    ));

    // JWT - Token - Cookie
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]),
            secretOrKey: config.JWT_SECRET
        },
        async (jwt_payload, done) => {
            try {
                const user = await userManager.getOne({ _id: jwt_payload.id });
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

export default initAuthStrategies;
