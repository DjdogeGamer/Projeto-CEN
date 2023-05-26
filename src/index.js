import Phaser from 'phaser';
//import Phising_1 from './assets/Phising_1.png'; <- alterar imagens
import monitor from '../assets/monitor.png';
import axios from 'axios';

import Board from './Board';

class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});

        
    }

    preload() {
        // load from API endpoint
        this.load.image('background', 'https://cen-api.nw.r.appspot.com/asset?fileName=bg.jpg');
    }

    create() {
        // Menu background
        this.menuBG = this.add.image(475, 300, 'background');

        // Game title
        this.add.rectangle(475, 200, 720, 100, 0x000000)
        this.add.text(475, 200, '> Cybersecurity Arcade Games', {
            fontFamily: 'Arial',
            fontSize: 50,
            color: '#00ff00'
        }).setOrigin(0.5);

        this.add.rectangle(475, 350, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(475, 350, 'Começar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

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
        this.load.image('background', 'https://cen-api.nw.r.appspot.com/asset?fileName=bg.jpg');
    }

    create() {
        // Menu background
        this.add.image(475, 300, 'background');

        // Menu Title
        this.add.rectangle(475, 200, 550, 100, 0x000000)
        this.add.text(475, 200, '> Escolha um Jogo', {
            fontFamily: 'Arial',
            fontSize: 62,
            color: '#00ff00'
        }).setOrigin(0.5);


        // QUIZ GAME
        this.add.rectangle(275, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadQuizGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(275, 350, 'Quiz', {fontFamily: 'Arial', fontSize: 22, color: '#000000'}).setOrigin(0.5);

        // Game 2
        this.add.rectangle(475, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadPhising, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(475, 350, 'Phising', {fontFamily: 'Arial', fontSize: 22, color: '#000000'}).setOrigin(0.5);
        // Game 3
        this.add.rectangle(675, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadMemoryCard, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(675, 350, ' Cartas\nMemória', {fontFamily: 'Arial', fontSize: 19, color: '#000000'}).setOrigin(0.5);


        // Back button
        this.add.rectangle(475, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadMenuScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(475, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
    }

    loadMenuScene() {
        this.scene.start('Menu');
    }

    loadQuizGameScene() {
        this.scene.start('QuizGame');
    }

    loadPhising() {
        this.scene.start('Phising');
    }

    loadMemoryCard() {
        this.scene.add('MemoryCard', Board, true);
    }


}

class QuizGame extends Phaser.Scene {
    constructor() {
        super({key: "QuizGame"});
        // Definição de variáveis
        this.timerText;
        this.timer;
        this.score = 0;
        this.currentQuestion = 0;
        this.questions = [
            {
                question: "Qual é o nome da técnica de ataque que consiste em enviar um grande volume de tráfego para um servidor, com o objetivo de sobrecarregá-lo e torná-lo inacessível?",
                choices: [
                    "DDoS",
                    "Phishing",
                    "Ransomware"
                ],
                correctAnswer: 0,
                explanation: "O ataque DDoS (Distributed Denial of Service) é uma técnica que consiste em sobrecarregar um servidor com tráfego falso, deixando-o inacessível para usuários legítimos."
            },
            {
                question: "O que é um phishing?",
                choices: [
                    "Um ataque que consiste em enviar um e-mail falso, com o objetivo de enganar o destinatário e fazê-lo revelar informações confidenciais",
                    "Um ataque que consiste em enviar um grande volume de tráfego para um servidor, com o objetivo de sobrecarregá-lo e torná-lo inacessível",
                    "Um tipo de vírus que criptografa os arquivos do usuário e exige o pagamento de um resgate para liberá-los"
                ],
                correctAnswer: 0,
                explanation: "Phishing é um tipo de ataque que consiste em enganar o usuário para que ele revele informações confidenciais, como senhas ou números de cartão de crédito. Isso geralmente é feito por meio de e-mails falsos que parecem ser legítimos."
            },
            {
                question: "O que é um firewall?",
                choices: [
                    "Um software ou hardware que monitora e controla o tráfego de rede, permitindo ou bloqueando o acesso com base em um conjunto de regras de segurança",
                    "Um dispositivo que verifica se um usuário é quem ele diz ser, geralmente por meio de um código enviado para o seu celular",
                    "Um tipo de malware que bloquea todas as portas de rede do computador impedindo que o usuário acesse a Internet"
                ],
                correctAnswer: 0,
                explanation: "Um firewall é um software ou hardware que monitora e controla o tráfego de rede, permitindo ou bloqueando o acesso com base em um conjunto de regras de segurança."
            }
        ];

    }

    preload() {
        this.load.image('quiz_bg', 'https://cen-api.nw.r.appspot.com/asset?fileName=quiz_bg.jpg');
    }

    create() {
        // Background
        this.cameras.main.setBackgroundColor('#404080');
        this.add.image(475, 300, 'quiz_bg');
        // Quiz game title
        this.add.text(475, 30, 'Cybersecurity Quiz', { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        this.showNextQuestion();
    }

    showNextQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            // Exibe a pontuação final e reinicia o jogo

            this.add.rectangle(475, 150, 500, 90, 0x000000).setOrigin(0.5);
            // impede que o usuário clique em outra resposta
            questionBox = this.add.text(475, 150, "FIM DE JOGO! Pontuação final: " + this.score, {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                wordWrap: {width: 500, useAdvancedWrap: true}
            }).setOrigin(0.5);

            this.timer.paused = true;

            setTimeout(() => {
                this.score = 0;
                this.currentQuestion = 0;
                this.scene.start('ChooseGameScene');
            }, 3000);
        } else {
            // Exibe a pergunta e as opções
            // Exibe timer
            this.add.rectangle(475, 80, 50, 30, 0x000000).setStrokeStyle(4, 0xffffff);
            this.timerText = this.add.text(475, 80, '10', { fontFamily: 'Arial', fontSize: 24, color: '#ff0000' }).setOrigin(0.5);

            // Inicia o timer
            this.timer = this.time.addEvent({ delay: 16000, callback: this.goToNextQuestion, callbackScope: this });

            this.add.rectangle(475, 150, 550, 100, 0x000000).setStrokeStyle(4, 0xffffff);

            var questionBox = this.add.text(475, 150, this.questions[this.currentQuestion].question, {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                wordWrap: {width: 500, useAdvancedWrap: true}
            }).setOrigin(0.5);

            var Answer0 = this.add.rectangle(475, 275, 510, 65, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => {
                    Answer0.name = "0";
                    if (parseInt(Answer0.name) === this.questions[parseInt(Answer0.name)].correctAnswer) {
                        questionBox.setColor('#00ff00');
                        Answer0.setStrokeStyle(4, 0x00ff00);
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
                        this.timer.paused = true;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        // espera 1 segundo e passa para a próxima pergunta
                        setTimeout(() => {
                            this.showNextQuestion();
                        }, 2000);
                    } else {
                        console.log("Resposta errada!");
                        // Se a resposta estiver errada, mostra a explicação e passa para a próxima pergunta
                        questionBox.setText(this.questions[this.currentQuestion].explanation);
                        // Pausa o timer
                        this.timer.paused = true;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        // espera 1 segundo e passa para a próxima pergunta
                        setTimeout(() => {
                            this.showNextQuestion();
                        }, 5000);
                    }
                }, this)
                .setStrokeStyle(4, 0x000000);

            this.add.text(475, 275, this.questions[this.currentQuestion].choices[0], {
                fontFamily: 'Arial',
                fontSize: 17,
                color: '#000000',
                wordWrap: {width: 500, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);

            var Answer1 = this.add.rectangle(475, 375, 510, 65, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => {
                    Answer1.name = "1";
                    if (parseInt(Answer1.name) === this.questions[parseInt(Answer1.name)].correctAnswer) {
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
                        this.timer.paused = true;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        // espera 1 segundo e passa para a próxima pergunta
                        setTimeout(() => {
                            this.showNextQuestion();
                        }, 1000);
                    } else {
                        console.log("Resposta errada!");
                        // Se a resposta estiver errada, mostra a explicação e passa para a próxima pergunta
                        questionBox.setText(this.questions[this.currentQuestion].explanation);
                        // Tira o timer
                        this.time.paused = true;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        // espera 1 segundo e passa para a próxima pergunta
                        setTimeout(() => {
                            this.showNextQuestion();
                        }, 5000);
                    }
                }, this)
                .setStrokeStyle(4, 0x000000);

            this.add.text(475, 375, this.questions[this.currentQuestion].choices[1], {
                fontFamily: 'Arial',
                fontSize: 17,
                color: '#000000',
                wordWrap: {width: 500, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);

            var Answer2 = this.add.rectangle(475, 475, 510, 65, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => {
                    Answer2.name = "2";
                    if (parseInt(Answer2.name) === this.questions[parseInt(Answer2.name)].correctAnswer) {
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
                        this.timer.paused = true;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        // espera 1 segundo e passa para a próxima pergunta
                        setTimeout(() => {
                            this.showNextQuestion();
                        }, 2000);
                    } else {
                        console.log("Resposta errada!");
                        // Se a resposta estiver errada, mostra a explicação e passa para a próxima pergunta
                        questionBox.setText(this.questions[this.currentQuestion].explanation);
                        // Pauser o timer
                        this.timer.paused = true;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        // espera 1 segundo e passa para a próxima pergunta
                        setTimeout(() => {
                            this.showNextQuestion();
                        }, 5000);
                    }
                }, this)
                .setStrokeStyle(4, 0x000000);

            this.add.text(475, 475, this.questions[this.currentQuestion].choices[2], {
                fontFamily: 'Arial',
                fontSize: 17,
                color: '#000000',
                wordWrap: {width: 500, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);
        }

    }

    // go to the next question after timer runs out
    goToNextQuestion() {
        this.currentQuestion++;
        this.showNextQuestion();
    }

    update() {
        this.timerText.setText(Math.floor((16000 - this.timer.getElapsed()) / 1000));
    }

}

class Phising extends Phaser.Scene {
    constructor() {
        super({key: 'Phising'});
    }

    preload() {
        this.load.image('monitor', monitor);
        let score = 0;
        let scoreText;
    }

    create() {
        
        // Nível 1 background
        this.add.image(475, 300, 'monitor');
    
        // Email list background
        this.add.rectangle(365, 253, 395, 250, 0xfddddd);
        
        // Email inbox title
        this.add.text(475, 150, 'Email inbox', {fontFamily: 'Arial', fontSize: 32, color: '#000000'}).setOrigin(0.5);
    
        // Email list items
        const email1 = this.add.text(275, 220, '1. You have won a prize!', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});

// Add button to email item
const email1Button = this.add.graphics()
    .fillStyle(0x00ff00)
    .fillRoundedRect(630, 210, 60, 35, 15)
    .setInteractive();

email1Button.on('pointerdown', () => {
    const message = 'Congratulations! You have won a prize.';
    const alertBox = this.add.graphics()
        .setDepth(1)
        .fillStyle(0xffffff)
        .fillRect(200, 150, 475, 200)
        .setAlpha(0.9);
    
    const alertText = this.add.text(475, 200, 'Hello', {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#000000'
    }).setOrigin(0.5);
    
    this.time.delayedCall(5000, () => {
        alertBox.destroy();
        alertText.destroy();
    });
});

this.add.text(585, 227, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);
      
    
    // Add the dialog plugin to the scene
    this.dialogPlugin = this.plugins.get('rexDialog');
    
    
        const email2 = this.add.text(200, 260, '2. Urgent message from your bank', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
    
        // Add button to email item
        const email2Button = this.add.graphics()
        .fillStyle(0x00ff00)
        .fillRoundedRect(555, 250, 60, 35, 15)
        .setInteractive()
        .on('pointerdown', function () {
            const message = 'Your bank took your money, have a nice day!';
            this.add.text(475, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
        }, this);
        this.add.text(585, 267, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);
    
    
        const email3 = this.add.text(200, 300, '3. Important security update', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
    
        // Add button to email item
        const email3Button = this.add.graphics()
        .fillStyle(0x00ff00)
        .fillRoundedRect(555, 290, 60, 35, 15)
        .setInteractive()
        .on('pointerdown', function () {
            const message = 'Your bank took your money, have a nice day!';
            this.add.text(475, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
        }, this);
        this.add.text(585, 306, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);
    
    
        const email4 = this.add.text(200, 340, '4. Your account has been compromised', {fontFamily: 'Arial', fontSize: 20, color: '#000000'});
    
        // Add button to email item
        const email4Button = this.add.graphics()
        .fillStyle(0x00ff00)
        .fillRoundedRect(555, 330, 60, 35, 15)
        .setInteractive()
        .on('pointerdown', function () {
            const message = 'Your bank took your money, have a nice day!';
            this.add.text(475, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
        }, this);
        this.add.text(585, 346, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);
    
    
    
        // BOTAO DE VOLTAR -> vai para choose game
        this.add.circle(192, 487, 32, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000)
            .setAlpha(0.1);
        // this.add.text(200, 475, ' ', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);



        // // BOTAO DE X -> vai para choose game
        // this.add.rectangle(700, 50, 50, 50, 0xff0000)
        //         .setInteractive()
        //         .on('pointerdown', this.loadChooseGameScene, this)
        //         .setStrokeStyle(4, 0x000000);
            
        // this.add.text(700, 50, 'X', {fontFamily: 'Arial', fontSize: 24, color: '#ffffff'}).setOrigin(0.5);

        }
        
        loadChooseGameScene() {
            this.scene.start('ChooseGameScene');
        }
    
        showPopup(title, message) {
            // Create the popup background
            const popupBackground = this.add.rectangle(475, 300, 500, 200, 0xffffff);
            popupBackground.setStrokeStyle(4, 0x000000);
        
            // Add the popup title and message
            this.add.text(475, 250, title, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
            this.add.text(475, 300, message, {fontFamily: 'Arial', fontSize: 20, color: '#000000'}).setOrigin(0.5);
        
            // Add the close button
            const closeButton = this.add.rectangle(475, 350, 100, 50, 0xff0000)
                .setInteractive()
                .on('pointerdown', function () {
                    // Remove the popup from the scene
                    popupBackground.destroy();
                    popupTitle.destroy();
                    popupMessage.destroy();
                    closeButton.destroy();
                }, this);
            this.add.text(475, 350, 'Close', {fontFamily: 'Arial', fontSize: 20, color: '#ffffff'}).setOrigin(0.5);
        }
}

class MemoryCard extends Phaser.Game {

    constructor() {
        
    //   var config = {
    //     type: Phaser.AUTO,
    //     width: 950,
    //     height: 600,
    //     physics: {
    //       default: 'arcade',
    //       arcade: {
    //         gravity: { y: 200 }
    //       }
    //     },
    //   };
      super(config);
      this.scene.add('MemoryCard', Board, true);
    }
  }
  
  //window.game = new MemoryCard();

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 950,
    height: 600,
    scene: [Menu, ChooseGameScene, QuizGame, Phising],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);