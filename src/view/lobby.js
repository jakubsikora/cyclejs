const DEFAULT_ROOM = 'Lobby';

class LobbyView {
  updatePlayersList(users, currentUser) {
    const playersListTable = document.getElementById('players-list');

    // Clear the table, keep the header
    const playersListRowCount = playersListTable.rows.length;

    for (let i = playersListRowCount; i > 1; i--) {
      playersListTable.deleteRow(i - 1);
    }

    users.forEach((user, index) => {
      const newRow = playersListTable.insertRow(index + 1);
      const userNameCell = newRow.insertCell(0);
      const idCell = newRow.insertCell(1);

      userNameCell.appendChild(document.createTextNode(user.username));

      if (user.username === currentUser) {
        newRow.classList.add('info');
      }

      idCell.appendChild(document.createTextNode(user.id));
    });
  }

  updateRoomsList(rooms, currentRoom, cb) {
    const roomsListTable = document.getElementById('rooms-table');

    // Clear the table, keep the header
    const roomsListRowCount = roomsListTable.rows.length;

    for (let i = roomsListRowCount; i > 1; i--) {
      roomsListTable.deleteRow(i - 1);
    }

    rooms.forEach((room, index) => {
      const newRow = roomsListTable.insertRow(index + 1);
      const roomNameCell = newRow.insertCell(0);
      const numberOfPlayersCell = newRow.insertCell(1);
      const roomNameTextNode = document.createTextNode(room.name);

      if (room.name !== currentRoom && room.name !== DEFAULT_ROOM) {
        const joinRoomAnchor = document.createElement('a');

        joinRoomAnchor.appendChild(roomNameTextNode);
        joinRoomAnchor.classList.add('join-room');
        joinRoomAnchor.id = `${room.name}`;

        // TODO: clear event listener
        joinRoomAnchor.addEventListener('click', cb);

        roomNameCell.appendChild(joinRoomAnchor);
      } else {
        roomNameCell.appendChild(roomNameTextNode);
      }

      numberOfPlayersCell.appendChild(
        document.createTextNode(room.users.length));

      if (room.name === currentRoom) {
        newRow.classList.add('info');
      }
    });
  }

  renderRoomList(rooms, currentRoom, curentUser, cb) {
    const roomsList = document.getElementById('rooms-list');

    // Clear the list
    const roomsListCount = roomsList.children.length;

    for (let i = roomsListCount; i > 0; i--) {
      const child = roomsList.children[i - 1];

      child.parentNode.removeChild(child);
    }

    rooms.forEach((room, index) => {
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
    chat.appendChild(p);
  }

  updateLatency(latency) {
    document.getElementById('latency').innerHTML = latency;
  }
}

export default new LobbyView();
