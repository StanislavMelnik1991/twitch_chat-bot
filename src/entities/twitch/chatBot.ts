import { Client, Events, Options } from 'tmi.js';

const TWITCH_CHANNEL = process.env.TWITCH_CHANNEL as string;
const TWITCH_USER = process.env.TWITCH_USER as string;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN as string;

const opts: Options = {
  identity: {
    username: TWITCH_USER,
    password: `oauth:${TWITCH_TOKEN}`
  },
  channels: [
    TWITCH_CHANNEL
  ]
};

export class TwitchChatBot {
  client: Client
  constructor() {
    console.log(opts)
    this.client = new Client(opts);
    this.client.on('message', this.onMessageHandler);
    this.client.on('connected', this.onConnectedHandler);
    this.client.on('join', this.onJoinHandler);
  }

  private onMessageHandler: Events['message'] = (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
      const num = this.rollDice();
      this.client.say(target, `You rolled a ${num}`);
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
  }


  private onConnectedHandler: Events['connected'] = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  }
  private onJoinHandler: Events['join'] = (channel, username, self) => {
    console.log('channel', channel)
    console.log('username', username)
    console.log('self', self)
  }

  private rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }
}

export const chatBot = new TwitchChatBot()
