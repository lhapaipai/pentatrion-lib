# Pentatrion-Lib

Fonctions que j'utilise pour mes projets. Pourquoi ne pas les rendre publiques ?

## Animator

on applique Animator sur un élément masqué avec display: none. afin de lui appliquer une transition à la vue

```html
<nav id="nav" class="hide" data-transition-name="navbar">...</nav>
```

```css
.hide {
  display: none !important;
}

.navbar-enter-active,
.navbar-leave-active {
  transition: all 0.5s ease;
}

.navbar-enter,
.navbar-leave-to {
  opacity: 0;
}
```

```
       .navbar-enter-active ---------  | .navbar-leave-active ---------
       .navbar-enter .navbar-enter-to  | .navbar-leave .navbar-leave-to
.hide-----                             |                          .hide----
```

```js
import Animator from "pentatrion-lib/Animator";

let animator = new Animator({
  inactiveClass: "hide",
  // can be surcharged with "data-transition-name"
  transitionName: "transition",
});

animator.animEnter(elt);
animator.animLeave(elt);
```

## apiHelper

```js
import {
  jsonFetch,
  formFetch,
  ApiError,

  // dépendent de mini-notifier
  jsonFetchOrNotify,
  formFetchOrNotify,
  fetchOrNotify,
} from "pentatrion-lib/apiHelper";
```

```js
formFetch(
  url,
  {
    body: jsonObj | formData,
    // others
  },
  (xRequestedWidth = false)
);
```

on envoie par POST (surcharger si on souhaite une autre méthode) des données FormData (application/x-www-form-urlencoded, multipart/form-data)
meilleure compatibilité pour les cors. par contre c'est compliqué si on souhaite envoyer un objet avec une profondeur plus grande que 1.

jsonFetch

```js
jsonFetch(
  url,
  {
    body: jsonObj | formData,
    // others
  },
  (xRequestedWidth = false)
);
```

Envoie une requête fetch avec un body de type JSON.
On peut spécifier un contenu de type FormData / Objet, celui-ci sera sérialisé avant d'être envoyé. pratique si on a un objet avec de la profondeur. niveau CORS nécessite une requête OPTIONS car le Content-Type est `application/json`.

Retourne une promesse avec l'objet déjà parsé en JSON s'il est de type application/json sinon renvoie l'objet response.

Si la requête échoue (status non compris entre 200 et 299) soulève une Exception de type `ApiError` qui contient 2 propriétés : `status` et `message`. message est complété en essayant de voir si la réponse au format JSON possède ces champs :

```js
let title = data.err || data.title || data.detail || "Erreur serveur";
```

## dateHelper

```js
import { toIsoString, ago } from "pentatrion-lib/dateHelper";

let dateTime = new Date();
toIsoString(dateTime);
// 2021-04-12
toIsoString(dateTime, true);
// 2021-04-12T11-40

ago(from, to);
// "il y a 3 jours"
```

## downloadHelper

```js
import {
  downloadFromBlob,
  downloadFromUrl,
  stringToSlug,
} from "pentatrion-lib/downloadHelper";

stringToSlug("Salut les élèves !");
// salut-les-eleves-

downloadFromUrl("/sav.svg", "sac.svg");
// ok
// attention aux problèmes de cors si la requête est effectuée vers un autre domaine
```

## emitEvent

```js
import emitEvent from "pentatrion-lib/emitEvent";

emitEvent(
  "mon-custom-event",
  {
    foo: "bar",
  },
  document.querySelector("#el")
);
```

## EventEmitter

```js
import EventEmitter from "pentatrion-lib/EventEmitter";

class MaClasse extends EventEmitter {
  constructor() {
    this.on("finish", this.cb);
    // ou
    this.once("finish", this.cb);
  }

  cb(arg1, arg2) {
    console.log(arg1, arg2);
    // "a", "b"
  }

  autre() {
    this.emitEvent("finish", ["a", "b"]);
  }

  destroy() {
    this.off("finish", this.cb);
    // ou
    this.allOff();
  }
}
```

## functionHelper

```js
import { debounceMethod, throttleMethod } from "pentatrion-lib/functionHelper";
```

## supportHelper

```js
import { supportsCssVars } from "pentatrion-lib/supportHelper";
if (supportsCssVars()) {
  // TODO
}
```
