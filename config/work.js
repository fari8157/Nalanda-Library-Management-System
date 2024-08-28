/*please note 
These crone jobs are used to keep the server alive.Not a part of the project.*/

let cron = require("node-cron");
let https = require("https");

function pingServer() {
  console.log("Pinging server to keep it alive...");

  const options = {
    hostname: "nalanda-library-management-system.onrender.com",
    method: "GET",
    timeout: 60000,
  };

  const req = https.request(options, (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  });

  req.on("timeout", () => {
    req.destroy();
    console.error("Request timed out");
  });

  req.on("error", (err) => {
    console.error("Ping error:", err.message);
  });

  req.end();
}

const job = cron.schedule("*/14 * * * *", pingServer);

module.exports = job;