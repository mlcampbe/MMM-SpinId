Module.register("MMM-SpinId", {
  defaults: {
    updateInterval: 43200000,  // Run the command every 12 hours
    mySpinId: "XXXXX",
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
      var [id1, id2, id3] = this.output.split(',');
      if (id1.includes(this.config.mySpinId)) {
        id1 = "<font color=" + this.config.winningColor + ">" + id1 + "</font>";
      } else if (id2.includes(this.config.mySpinId)) {
        id2 = "<font color=" + this.config.winningColor + ">" + id2 + "</font>";
      } else if (id3.includes(this.config.mySpinId)) {
        id3 = "<font color=" + this.config.winningColor + ">" + id3 + "</font>";
      };
      this.output = payload.date + "<ul style='margin-top:0px;'><li>" + id1 + "</li><li>" + id2 + "</li><li>" + id3 + "</li></ul>";
      this.date = "Wheel of Fortune Spin-IDs";
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

