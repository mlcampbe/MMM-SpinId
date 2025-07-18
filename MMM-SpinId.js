Module.register("MMM-SpinId", {
  defaults: {
    updateInterval: 43200000,  // Run the command every 12 hours
    mySpinId: "XXXXX",
    winningColor: "red",
    displayStyle: "line", // "line" for 1-liner, "list" for bullet points
  },

  start: function() {
    console.log("Starting module: " + this.name);
    this.getCommandOutput();
    setInterval(() => {
      this.getCommandOutput();
    }, this.config.updateInterval);
  },

  getCommandOutput: function() {
    this.sendSocketNotification('RUN_COMMAND');
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'COMMAND_OUTPUT') {
      if (payload.spinIds.includes(this.config.mySpinId)) {
        id = "<font color=" + this.config.winningColor + ">" + payload.spinIds + "</font>";
      } else {
        id = payload.spinIds;
      }
      this.output = payload.date + "<br>" + id;
      this.updateDom();
    }
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    const wof = document.createElement("div");
    wof.className = "bright";
    if (this.output) {
      wof.innerHTML = this.output;
    } else {
      wof.innerHTML = "Waiting for command output...";
    }
    wrapper.appendChild(wof);
    return wrapper;
  }
});

