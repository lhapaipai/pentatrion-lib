export type Newable<T> = {
  new (...args: any[]): T;
};
// https://css-tricks.com/debouncing-throttling-explained-examples/
// un appel lance un minuteur si au delà du délai il n'y a pas eu de nouvel
// appel alors lance la fonction, si un nouvel appel à lieu il remet à 
// 0 le minuteur (on écrit un mot dans le moteur de recherche)

export function debounceMethod(
  _class: Newable<{
    prototype: { [k: string]: any };
  }>,
  methodName: string,
  threshold: number
) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[methodName];
  var timeoutName = methodName + "Timeout";

  _class.prototype[methodName] = function () {
    // console.log('appel method proxy'+methodName);
    var timeout = this[timeoutName];
    clearTimeout(timeout);

    var args = arguments;
    var _this = this;
    this[timeoutName] = setTimeout(function () {
      method.apply(_this, args);
      delete _this[timeoutName];
    }, threshold);
  };
}

// appele la fonction une première fois puis malgré le fait que la fonction
// puisse être appelée plein de fois le nouvel appel ne pourra avoir lieu
// qu'après la durée du seuil.

// https://remysharp.com/2010/07/21/throttling-function-calls
export function throttleMethod(
  _class: Newable<{
    prototype: { [k: string]: any };
  }>,
  methodName: string,
  threshold: number
) {
  threshold = threshold || 200;
  let fn = _class.prototype[methodName];
  let last: number, deferTimer: number;

  _class.prototype[methodName] = function () {
    // console.log('appel throtle method ', methodName);

    var now = new Date().getTime();
    var args = arguments;
    var trigger = function (this: typeof _class) {
      // console.log('appel method proxy',methodName);
      last = now;
      fn.apply(this, args);
    }.bind(this);
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(trigger, threshold);
    } else {
      last = now;
      trigger();
    }
  };
}
