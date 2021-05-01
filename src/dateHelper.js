function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export function toIsoString(datetime, complete = false) {
  let dateStr =
    datetime.getUTCFullYear() +
    "-" +
    pad(datetime.getUTCMonth() + 1) +
    "-" +
    pad(datetime.getUTCDate());
  if (!complete) {
    return dateStr;
  }
  return (
    dateStr +
    "T" +
    pad(datetime.getUTCHours()) +
    "-" +
    pad(datetime.getUTCMinutes())
  );
}

export function ago(ptime, ctime) {
  if (!ptime) return "";

  if (!ctime) {
    ctime = new Date();
  }

  let ntime = new Date(ptime),
    seconds = Math.floor((ctime - ntime) / 1000),
    intervals = [
      Math.floor(seconds / 31536000),
      Math.floor(seconds / 2592000),
      Math.floor(seconds / 604800),
      Math.floor(seconds / 86400),
      Math.floor(seconds / 3600),
      Math.floor(seconds / 60),
    ],
    times = ["an", "mois", "semaine", "jour", "heure", "minute"],
    key,
    res;
  for (key in intervals) {
    if (intervals[key] > 1) {
      res =
        intervals[key] +
        " " +
        (times[key] === "mois" ? "mois" : times[key] + "s ");
      return "il y a " + res;
    } else if (intervals[key] === 1) {
      res = intervals[key] + " " + times[key] + " ";
      return "il y a " + res;
    }
  }
  return "il y a quelques secondes";
}
