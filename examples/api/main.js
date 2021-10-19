import "mini-notifier/dist/style.css";

import { formFetchOrNotify } from "../../dist/apiHelper.js";
formFetchOrNotify("http://mini-file-manager.bouh.local/media-manager/get-files")
  .then((res) => {
    console.log("ca marche")
  })
  .catch(err => {
    console.log("ca marche pas")
  })