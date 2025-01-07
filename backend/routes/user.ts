import express, { Request, Response }  from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import User from "../models/User";
const app = express();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/auth/google', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  console.log("")
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            res.status(400).json({ error: 'Invalid Google token' });
            return;
        }

        const { sub, name, email, picture } = payload;

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            user = new User({
                googleId: sub,
                name,
                email,
                picture,
            });
            await user.save();
        }
        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: jwtToken, user });
    } catch (error) {
        console.error('Google authentication error:', error);
        res.status(401).json({ error: 'Invalid Token' });
    }
});

module.exports = app;