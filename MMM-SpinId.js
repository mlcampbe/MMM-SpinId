Module.register("MMM-SpinId", {
  defaults: {
    updateInterval: 43200000,  // Run the command every 12 hours
    mySpinId: "XXXXXX",
    winningColor: "red",
  },

  start: function() {
    console.log("Starting module: " + this.name);
    this.getCommandOutput();
    setInterval(() => {
      this.getCommandOutput();
    }, this.config.updateInterval);
  },

  getHeader: function() {
    return this.date;
  },

  getCommandOutput: function() {
    this.sendSocketNotification('RUN_COMMAND');
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'COMMAND_OUTPUT') {
      this.output = payload.spinIds;
      const [id1, id2, id3] = this.output.split(',');
      if (id1.includes(this.config.mySpinId)) {
        idStr = "<font color=" + this.config.winningColor + ">" + id1 + "</font><br>" + id2 + "<br>" + id3;
      } else if (id2.includes(this.config.mySpinId)) {
        idStr = id1 + "<br><font color=" + this.config.winningColor + ">" + id2 + "</font><br>" + id3;
      } else if (id3.includes(this.config.mySpinId)) {
        idStr = id1 + "<br>" + id2 + "<br><font color=" + this.config.winningColor + ">" + id3 + "</font>";
      } else {
        idStr = id1 + "<br>" + id2 + "<br>" + id3;
      };
      this.output = idStr;
      this.date = "Wheel of Fortune SpinIDs for " + payload.date;
      this.updateDom();
    }
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    if (this.output) {
      wrapper.innerHTML = this.output;
    } else {
      wrapper.innerHTML = "Waiting for command output...";
    }
    return wrapper;
  }
});

