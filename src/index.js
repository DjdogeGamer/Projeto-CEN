import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        //this.load.image('logo', logoImg);

        // load background
        //this.load.image('background', 'assets/background.png'));
    }

    create() {
        // Game title
        this.add.text(400, 100, 'Seu jogo', {fontFamily: 'Arial', fontSize: 64, color: '#ffffff'}).setOrigin(0.5);

        // Menu buttons
        this.add.text(400, 300, 'Escolha um jogo:', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff'
        }).setOrigin(0.5);
        this.add.rectangle(400, 400, 200, 50, 0xffffff).setInteractive().on('pointerdown', function () {
            //iniciarJogo(1);
            console.log("Iniciando jogo 1");
        });
        this.add.text(400, 400, 'Jogo 1', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
        this.add.rectangle(400, 475, 200, 50, 0xffffff).setInteractive().on('pointerdown', function () {
            //iniciarJogo(2);
            console.log("Iniciando jogo 2");
        });
        this.add.text(400, 475, 'Jogo 2', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
        this.add.rectangle(400, 550, 200, 50, 0xffffff).setInteractive().on('pointerdown', function () {
            //iniciarJogo(3);
            console.log("Iniciando jogo 3");
        });
        this.add.text(400, 550, 'Jogo 3', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Menu background
        //this.add.image(400, 300, 'background');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);