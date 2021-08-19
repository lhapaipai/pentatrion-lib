export function debounceMethod(_class, methodName, threshold) {
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
// appel la fonction une première fois puis malgré le fait que la fonction
// puisse être appelée plein de fois le nouvel appel ne pourra avoir lieu
// qu'après la durée du seuil.
// https://remysharp.com/2010/07/21/throttling-function-calls
export function throttleMethod(_class, methodName, threshold) {
    threshold = threshold || 200;
    let fn = _class.prototype[methodName];
    let last, timeout;
    _class.prototype[methodName] = function () {
        // console.log('appel throtle method ', methodName);
        var now = +new Date();
        var args = arguments;
        var trigger = function () {
            // console.log('appel method proxy',methodName);
            last = now;
            fn.apply(this, args);
        }.bind(this);
        if (last && now < last + threshold) {
            // hold on to it
            clearTimeout(timeout);
            timeout = setTimeout(trigger, threshold);
        }
        else {
            trigger();
        }
    };
}
