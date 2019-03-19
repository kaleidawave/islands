const width = 600;
const height = 480;
const speed = 1;

const config = {
    type: Phaser.WEBGL,
    width: width,
    height: height,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
    zoom: 1.5
};

const tilesize = 16;
let offsetX = 0;
let offsetY = 0;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('Castle', 'assets/Castle.png');
    this.load.image('Grass', 'assets/Grass.png');
    this.load.image('Tree', 'assets/Tree.png');
    this.load.image('Sea', 'assets/Sea.png');
    this.load.image('Boat', 'assets/Boat.png');
    this.load.image('Dark', 'assets/Dark.png');
    this.load.image('Sand', 'assets/Sand.png');
    noise.seed(Math.random());
    cursors = this.input.keyboard.createCursorKeys();
}

function create() {
    draw(this);
}

function update() {
    if (cursors.left.isDown) { offsetX -= speed; draw(this); }
    else if (cursors.right.isDown) { offsetX += speed; draw(this); }
    else if (cursors.up.isDown) { offsetY += speed; draw(this); }
    else if (cursors.down.isDown) { offsetY -= speed; draw(this); }
}

function draw(scene) {
    scene.add.displayList.removeAll();
    for (let y = 0; y < (height / tilesize); y++) {
        for (let x = 0; x < (width / tilesize); x++) {
            let posX = (x * tilesize) + 8;
            let posY = (y * tilesize) + 8;

            let value = noise.simplex2((x + offsetX) / 20, (y + offsetY) / 20);
            if (between(value, -1, -0.6)) {
                scene.add.image(posX, posY, 'Grass');
            }
            else if (between(value, -0.6, -0.5)) {
                scene.add.image(posX, posY, 'Sand');
            }
            else {
                scene.add.image(posX, posY, 'Sea');
            }

            if (between(value, 0.2, 0.201)) {
                scene.add.image(posX, posY, 'Boat');
            }
            else if (between(value, 0.6, 1)) {
                for (let index = 0; index < Math.round(value * 3); index++) {
                    scene.add.image(posX, posY, 'Dark');       
                }
            }

            if (between(value, -0.9, -0.8)) {
                scene.add.image(posX, posY, 'Tree');
            }
            else if (between(value, -1, -0.9)) {
                scene.add.image(posX, posY, 'Castle');
            }
        }
    }
}

function between (value1, value2, value3) {
    return (value2 < value1 && value1 < value3)
}