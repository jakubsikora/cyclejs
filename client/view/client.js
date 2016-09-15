import {
  SERVER,
  GAME_LIST_VIEW,
  CHAT_MESSAGE_VIEW,
  CHAT_MESSAGES_VIEW,
} from '../../constants';

class ClientView {
  render(type, action, store, callback) {
    switch (type) {
      case GAME_LIST_VIEW:
        this.renderGamesList(store, callback);
        break;
      case CHAT_MESSAGE_VIEW:
        this.addChatMessage(action.payload.message);
        break;
      case CHAT_MESSAGES_VIEW:
        this.addChatMessages(store);
        break;
      default:
    }
  }

  renderGamesList(store, callback) {
    const state = store.getState();
    const games = state.games;
    const users = state.users;
    const currentGame = games.localGame;
    const currentUser = users.localUser;

    const gamesList = document.getElementById('games-list');

    // Clear the list
    const gamesListCount = gamesList.children.length;

    for (let i = gamesListCount; i > 0; i--) {
      const child = gamesList.children[i - 1];

      child.parentNode.removeChild(child);
    }

    games.list.forEach(game => {
      const newGame = document.createElement('li');
      newGame.classList.add('list-group-item');

      const numberOfUsers = document.createElement('span');
      numberOfUsers.classList.add('badge');
      numberOfUsers.appendChild(document.createTextNode(game.users.length));

      newGame.appendChild(numberOfUsers);

      if (game.name !== currentGame) {
        const joinGameAnchor = document.createElement('a');

        joinGameAnchor.appendChild(document.createTextNode(game.name));
        joinGameAnchor.classList.add('join-game');
        joinGameAnchor.classList.add('btn');
        joinGameAnchor.classList.add('btn-xs');
        joinGameAnchor.classList.add('btn-info');
        joinGameAnchor.id = `${game.name}`;

        // TODO: clear event listener
        joinGameAnchor.addEventListener('click', callback);

        newGame.appendChild(joinGameAnchor);
      } else {
        newGame.appendChild(document.createTextNode(game.name));
      }

      const usersEl = document.createElement('ul');
      usersEl.classList.add('list-group');

      game.users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('list-group-item');

        if (user.username === currentUser.username) {
          // userItem.classList.add('list-group-item-info');
        }

        userItem.appendChild(document.createTextNode(user.username));
        usersEl.appendChild(userItem);
      });

      newGame.appendChild(usersEl);
      gamesList.appendChild(newGame);
    });
  }

  addChatMessage(data) {
    const chat = document.querySelector('.chat-body');
    const p = document.createElement('p');
    let message = `<small>${data.time}</small> <strong>${data.sender}:</strong> ${data.text}`;

    if (data.sender === SERVER) {
      message = `<span class="server-message">${message}</span>`;
    }

    p.innerHTML = message;
    chat.insertBefore(p, chat.children[0]);
    chat.parentElement.scrollTop = chat.scrollHeight;
  }

  addChatMessages(store) {
    const state = store.getState();
    const messages = state.chat.messages;

    messages.forEach(this.addChatMessage);
  }

  updateLatency(latency) {
    document.getElementById('latency').innerHTML = latency;
  }
}

export default new ClientView();
