var __defProp=Object.defineProperty,__hasOwnProp=Object.prototype.hasOwnProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,o)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,__assign=(e,t)=>{for(var o in t||(t={}))__hasOwnProp.call(t,o)&&__defNormalProp(e,o,t[o]);if(__getOwnPropSymbols)for(var o of __getOwnPropSymbols(t))__propIsEnum.call(t,o)&&__defNormalProp(e,o,t[o]);return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("mini-notifier")):"function"==typeof define&&define.amd?define(["exports","mini-notifier"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).pentatrionLib={},e.miniNotifier)}(this,(function(e,t){"use strict";function o(e,t){let o=document.createElement("a");o.href=URL.createObjectURL(e),o.download=t,document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(o)}var r=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",downloadFromBlob:o,downloadFromUrl:async function(e,t){return fetch(e).then((e=>e.blob())).then((e=>(o(e,t),URL.createObjectURL(e))))},stringToSlug:function(e){e=(e=e.replace(/^\s+|\s+$/g,"")).toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",o=0,r=t.length;o<r;o++)e=e.replace(new RegExp(t.charAt(o),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(o));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}});function n(e){return e<10?"0"+e:e}var i=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",toIsoString:function(e,t=!1){let o=e.getUTCFullYear()+"-"+n(e.getUTCMonth()+1)+"-"+n(e.getUTCDate());return t?o+"T"+n(e.getUTCHours())+"-"+n(e.getUTCMinutes()):o}});function a(e,t={},o=!1){if(!t.body)throw new s("No content to fetch",500);var r;t.body instanceof FormData&&(t.body=(r=t.body,Object.fromEntries(r))),"object"==typeof t.body&&(t.body=JSON.stringify(t.body));let n=new Headers({"Content-Type":"application/json",Accept:"application/json"});return o&&n.append("X-Requested-With","XMLHttpRequest"),c(e,t=__assign({headers:n,method:"POST"},t))}function l(e,t={},o=!1){if(!t.body)throw new s("No content to fetch",500);"object"==typeof t.body&&(t.body=function(e){const t=new FormData;for(let o in e)t.append(o,e[o]);return t}(t.body));let r=new Headers({Accept:"application/json"});return o&&r.append("X-Requested-With","XMLHttpRequest"),c(e,t=__assign({headers:r,method:"POST"},t))}async function c(e,t={}){let o,r;try{if(o=await fetch(e,t),204===o.status)return null}catch(n){throw new s("Erreur serveur.",401)}if(o.headers.has("Content-Type")&&"application/json"!==o.headers.get("Content-Type")){if(!o.ok)throw new s("Erreur serveur.",500);return o}try{r=await o.json()}catch(n){throw new s("Le contenu renvoyé est illisible.",500)}if(!o.ok){let e=r.err||r.title||r.detail||"Erreur serveur";throw new s(e,o.status)}return r}class s{constructor(e,t=500){this.title=e,this.status=t}}var u=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",jsonFetchOrNotify:async function(e,o={},r=!1){try{return await a(e,o,r)}catch(n){throw n instanceof s?t.notify(n.title,{style:"error",time:5e5}):t.notify(n,{style:"error",time:5e5}),n}},formFetchOrNotify:async function(e,o={},r=!1){try{return await l(e,o,r)}catch(n){throw n instanceof s?t.notify(n.title,{style:"error",time:5e5}):t.notify(n,{style:"error",time:5e5}),n}},jsonFetch:a,formFetch:l,ApiError:s});e.apiHelper=u,e.dateHelper=i,e.downloadHelper=r,Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
