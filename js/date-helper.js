const moment = require("moment");

function convertDate(date) {
  return moment(date, "YYYY-MM-DD[T]HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
}

function convertDateMMDD(date) {
  return moment(date, "YYYY-MM-DD[T]HH:mm:ss").format("DD/MM HH:mm");
}

module.exports = { convertDate, convertDateMMDD };
