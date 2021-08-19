/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */
class EventEmitter {
    on(eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // set events hash
        var events = (this._events = this._events || {});
        // set listeners array
        var listeners = (events[eventName] = events[eventName] || []);
        // only add once
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }
        return this;
    }
    once(eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = (this._onceEvents = this._onceEvents || {});
        // set onceListeners object
        var onceListeners = (onceEvents[eventName] = onceEvents[eventName] || {});
        // set flag
        onceListeners[listener] = true;
        return this;
    }
    off(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }
        return this;
    }
    emitEvent(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }
        return this;
    }
    allOff() {
        delete this._events;
        delete this._onceEvents;
    }
}
export default EventEmitter;
