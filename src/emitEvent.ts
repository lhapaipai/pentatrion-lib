export default function emitEvent(type: string, detail = {}, elem = document) {
  if (!type) return;

  let event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail,
  });

  return elem.dispatchEvent(event);
}
