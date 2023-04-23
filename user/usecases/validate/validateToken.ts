import { Request, Response } from 'express';
import axios from 'axios';

async function validateToken(req: Request, res: Response) {
    const token = req.headers.token as string

    const headers = {
        Authorization: "Bearer " + token,
        ContentType: "application/json",
    };

    try {
        await axios.get("https://id.twitch.tv/oauth2/validate", {headers})
        res.send()
    } catch {
        res.sendStatus(400)
    }
}

export default validateToken