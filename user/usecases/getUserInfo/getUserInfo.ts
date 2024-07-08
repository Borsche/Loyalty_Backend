import { Request, Response } from 'express';
import UserInfo from './UserInfo';
import axios from 'axios';
import db from '../../../clients/db';
import { Role } from '@prisma/client';

async function getUserInfo(req: Request, res: Response) {
    const token = req.headers.token as string

    const headers = {
        Authorization: "Bearer " + token,
        ContentType: "application/json",
    };

    const response = (await axios.get("https://id.twitch.tv/oauth2/userinfo", {headers}))
    const data = await response.data;
    const userInfo: UserInfo = {
        username: data.preferred_username,
        picture: data.picture,
        points: 0,
        role: Role.USER
    }


    const user = await db.user.findUnique({
        where: {
            username: userInfo.username.toLocaleLowerCase(),
        },
        select: {
            points: true,
            role: true,
        }
    });

    res.send({ ...userInfo, ...user })
}

export default getUserInfo