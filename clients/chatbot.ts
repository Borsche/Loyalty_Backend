import tmi from 'tmi.js';

function create(): tmi.Client {
    const client = new tmi.Client({
        channels: [ process.env.CHANNEL as string ],
    })
    
    client.connect();
    
    client.on('join', (channel, username, self) => {
        if(self || username.startsWith('justinfan')) // disable for bot and anonymous users
            return;

        // set user active
        console.log(channel, username, self);
    })
    
    client.on('part', (channel, username, self) => {
        if(self || username.startsWith('justinfan'))
            return;

        // set user inactive
        console.log(channel, username, self);
    })

    return client;
} 

export default {
    create
} 