import Phaser from 'phaser';
import bgImg from './assets/menu_bg.jpg';

class Menu extends Phaser.Scene {
    constructor() {
        super( {key: 'Menu'});
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
            .on('pointerdown', function() {}, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(200, 350, 'Jogo 1', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Game 3
        this.add.rectangle(600, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', function() {}, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(600, 350, 'Jogo 3', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Game 2
        this.add.rectangle(400, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', function() {}, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 350, 'Jogo 2', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Menu, ChooseGameScene]
};

const game = new Phaser.Game(config);