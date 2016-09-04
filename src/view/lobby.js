class LobbyView {
  renderRoomList(rooms, currentRoom, curentUser, cb) {
    const roomsList = document.getElementById('rooms-list');

    // Clear the list
    const roomsListCount = roomsList.children.length;

    for (let i = roomsListCount; i > 0; i--) {
      const child = roomsList.children[i - 1];

      child.parentNode.removeChild(child);
    }

    rooms.forEach(room => {
      const newRoom = document.createElement('li');
      newRoom.classList.add('list-group-item');

      const numberOfUsers = document.createElement('span');
      numberOfUsers.classList.add('badge');
      numberOfUsers.appendChild(document.createTextNode(room.users.length));

      newRoom.appendChild(numberOfUsers);

      if (room.name !== currentRoom) {
        const joinRoomAnchor = document.createElement('a');

        joinRoomAnchor.appendChild(document.createTextNode(room.name));
        joinRoomAnchor.classList.add('join-room');
        joinRoomAnchor.id = `${room.name}`;

        // TODO: clear event listener
        joinRoomAnchor.addEventListener('click', cb);

        newRoom.appendChild(joinRoomAnchor);
      } else {
        newRoom.appendChild(document.createTextNode(room.name));
      }

      const users = document.createElement('ul');
      users.classList.add('list-group');

      room.users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('list-group-item');

        if (user.username === curentUser) {
          userItem.classList.add('list-group-item-info');
        }

        userItem.appendChild(document.createTextNode(user.username));

        users.appendChild(userItem);
      });

      newRoom.appendChild(users);

      roomsList.appendChild(newRoom);
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
