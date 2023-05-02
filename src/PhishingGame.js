 import Phaser from 'phaser';
 class PhishingGame extends Phaser.Scene {
     constructor() {
         super({ key: 'PhishingGame' });
     }
     create() {
         // Background color
         this.cameras.main.setBackgroundColor('#cccccc');
         // Email inbox title
         this.add.text(400, 50, 'Email inbox', {fontFamily: 'Arial', fontSize: 32, color: '#000000'}).setOrigin(0.5);
         // Email list background
         this.add.rectangle(100, 150, 600, 350, 0xffffff);
         // Email list items
         this.add.text(120, 170, '1. You havee won a prize!', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
         this.add.text(120, 210, '2. Urgent message from your bank', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
         this.add.text(120, 250, '3. Important security update', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
         this.add.text(120, 290, '4. Your account has been compromised', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
         // Close button
         this.add.rectangle(700, 50, 50, 50, 0xff0000).setInteractive().on('pointerdown', function () {
             this.scene.start('MyGame');
         }, this);
         this.add.text(700, 50, 'X', {fontFamily: 'Arial', fontSize: 24, color: '#ffffff'}).setOrigin(0.5);
     }
 }
 const config = {
     type: Phaser.AUTO,
     parent: 'phaser-example',
     width: 800,
     height: 600,
     scene: [MyGame, PhishingGame]
 };
 // const game = new Phaser.Game(config);
 export default PhishingGame;