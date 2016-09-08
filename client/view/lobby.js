class LobbyView {
  render(type, data) {
    switch (type) {
      case 'room':
        this.renderGamesList(data);
        break;
      default:
    }
  }

  renderGamesList(games, currentGame, curentUser, cb) {
    const gamesList = document.getElementById('games-list');

    // Clear the list
    const gamesListCount = gamesList.children.length;

    for (let i = gamesListCount; i > 0; i--) {
      const child = gamesList.children[i - 1];

      child.parentNode.removeChild(child);
    }

    games.forEach(game => {
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
        joinGameAnchor.id = `${game.name}`;

        // TODO: clear event listener
        joinGameAnchor.addEventListener('click', cb);

        newGame.appendChild(joinGameAnchor);
      } else {
        newGame.appendChild(document.createTextNode(game.name));
      }

      const users = document.createElement('ul');
      users.classList.add('list-group');

      game.users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('list-group-item');

        if (user.username === curentUser) {
          // userItem.classList.add('list-group-item-info');
        }

        userItem.appendChild(document.createTextNode(user.username));
        users.appendChild(userItem);
      });

      newGame.appendChild(users);
      gamesList.appendChild(newGame);
    });
  }

  addChatMessage(data) {
    const chat = document.querySelector('.chat-body');
    const p = document.createElement('p');
    let message = `<small>${data.time}</small> <strong>${data.user}:</strong> ${data.message}`;

    if (data.server) {
      message = `<span class="server-message">${message}</span>`;
    }

    p.innerHTML = message;
    chat.insertBefore(p, chat.children[0]);
    chat.parentElement.scrollTop = chat.scrollHeight;
  }

  updateLatency(latency) {
    document.getElementById('latency').innerHTML = latency;
  }
}

export default new LobbyView();
