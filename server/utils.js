module.exports = {
  debug(output) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const dateText = `${year}-${month}-${day}`;

    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const timeText = `${hours}:${minutes}:${seconds}`;

    console.log(`${dateText} ${timeText} - ${output}`);
  },
};
