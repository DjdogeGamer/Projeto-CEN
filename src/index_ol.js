import Phaser from 'phaser';
import bgImg from './assets/menu_bg.jpg';
import game2_1 from './assets/game2_1.png';

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

        // Game 2
        this.add.rectangle(400, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadGame2, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 350, 'Jogo 2', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        // Game 3
        this.add.rectangle(600, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadGame3, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(600, 350, 'Jogo 3', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);


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
        // Background color
        this.cameras.main.setBackgroundColor('#cccccc');
        // Email inbox title
        this.add.text(800, 600, 'Email inbox', {fontFamily: 'Arial', fontSize: 32, color: '#000000'}).setOrigin(0.5);
        // Email list background
        this.add.rectangle(100, 150, 600, 350, 0xffffff);
        // Email list items
        this.add.text(180, 170, '1. You have won a prize!', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
        this.add.text(180, 210, '2. Urgent message from your bank', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
        this.add.text(180, 250, '3. Important security update', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
        this.add.text(180, 290, '4. Your account has been compromised', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
        // Close button
        this.add.rectangle(700, 50, 50, 50, 0xff0000)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);
        
        this.add.text(700, 50, 'X', {fontFamily: 'Arial', fontSize: 24, color: '#ffffff'}).setOrigin(0.5);
    

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
        // load background
        this.load.image('game2_1', game2_1);
    }

    create() {
        
    // Nível 1 background
    this.add.image(400, 300, 'game2_1');

    // Email inbox title
    this.add.text(420, 50, 'Email inbox', {fontFamily: 'Arial', fontSize: 32, color: '#000000'}).setOrigin(0.5);

    // Email list background
    this.add.rectangle(400, 300, 450, 250, 0xffffff);

    // Email list items
    const email1 = this.add.text(180, 220, '1. You have won a prize!', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});

    // Add button to email item
    const email1Button = this.add.graphics()
  .fillStyle(0x00ff00)
  .fillRoundedRect(555, 210, 60, 35, 15)
  .setInteractive()
  .on('pointerdown', function () {
    const message = 'Congratulations! You have won a prize.';
    this.dialogPlugin.prompt(message, ['OK']);
  }, this);

this.add.text(585, 227, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);

// Add the dialog plugin to the scene
this.dialogPlugin = this.plugins.get('rexDialog');


    const email2 = this.add.text(180, 260, '2. Urgent message from your bank', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});

    // Add button to email item
    const email2Button = this.add.graphics()
    .fillStyle(0x00ff00)
    .fillRoundedRect(555, 250, 60, 35, 15)
    .setInteractive()
    .on('pointerdown', function () {
        const message = 'Your bank took your money, have a nice day!';
        this.add.text(400, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }, this);
    this.add.text(585, 267, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);


    const email3 = this.add.text(180, 300, '3. Important security update', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});

    // Add button to email item
    const email3Button = this.add.graphics()
    .fillStyle(0x00ff00)
    .fillRoundedRect(555, 290, 60, 35, 15)
    .setInteractive()
    .on('pointerdown', function () {
        const message = 'Your bank took your money, have a nice day!';
        this.add.text(400, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }, this);
    this.add.text(585, 306, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);


    const email4 = this.add.text(180, 340, '4. Your account has been compromised', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});

    // Add button to email item
    const email4Button = this.add.graphics()
    .fillStyle(0x00ff00)
    .fillRoundedRect(555, 330, 60, 35, 15)
    .setInteractive()
    .on('pointerdown', function () {
        const message = 'Your bank took your money, have a nice day!';
        this.add.text(400, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }, this);
    this.add.text(585, 346, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);



    // BOTAO DE VOLTAR -> vai para choose game
    this.add.rectangle(400, 500, 200, 50, 0xffffff)
    .setInteractive()
    .on('pointerdown', this.loadChooseGameScene, this)
    .setStrokeStyle(4, 0x000000);
    this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    // BOTAO DE X -> vai para choose game
    this.add.rectangle(700, 50, 50, 50, 0xff0000)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);
        
    this.add.text(700, 50, 'X', {fontFamily: 'Arial', fontSize: 24, color: '#ffffff'}).setOrigin(0.5);
    }
    
    loadChooseGameScene() {
        this.scene.start('ChooseGameScene');
    }

    showPopup(title, message) {
        // Create the popup background
        const popupBackground = this.add.rectangle(400, 300, 500, 200, 0xffffff);
        popupBackground.setStrokeStyle(4, 0x000000);
    
        // Add the popup title and message
        this.add.text(400, 250, title, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
        this.add.text(400, 300, message, {fontFamily: 'Arial', fontSize: 20, color: '#000000'}).setOrigin(0.5);
    
        // Add the close button
        const closeButton = this.add.rectangle(400, 350, 100, 50, 0xff0000)
            .setInteractive()
            .on('pointerdown', function () {
                // Remove the popup from the scene
                popupBackground.destroy();
                popupTitle.destroy();
                popupMessage.destroy();
                closeButton.destroy();
            }, this);
        this.add.text(400, 350, 'Close', {fontFamily: 'Arial', fontSize: 20, color: '#ffffff'}).setOrigin(0.5);
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