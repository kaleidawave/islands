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
    this.load.image('Grass', 'assets/Grass.png');
    this.load.image('Tree1', 'assets/Tree1.png');
    this.load.image('Tree2', 'assets/Tree2.png');
    this.load.image('Tree3', 'assets/Tree3.png');
    this.load.image('Sea', 'assets/Sea.png');
    this.load.image('Boat1', 'assets/Boat1.png');
    this.load.image('Boat2', 'assets/Boat2.png');
    this.load.image('Sand', 'assets/Sand.png');
    noise.seed(Math.random());
    cursors = this.input.keyboard.createCursorKeys();
}

function create() {
    draw(this);
}

function update() {
    if (cursors.left.isDown) { offsetX -= speed; }
    else if (cursors.right.isDown) { offsetX += speed; }
    else if (cursors.up.isDown) { offsetY -= speed; }
    else if (cursors.down.isDown) { offsetY += speed; }
    draw(this);
}

function draw(scene) {
    scene.add.displayList.removeAll();
    for (let y = 0; y < (height / tilesize); y++) {
        for (let x = 0; x < (width / tilesize); x++) {
            let posX = (x * tilesize) + 8;
            let posY = (y * tilesize) + 8;

            let value = noise.simplex2((x + offsetX) / 30, (y + offsetY) / 30);
            if (between(value, -1, -0.5)) {
                scene.add.image(posX, posY, 'Grass').setAlpha(Math.abs(value + 1.5));
            }
            else if (between(value, -0.5, -0.4)) {
                scene.add.image(posX, posY, 'Sand');
            }
            else {
                scene.add.image(posX, posY, 'Sea').setAlpha(Math.abs(1 - (value/2)));
            }

            if (between(value, 0.2, 0.201)) {
                scene.add.image(posX, posY, 'Boat1');
            }
            else if (between(value, 0.201, 0.2015)) {
                scene.add.image(posX, posY, 'Boat2');
            }
            else if (between(value, -1, -0.65)) {
                value2 = value.toString().slice(-1);
                if (value2 > 6) {
                    scene.add.image(posX, posY, 'Tree1');
                }
                else if (value2 > 3) {
                    scene.add.image(posX, posY, 'Tree2');
                }
                else {
                    scene.add.image(posX, posY, 'Tree3');
                }
                
            }
        }
    }
}

function between(value1, value2, value3) {
    return (value2 < value1 && value1 < value3)
}