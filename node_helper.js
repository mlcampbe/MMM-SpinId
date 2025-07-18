const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting helper: " + this.name);
  },

  socketNotificationReceived: function(notification) {
    if (notification === "RUN_COMMAND") {
      this.runCommand();
    }
  },

  runCommand: function() {
    command = "curl -s  http://www.wheeloffortunesolutions.com/spinid.html|grep -i 'meta name=\"date\"' |  cut -d= -f3 | tr -d '\">/'";
    command = command + "&&" + "curl -s  http://www.wheeloffortunesolutions.com/spinid.html|sed '/-- Secret Santa/,$d' | grep -i TableSpinID |  sed 's/<[^>]*>//g' |  awk '{$1=$1};1'";

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        this.sendSocketNotification("COMMAND_OUTPUT", `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        this.sendSocketNotification("COMMAND_OUTPUT", `Error: ${stderr}`);
        return;
      };
      [date, spinids] = stdout.split('\r\n');
      this.sendSocketNotification("COMMAND_OUTPUT", {
        date: date,
        spinIds: spinids
      });
    });
  },
});

