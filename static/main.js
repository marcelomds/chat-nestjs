const app = new Vue({
  el: '#app',
  data: {
    title: 'Websockets Chat',
    name: '',
    text: '',
    messages: [],
    socket: null,
  },
  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };

        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
});
