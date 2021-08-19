/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

type Listener = (...args: any[]) => void;
type EventsListeners = {
  [k: string]: Listener[];
};
type OnceListeners = {};

class EventEmitter {
  private events: EventsListeners = {};
  private onceEvents: EventsListeners = {};

  on(eventName: string, listener: Listener) {
    // set events hash
    var events = (this.events = this.events || {});
    // set listeners array
    var listeners = (events[eventName] = events[eventName] || []);
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  }

  once(eventName: string, listener: Listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = (this.onceEvents = this.onceEvents || {});
    // set onceListeners object
    var onceListeners = (onceEvents[eventName] = onceEvents[eventName] || []);
    // set flag
    if (onceListeners.indexOf(listener) == -1) {
      onceListeners.push(listener);
    }

    return this;
  }

  off(eventName: string, listener: Listener) {
    var listeners = this.events && this.events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emitEvent(eventName: string, args: any[]) {
    var listeners = this.events && this.events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this.onceEvents && this.onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var onceIndex = onceListeners.indexOf(listener);
      if (onceIndex !== -1) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        onceListeners.splice(onceIndex, 1);
      }
      // trigger listener
      listener.apply(this, args);
    }

    return this;
  }

  allOff() {
    this.events = {};
    this.onceEvents = {};
  }
}

export default EventEmitter;
