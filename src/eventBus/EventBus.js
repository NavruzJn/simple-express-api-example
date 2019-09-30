const debug = require("debug");
const EventEmitter = require("events");

const log = debug("app:shared:EventBus");

class EventBus {
  constructor(name) {
    // Use name for debug purpose.
    this.name = name;
    this.emmiter = new EventEmitter();
  }

  on(event, listener) {
    log("Add event listener to %s", this.name);
    this.emmiter.on(event, listener);

    return () => {
      log("Remove event listener to %s", this.name);
      this.emmiter.removeListener(listener);
    };
  }

  emit(event, payload) {
    log("Emit %s event in %s event listener", event, this.name);
    this.emmiter.emit(event, payload);
  }
}

// Default app event bus.
const appEventBus = new EventBus("app");

module.exports = { EventBus, appEventBus };
