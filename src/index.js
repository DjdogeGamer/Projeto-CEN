import Phaser from 'phaser';
import bgImg from './assets/menu_bg.jpg';

// TODO: Fix local dependencies
//const S3Util = require('./S3Util');
const bucketName = 'sqlite-js-ispg-test';
const accessKeyId = 'AKIA4ZDOYH5F6H3ASIGQ';
const secretAccessKey = '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';

class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {
        //this.load.image('logo', logoImg);

        // load background
        this.load.image('background', bgImg);
    }

    create() {
        // Menu background
        this.add.image(400, 300, 'background');

        // Game title
        this.add.rectangle(400, 200, 720, 100, 0x000000)
        this.add.text(400, 200, 'Jogos de Cibersegurança', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.rectangle(400, 350, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 350, 'Começar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

    }

    loadChooseGameScene() {
        this.scene.start('ChooseGameScene');
    }
}

class ChooseGameScene extends Phaser.Scene {
    constructor() {
        super({key: 'ChooseGameScene'});
    }

    preload() {

    }

    create() {
        // Menu background
        this.add.image(400, 300, 'background');

        // Menu Title
        this.add.rectangle(400, 200, 550, 100, 0x000000)
        this.add.text(400, 200, 'Escolha um Jogo', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ffffff'
        }).setOrigin(0.5);


        // Game 1
        this.add.rectangle(200, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadGame1, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(200, 350, 'Jogo 1', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Game 3
        this.add.rectangle(600, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadGame3, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(600, 350, 'Jogo 3', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Game 2
        this.add.rectangle(400, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadGame2, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 350, 'Jogo 2', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Back button
        this.add.rectangle(400, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadMenuScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }

    loadMenuScene() {
        this.scene.start('Menu');
    }

    loadGame1() {
        this.scene.start('Game1');
    }

    loadGame2() {
        this.scene.start('Game2');
    }

    loadGame3() {
        this.scene.start('Game3');
    }
}

class Game1 extends Phaser.Scene {
    constructor() {
        super({key: 'Game1'});
    }

    preload() {

    }

    create() {
        // Menu background
        this.add.image(400, 300, 'background');

        // Menu Title
        this.add.rectangle(400, 200, 550, 100, 0x000000)
        this.add.text(400, 200, 'Jogo 1 Exemplo', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.rectangle(400, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }

    loadChooseGameScene() {
        this.scene.start('Menu');
    }
}

class Game2 extends Phaser.Scene {
    constructor() {
        super({key: 'Game2'});
    }

    preload() {

    }

    create() {
        // Menu background
        this.add.image(400, 300, 'background');

        // Menu Title
        this.add.rectangle(400, 200, 550, 100, 0x000000)
        this.add.text(400, 200, 'Jogo 2 Exemplo', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.rectangle(400, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }

    loadChooseGameScene() {
        this.scene.start('ChooseGameScene');
    }
}

class Game3 extends Phaser.Scene {
    constructor() {
        super({key: 'Game3'});
    }

    preload() {

    }

    create() {
        // Menu background
        this.add.image(400, 300, 'background');

        // Menu Title
        this.add.rectangle(400, 200, 550, 100, 0x000000)
        this.add.text(400, 200, 'Jogo 3 Exemplo', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.rectangle(400, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }

    loadChooseGameScene() {
        this.scene.start('ChooseGameScene');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Menu, ChooseGameScene, Game1, Game2, Game3],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);