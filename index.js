const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Player {
  constructor() {
    this.speed = 10;
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
    // c.fillStyle = "red";
    c.fillRect(x, y, this.width, this.height);
  }
  update() {
    let friction = 0.99;
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    const { x, y } = this.position;
    if(x + this.width + this.velocity.x <= canvas.width) {
      // console.log(x )
// alert('hi')
      // this.velocity.x = 0;
    }
    if (y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.gravity;
    }
  }
}
const generateImg = (img) => {
  let image = new Image();
  image.src = img;
  return image;
};
// let platformImg = new Image()
// platformImg.src = "./img/platform.png";
// hills.src = "./img/hills.png";
//
class Platform {
  constructor({ x, y, Image }) {
    this.position = {
      x,
      y,
    };
    this.Image = Image;
    this.width = this.Image.width;
    this.height = this.Image.height;
  }
  draw() {
    c.drawImage(this.Image, this.position.x, this.position.y);
  }
}
class GenericScene {
  constructor({ x, y, Image }) {
    this.position = {
      x,
      y,
    };
    this.Image = Image;
    this.width = this.Image.width;
    this.height = this.Image.height;
  }
  draw() {
    c.drawImage(this.Image, this.position.x, this.position.y);
  }
}
let platformimg = generateImg("./img/platform.png");
let player = new Player();
let platforms = [
  new Platform({ x: -1, y: 610, Image: platformimg }),
  new Platform({
    x: platformimg.width * 2 + 100,
    y: 610,
    Image: platformimg,
  }),
  new Platform({
    x: platformimg.width * 2 + 200,
    y: 610,
    Image: platformimg,
  }),
];
let genericScene = [
  new GenericScene({
    x: 0,
    y: 0,
    Image: generateImg("./img/background.png"),
  }),
  new GenericScene({
    x: -1,
    y: 143,
    Image: generateImg("./img/hills.png"),
  }),
];
const restart = () => {
  platformimg = generateImg("./img/platform.png");
  player = new Player();
  platforms = [
    new Platform({ x: -1, y: 610, Image: platformimg }),
    new Platform({
      x: platformimg.width * 2 + 100,
      y: 610,
      Image: platformimg,
    }),
    new Platform({
      x: platformimg.width * 2 + 200,
      y: 610,
      Image: platformimg,
    }),
  ];
  genericScene = [
    new GenericScene({
      x: 0,
      y: 0,
      Image: generateImg("./img/background.png"),
    }),
    new GenericScene({
      x: -1,
      y: 143,
      Image: generateImg("./img/hills.png"),
    }),
  ];
};
let scrolloffset = 0
function init() {
  requestAnimationFrame(init);
  // c.fillStyle = "blue";
  c.fillRect(0, 0, canvas.width, canvas.height);
  genericScene.forEach((scene) => scene.draw());
  player.update();
  platforms.forEach((platform) => platform.draw());
  //illusion of moving platforms
  if (customkeys.right.pressed) {
    scrolloffset +=1
    // platforms.forEach((platform) => (platform.position.x -= player.speed));
    // genericScene.forEach((scene) => (scene.position.x -= player.speed * 0.66));
  } else if (customkeys.left.pressed) {
    scrolloffset -=1
    // platforms.forEach((platform) => (platform.position.x += player.speed));
    // genericScene.forEach((scene) => (scene.position.x += player.speed * 0.66));
  }
  platforms.forEach((platform) => {
    //platform collision
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  if (
    customkeys.right.pressed &&
    player.position.x + player.width < innerWidth / 2 - 100
  ) {
    player.velocity.x = player.speed;
  } else if (
    (customkeys.left.pressed &&
    player.position.x > 100 ) /* || customkeys.left.pressed && player.position.x > 0 */
  ) {
    player.velocity.x = -player.speed;
  } 
  
  else {
    player.velocity.x = 0;
  }
  if (player.position.y > canvas.height) {
    restart();
  }
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
      player.velocity.y -= 30;
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
