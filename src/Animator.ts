export default class Animator {
  public static defaultOptions = {
    inactiveClass: "hide",
    transitionName: "transition",
  };
  private animation: {
    [k: string]: {
      action: string;
      cb: () => void;
    };
  } = {};
  private options: typeof Animator.defaultOptions;

  constructor(options = {}) {
    this.options = Object.assign({}, Animator.defaultOptions, options);
  }

  beforeAnimation(item: HTMLElement) {
    if (!item.dataset.animatorId) {
      item.dataset.animatorId = Math.floor(Math.random() * 999999).toString();
    }
    let id = item.dataset.animatorId;
    if (this.animation[id]) {
      // console.log('execution avancée de',this.animation[id].action ,this.animation[id].timer, id);
      this.animation[id].cb();
      delete this.animation[id];

      return false;
    }
    return true;
  }

  animEnter(item: HTMLElement) {
    this.beforeAnimation(item);
    let transitionName: string;
    let id = item.dataset.animatorId;
    if (!id) {
      return;
    }

    if (item.dataset.transitionName) {
      transitionName = item.dataset.transitionName;
    } else {
      transitionName = this.options.transitionName;
    }
    // console.log('debut animEnter', id);

    item.classList.add(`${transitionName}-enter`);
    item.classList.add(`${transitionName}-enter-active`);
    item.classList.remove(this.options.inactiveClass);

    let end = () => {
      item.classList.remove(`${transitionName}-enter-to`);
      item.classList.remove(`${transitionName}-enter-active`);
      item.removeEventListener("transitionend", end);
      delete this.animation[id!];

      console.log("remove listener transitionend", item);
      console.log("fin animEnter", id);
    };

    setTimeout(() => {
      item.addEventListener("transitionend", end);
      item.classList.remove(`${transitionName}-enter`);
      item.classList.add(`${transitionName}-enter-to`);
      console.log("add listener transitionend", item.className);
      this.animation[id!] = {
        action: "enter",
        cb: end,
      };
    }, 10);
  }

  animLeave(item: HTMLElement) {
    this.beforeAnimation(item);
    let transitionName: string;
    let id = item.dataset.animatorId;
    if (!id) {
      return;
    }

    if (item.dataset.transitionName) {
      transitionName = item.dataset.transitionName;
    } else {
      transitionName = this.options.transitionName;
    }
    // console.log('debut animLeave', id);

    item.classList.add(`${transitionName}-leave`);
    item.classList.add(`${transitionName}-leave-active`);

    let end = () => {
      item.classList.add(this.options.inactiveClass);
      item.classList.remove(`${transitionName}-leave-to`);
      item.classList.remove(`${transitionName}-leave-active`);
      item.removeEventListener("transitionend", end);
      delete this.animation[id!];
      // console.log("fin animLeave", id);
    };

    setTimeout(() => {
      item.addEventListener("transitionend", end);
      item.classList.remove(`${transitionName}-leave`);
      item.classList.add(`${transitionName}-leave-to`);

      this.animation[id!] = {
        action: "leave",
        cb: end,
      };
    }, 10);
  }
}
