const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 100;
    this.height = 100;
  }
  draw() {}
  update() {}
}
