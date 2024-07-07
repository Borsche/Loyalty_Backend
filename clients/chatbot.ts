import tmi from 'tmi.js';
import db from './db';

const joinedUsernames: Set<string> = new Set();

function create(): tmi.Client {
    const client = new tmi.Client({
        channels: [ process.env.CHANNEL as string ],
    })
    
    client.connect();
    
    client.on('join', async (channel, username, self) => {
        if(self || username.startsWith('justinfan')) // disable for bot and anonymous users
            return;

        // set user active
        // console.log(channel, username, self);
        if(!joinedUsernames.has(username)) {
            joinedUsernames.add(username);
        }
    })
    
    client.on('part', (channel, username, self) => {
        if(self || username.startsWith('justinfan'))
            return;

        // set user inactive
        if(!joinedUsernames.has(username)) {
            joinedUsernames.delete(username);
        }
    })

    return client;
} 

export default {
    create,
    joinedUsernames
} 