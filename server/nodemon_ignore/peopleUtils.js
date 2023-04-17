const { readJSON, patchJSON } = require("../json.js");

function getNextPeopleId() {
  const peopleNumber = readJSON(
    "nodemon_ignore",
    "replit_12_people_number.json"
  );
  const peopleNextNumber = peopleNumber.id + 1;
  const newPeopleId = {
    id: peopleNextNumber,
  };
  return newPeopleId;
}
function updateLastPeopleId(lastPeopleId) {
  patchJSON(lastPeopleId, "nodemon_ignore", "replit_12_people_number.json");
}

module.exports = { getNextPeopleId, updateLastPeopleId };
