const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 30;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.height = 30;
    this.gravity = 1;
  }

  draw() {
    const { x, y } = this.position;
    c.fillStyle = "red";
    c.fillRect(x, y, this.width, this.height);
  }
  update() {
    let friction = 0.99;
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    const { x, y } = this.position;
    if (y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
//
class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };
    this.width = 500;
    this.height = 50;
  }
  draw() {
    const { x, y } = this.position;
    c.fillStyle = "green";
    c.fillRect(x, y, this.width, this.height);
  }
}

let player = new Player();
let platforms = [new Platform()];
function init() {
  requestAnimationFrame(init);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => platform.draw());
  //platform collision
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
    if (player.position.x >= platform.position.x + platform.width) {
      player.position.y += player.velocity.y;
    }
    if (
      customkeys.right.pressed &&
      player.position.x + player.width < innerWidth / 2 - 300
    ) {
      player.velocity.x = 7;
    } else if (customkeys.left.pressed && player.position.x > 100) {
      player.velocity.x = -7;
    } else {
      player.velocity.x = 0;
      //illusion of moving platforms
      if (customkeys.right.pressed) {
        platform.position.x -= 7;
      } else if (customkeys.left.pressed) {
        platform.position.x += 7;
      }
    }
  });
}
const customkeys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      player.velocity.y -= 60;
      break;
    case 65:
      console.log("left");
      customkeys.left.pressed = true;
      break;
    case 68:
      console.log("right");
      customkeys.right.pressed = true;
      break;

    default:
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      player.velocity.y = 0;

      break;
    case 65:
      console.log("left");
      customkeys.left.pressed = false;
      break;
    case 68:
      console.log("right");
      customkeys.right.pressed = false;
      break;

    default:
      break;
  }
});
init();
