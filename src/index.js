import Phaser from 'phaser';
import bgImg from './assets/menu_bg.jpg';

class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {
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


        // QUIZ GAME
        this.add.rectangle(200, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadQuizGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(200, 350, 'Quiz', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

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

    loadQuizGameScene() {
        this.scene.start('QuizGame');
    }

    loadGame2() {
        this.scene.start('Game2');
    }

    loadGame3() {
        this.scene.start('Game3');
    }
}

class QuizGame extends Phaser.Scene {
    constructor() {
        super({key: "QuizGame"});
        // Definição de variáveis
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

    create() {
        this.showNextQuestion();
    }

    showNextQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            // Exibe a pontuação final e reinicia o jogo
            this.add.rectangle(400, 150, 500, 90, 0x000000).setOrigin(0.5);
            // impede que o usuário clique em outra resposta
            questionBox = this.add.text(400, 150, "FIM DE JOGO! Pontuação final: " + this.score, {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                wordWrap: {width: 500, useAdvancedWrap: true}
            }).setOrigin(0.5);

            setTimeout(() => {
                this.score = 0;
                this.currentQuestion = 0;
                this.scene.start('ChooseGameScene');
            }, 3000);
        } else {
            this.add.image(400, 300, 'background');
            this.add.rectangle(400, 150, 550, 100, 0x000000).setStrokeStyle(4, 0xffffff);
            var questionBox = this.add.text(400, 150, this.questions[this.currentQuestion].question, {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                wordWrap: {width: 500, useAdvancedWrap: true}
            }).setOrigin(0.5);

            var Answer0 = this.add.rectangle(400, 275, 510, 65, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => {
                    Answer0.name = "0";
                    if (parseInt(Answer0.name) === this.questions[parseInt(Answer0.name)].correctAnswer) {
                        questionBox.setColor('#00ff00');
                        Answer0.setStrokeStyle(4, 0x00ff00);
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
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

            this.add.text(400, 275, this.questions[this.currentQuestion].choices[0], {
                fontFamily: 'Arial',
                fontSize: 17,
                color: '#000000',
                wordWrap: {width: 500, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);

            var Answer1 = this.add.rectangle(400, 375, 510, 65, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => {
                    Answer1.name = "1";
                    if (parseInt(Answer1.name) === this.questions[parseInt(Answer1.name)].correctAnswer) {
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
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

            this.add.text(400, 375, this.questions[this.currentQuestion].choices[1], {
                fontFamily: 'Arial',
                fontSize: 17,
                color: '#000000',
                wordWrap: {width: 500, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);

            var Answer2 = this.add.rectangle(400, 475, 510, 65, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => {
                    Answer2.name = "2";
                    if (parseInt(Answer2.name) === this.questions[parseInt(Answer2.name)].correctAnswer) {
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
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

            this.add.text(400, 475, this.questions[this.currentQuestion].choices[2], {
                fontFamily: 'Arial',
                fontSize: 17,
                color: '#000000',
                wordWrap: {width: 500, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);
        }

    }

}

class Game2 extends Phaser.Scene {
    constructor() {
        super({key: 'Game2'});
    }

    preload() {

    }

    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#cccccc');

        // Email inbox title
        this.add.text(420, 50, 'Email inbox', {fontFamily: 'Arial', fontSize: 32, color: '#000000'}).setOrigin(0.5);

        // Email list background
        this.add.rectangle(400, 300, 600, 350, 0xffffff);

        // Email list items
        const email1 = this.add.text(120, 170, '1. You have won a prize!', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000'
        });

        // Add button to email item
        const email1Button = this.add.graphics()
            .fillStyle(0x00ff00)
            .fillRoundedRect(575, 160, 60, 35, 15)
            .setInteractive()
            .on('pointerdown', function () {
                const message = 'Congratulations! You have won a prize.';
                this.add.text(400, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
            }, this);
        this.add.text(605, 177, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);


        const email2 = this.add.text(120, 210, '2. Urgent message from your bank', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000'
        });

        // Add button to email item
        const email2Button = this.add.rectangle(500, 210, 100, 40, 0x00ff00)
            .setInteractive()
            .on('pointerdown', function () {
                const message = 'This is an urgent message from your bank.';
                this.add.text(400, 300, message, {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
            }, this);
        this.add.text(500, 210, 'Click', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'}).setOrigin(0.5);

        // Close button
        this.add.rectangle(700, 50, 50, 50, 0xff0000).setInteractive().on('pointerdown', function () {
            this.scene.start('MyGame');
        }, this);
        this.add.text(700, 50, 'X', {fontFamily: 'Arial', fontSize: 24, color: '#ffffff'}).setOrigin(0.5);

        this.add.rectangle(400, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        const email3 = this.add.text(120, 250, '3. Important security update', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000'
        })
            .setInteractive()
            .on('pointerdown', function () {
                // Code to handle clicking on email3
            });
        const email4 = this.add.text(120, 290, '4. Your account has been compromised', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000'
        })
            .setInteractive()
            .on('pointerdown', function () {
                // Code to handle clicking on email4
            });

        // Close button
        this.add.rectangle(700, 50, 50, 50, 0xff0000)
            .setInteractive()
            .on('pointerdown', function () {
                this.scene.start('MyGame');
            }, this);
        this.add.text(700, 50, 'X', {fontFamily: 'Arial', fontSize: 24, color: '#ffffff'}).setOrigin(0.5);

        // Back button
        this.add.rectangle(400, 500, 200, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000);
        this.add.text(400, 500, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);
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
    scene: [Menu, ChooseGameScene, QuizGame, Game2, Game3],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);