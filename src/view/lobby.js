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
      const roomCell = newRow.insertCell(1);

      userNameCell.appendChild(document.createTextNode(user.username));

      if (user.username === currentUser) {
        newRow.classList.add('success');
      }

      roomCell.appendChild(document.createTextNode(user.room.name));
    });
  }

  updateRoomsList(rooms) {
    const roomsListTable = document.getElementById('rooms-list');

    // Clear the table, keep the header
    const roomsListRowCount = roomsListTable.rows.length;

    for (let i = roomsListRowCount; i > 1; i--) {
      roomsListTable.deleteRow(i - 1);
    }

    rooms.forEach((room, index) => {
      const newRow = roomsListTable.insertRow(index + 1);
      const roomNameCell = newRow.insertCell(0);
      const numberOfPlayersCell = newRow.insertCell(1);

      roomNameCell.appendChild(document.createTextNode(room.name));
      numberOfPlayersCell.appendChild(
        document.createTextNode(room.numberOfPlayers));
    });
  }
}

export default new LobbyView();
