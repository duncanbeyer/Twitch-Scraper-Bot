

const WebSocket = require('ws');
const oAuth = "Twitch OAuth Key Goes Here";
const user = "variety_caitlyn_passive";
const channel = "loltyler1";
const p1 = '@reply-parent-msg-';
const p2 = ` PRIVMSG #${channel} :Tyler1Stare`;
const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');



socket.addEventListener('open', (event) => {
  socket.send(`PASS oauth:${oAuth}`);
  socket.send(`NICK ${user}`);
  socket.send(`JOIN #${channel}`);
  socket.send('CAP REQ :twitch.tv/commands');
  socket.send('CAP REQ :twitch.tv/tags');
});


socket.addEventListener('message', (event) => {
  if (event.data.includes(";display-name=TYLER1__PLAY______VARIETY")) {
    const datas = event.data.split(';');
    for (let i = 0;i < datas.length;i++) {
      if (datas[i].charAt(0) == 'i' && datas[i].charAt(1) == 'd' && datas[i].charAt(2) == '=') {
        socket.send(p1 + datas[i] + p2);
        console.log(datas);
        // console.log(p1 + datas[i] + p2);
        break;
      }
    }
  }
});
