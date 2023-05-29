import Phaser from 'phaser';
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

        this.add.text(475, 350, 'Phishing', {fontFamily: 'Arial', fontSize: 22, color: '#000000'}).setOrigin(0.5);
        // Game 3
        this.add.rectangle(675, 350, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadMemoryCard, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(675, 350, ' Cartas\nMemória', {
            fontFamily: 'Arial',
            fontSize: 19,
            color: '#000000'
        }).setOrigin(0.5);


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
                    "Um dispositivo que verifica se um usuário é quem ele diz ser, geralmente por meio de um código enviado para o seu celular",
                    "Um software ou hardware que monitora e controla o tráfego de rede, permitindo ou bloqueando o acesso com base em um conjunto de regras de segurança",
                    "Um tipo de malware que bloquea todas as portas de rede do computador impedindo que o usuário acesse a Internet"
                ],
                correctAnswer: 1,
                explanation: "Um firewall é um software ou hardware que monitora e controla o tráfego de rede, permitindo ou bloqueando o acesso com base em um conjunto de regras de segurança."
            },
            {
                question: "O que é um ransomware?",
                choices: [
                    "Um ataque que consiste em enviar um e-mail falso, com o objetivo de enganar o destinatário e fazê-lo revelar informações confidenciais",
                    "Um dispositivo que verifica se um usuário é quem ele diz ser, geralmente por meio de um código enviado para o seu celular",
                    "Um tipo de vírus que criptografa os arquivos do usuário e exige o pagamento de um resgate para liberá-los"
                ],
                correctAnswer: 2,
                explanation: "Ransomware é um tipo de malware que criptografa os arquivos do usuário e exige o pagamento de um resgate para liberá-los."
            },
            {
                question: "O que é um antivírus?",
                choices: [
                    "Um software que verifica se um usuário é quem ele diz ser, geralmente por meio de um código enviado para o seu celular",
                    "Um software que monitora e controla o tráfego de rede, permitindo ou bloqueando o acesso com base em um conjunto de regras de segurança",
                    "Um software que detecta e remove vírus e outros tipos de malware"
                ],
                correctAnswer: 2,
                explanation: "Um antivírus é um software que detecta e remove vírus e outros tipos de malware."
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
        this.add.text(475, 30, 'Cybersecurity Quiz', {
            fontFamily: 'Arial',
            fontSize: 40,
            color: '#ffffff'
        }).setOrigin(0.5);

        // back button
        this.add.rectangle(120, 525, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadMenuScene, this)
            .setStrokeStyle(4, 0x000000);

        this.add.text(120, 525, 'Voltar', {fontFamily: 'Arial', fontSize: 24, color: '#000000'}).setOrigin(0.5);

        this.timer = this.time.addEvent({delay: 16000, callback: this.goToNextQuestion, callbackScope: this});
        this.showNextQuestion();
    }

    showNextQuestion() {
        // Reinicia o timer
        this.timer.remove();
        this.timer = this.time.addEvent({delay: 16000, callback: this.goToNextQuestion, callbackScope: this});
        this.timer.paused = false;
        if (this.currentQuestion >= this.questions.length) {
            // Exibe a pontuação final e reinicia o jogo
            this.timer.remove();

            this.add.rectangle(475, 150, 500, 90, 0x000000).setOrigin(0.5);
            // impede que o usuário clique em outra resposta
            questionBox = this.add.text(475, 150, "FIM DE JOGO! Pontuação final: " + this.score, {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                wordWrap: {width: 500, useAdvancedWrap: true}
            }).setOrigin(0.5);

            this.score = 0;
            this.currentQuestion = 0;
        } else {
            // Exibe a pergunta e as opções

            // Exibe timer
            this.add.rectangle(475, 80, 50, 30, 0x000000).setStrokeStyle(4, 0xffffff);
            this.timerText = this.add.text(475, 80, '10', {
                fontFamily: 'Arial',
                fontSize: 24,
                color: '#ff0000'
            }).setOrigin(0.5);

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
                    if (parseInt(Answer0.name) === this.questions[this.currentQuestion].correctAnswer) {
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
                        this.timer.paused = true;
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
                        this.timer.paused = true;
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
                    if (parseInt(Answer1.name) === this.questions[this.currentQuestion].correctAnswer) {
                        questionBox.setColor('#00ff00');
                        Answer1.setStrokeStyle(4, 0x00ff00);
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        this.timer.paused = true;
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
                        this.timer.paused = true;
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
                    if (parseInt(Answer2.name) === this.questions[this.currentQuestion].correctAnswer) {
                        questionBox.setColor('#00ff00');
                        Answer2.setStrokeStyle(4, 0x00ff00);
                        questionBox.setText("Resposta correta!");
                        // Se a resposta estiver correta, adiciona pontos e passa para a próxima pergunta
                        this.score += 10;
                        this.currentQuestion++;
                        // impede que o usuário clique em outra resposta
                        Answer0.disableInteractive();
                        Answer1.disableInteractive();
                        Answer2.disableInteractive();
                        this.timer.paused = true;
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
                        this.timer.paused = true;
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

    loadMenuScene() {
        this.scene.start('Menu');
    }

}

class Phising extends Phaser.Scene {
    constructor() {
        super({key: 'Phising'});

        this.score = 0;
        this.currentEmailIndex = 0;

        this.contentText;

        this.emails = [
            {
                content: '\n\n\nVc ganhou um premio!!' + '' +
                    'Clique no link abaxo p/a resgatalo:\n' +
                    'www.premioimeditado.com.pt\n',
                answer: 'Phishing',
                answered: false,
                explanation: 'Fique atento a erros da ortografia ou escrita muito reduzida.'
            },
            {
                content: '\n\n\nMensagem Urgente do Banco Nacional!!!!\n' +
                    'Compra de 10.500,00 euros não identificada na sua conta!\n' +
                    'Clique no link a baixo o mais rápido possível para cancelar a operação ou sua conta vai ser liquidada!!\n' +
                    'http://www.bancoonacional.ru\n',
                answer: 'Phishing',
                answered: false,
                explanation: 'Atenção a URLs suspeitas e situações muito exageradas'
            },
            {
                content: '\n\n\nNotificação de segurança\n' + 'As senhas devem ser trocadas a cada 6 meses para evitar fraudes, logue na sua conta e mude para uma nova até dia X.',
                answer: 'Legítimo',
                answered: false,
                explanation: 'Não houve nenhuma situação alarmente e não pediu nenhuma ação adicional, pode ser seguro, verifique seus dados.'
            },
            {
                content: '\n\n\n\nSua conta foi comprometida.\n' +
                    '\nIndentificamos uma anormalidade no seu login, cheque seu aplicativo de autenticação e logue para confirmar sua identidade.',
                answer: 'Legítimo',
                answered: false,
                explanation: '\n\nUm serviço nunca vai pedir informações adicionais e sempre vai pedir para confirmar sua indentidade de maneira que não seja por meio externo ao próprio serviço.'
            }
        ];

    }

    preload() {
        this.load.image('monitor', 'https://cen-api.nw.r.appspot.com/asset?fileName=monitor.jpg');
    }

    create() {

        // Camera background
        this.cameras.main.setBackgroundColor('#000042');

        // background
        this.add.image(460, 300, 'monitor');

        // Email list background
        this.add.rectangle(450, 253, 395, 250, 0x00809B);

        // Email inbox title
        this.add.text(460, 170, 'Email inbox', {fontFamily: 'Arial', fontSize: 32, color: '#FFFFFF'})
            .setOrigin(0.5);

        // Email list items
        const email1 = this.add.text(275, 220, '1. You have won a prize!', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#FFFFFF'
        });

        // Add button to email item
        const email1Button = this.add.rectangle(605, 230, 60, 35, 0x00ff00)
            .setInteractive()
            .on('pointerdown', this.openEmail1, this);
        this.add.text(585, 220, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#ffffff'})

        // Se o email já foi respondido, o retângulo fica vermelho
        if (this.emails[0].answered) {
            email1Button.setFillStyle(0xff0000);
        }

        const email2 = this.add.text(275, 260, '2. Urgent message from your bank', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#FFFFFF'
        });

        // Add button to email item

        const email2Button = this.add.rectangle(605, 270, 60, 35, 0x00ff00)
            .setInteractive()
            .on('pointerdown', this.openEmail2, this);
        this.add.text(585, 260, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF'});

        // Se o email já foi respondido, o retângulo fica vermelho
        if (this.emails[1].answered) {
            email2Button.setFillStyle(0xff0000);
        }

        const email3 = this.add.text(275, 300, '3. Important security update', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#FFFFFF'
        });

        // Add button to email item
        const email3Button = this.add.rectangle(605, 310, 60, 35, 0x00ff00)
            .setInteractive()
            .on('pointerdown', this.openEmail3, this);
        this.add.text(585, 300, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF'});

        // Se o email já foi respondido, o retângulo fica vermelho
        if (this.emails[2].answered) {
            email3Button.setFillStyle(0xff0000);
        }

        const email4 = this.add.text(275, 340, '4. Your account has been compromised', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#FFFFFF'
        });

        // Add button to email item
        const email4Button = this.add.rectangle(605, 350, 60, 35, 0x00ff00)
            .setInteractive()
            .on('pointerdown', this.openEmail4, this);
        this.add.text(585, 338, 'Open', {fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF'});

        // Se o email já foi respondido, o retângulo fica vermelho
        if (this.emails[3].answered) {
            email4Button.setFillStyle(0xff0000);
        }

        // Voltar
        this.add.circle(250, 487, 32, 0xffffff)
            .setInteractive()
            .on('pointerdown', this.loadChooseGameScene, this)
            .setStrokeStyle(4, 0x000000)
            .setAlpha(0.1);

        // Verifica se todos os emails já foram respondidos
        if (this.emails[0].answered && this.emails[1].answered && this.emails[2].answered && this.emails[3].answered) {
            // Carrega cena de inbox vazia e mostra pontuação

            //this.scene.start('Phising');
            this.removeButtons();
            this.add.text(300, 170, 'Você respondeu todos os emails!', {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#000000',
                wordWrap: {width: 400, height: 50, useAdvancedWrap: true}
            });
            // Exibir pontuação
            this.add.text(300, 200, 'Pontuação Final: ' + this.score, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#000000',
                wordWrap: {width: 400, height: 50, useAdvancedWrap: true}
            });
        }

    }

    openEmail1() {
        this.currentEmailIndex = 0;
        // Exibir o conteúdo do email 1 e adicionar os botões de phishing e legítimo
        this.displayEmailContent(this.emails[0].content
            , ['Phishing', 'Legítimo', 'Voltar']);
    }

    openEmail2() {
        this.currentEmailIndex = 1;
        // Exibir o conteúdo do email 2 e adicionar os botões de phishing e legítimo
        this.displayEmailContent(this.emails[1].content
            , ['Phishing', 'Legítimo', 'Voltar']);
    }

    openEmail3() {
        this.currentEmailIndex = 2;
        // Exibir o conteúdo do email 3 e adicionar os botões de phishing e legítimo
        this.displayEmailContent(this.emails[2].content
            , ['Phishing', 'Legítimo', 'Voltar']);
    }

    openEmail4() {
        this.currentEmailIndex = 3;
        // Exibir o conteúdo do email 4 e adicionar os botões de phishing e legítimo
        this.displayEmailContent(this.emails[3].content
            , ['Phishing', 'Legítimo', 'Voltar']);
    }

    displayEmailContent(emailText, options) {
        // Remover os botões anteriores (se houver)
        this.removeButtons();

        // Mostrar o conteúdo do email
        this.contentText = this.add.text(450, 170, emailText, {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#000000',
            wordWrap: {width: 300, height: 50, useAdvancedWrap: true}
        }).setOrigin(0.5);

        // Exibir o conteúdo do email

        // Adicionar os botões de phishing e legítimo
        const buttonX = 350;
        const buttonY = 345;
        const buttonSpacing = 100;

        // Exibe as opções
        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            const button = this.add.rectangle(buttonX + i * buttonSpacing, buttonY, 80, 40, 0x00ff00)
                .setInteractive()
                .on('pointerdown', () => this.selectOption(option));
            this.add.text(buttonX + i * buttonSpacing, buttonY, option, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#FFFFFF'
            })
                .setOrigin(0.5);
        }
    }

    selectOption(option) {
        // Lógica para tratar a opção selecionada (Phishing ou Legítimo)
        console.log('Option selected:', option);
        console.log('Current email index:', this.currentEmailIndex);
        console.log('Current email answer', this.emails[this.currentEmailIndex].answer)

        // Verificar se já foi respondido true ou false
        if (this.emails[this.currentEmailIndex].answered) {
            this.scene.start('Phising');
        }

        // Se a opção for voltar, voltar para o email inbox
        if (option === 'Voltar') {
            this.scene.start('Phising');
        }

        // Se a resposta for correta, adicionar 1 ponto e substituir o texto do email por "Correto"

        if (option === this.emails[this.currentEmailIndex].answer && option !== 'Voltar') {
            console.log("Acertou.")
            this.score += 10;
            this.emails[this.currentEmailIndex].answered = true;
            this.emails[this.currentEmailIndex].content = 'Correto!';
            // Exibe o conteúdo do email novamente
            this.contentText.destroy();
            this.add.text(450, 170, this.emails[this.currentEmailIndex].content, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#000000',
                wordWrap: {width: 300, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);

        } else if (option === this.emails[this.currentEmailIndex].answer && option !== 'Voltar') {
            console.log("Acertou.")
            this.score += 10;
            this.emails[this.currentEmailIndex].answered = true;
            this.emails[this.currentEmailIndex].content = 'Correto!';
            // Exibe o conteúdo do email novamente
            this.contentText.destroy();
            this.add.text(450, 170, this.emails[this.currentEmailIndex].content, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#000000',
                wordWrap: {width: 300, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);
        } else if (option !== this.emails[this.currentEmailIndex].answer && option !== 'Voltar') {
            console.log("Errou.")
            this.emails[this.currentEmailIndex].answered = true;
            this.emails[this.currentEmailIndex].content = 'Incorreto';
            // Mostra a explicação do porquê a resposta está incorreta
            this.emails[this.currentEmailIndex].content = this.emails[this.currentEmailIndex].explanation;
            // Exibe o conteúdo do email novamente
            this.contentText.destroy();
            this.add.text(450, 170, this.emails[this.currentEmailIndex].content, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#000000',
                wordWrap: {width: 300, height: 50, useAdvancedWrap: true}
            }).setOrigin(0.5);
        }
    }

    removeButtons() {
        // Disabilitar todos os botões de open
        this.children.list.forEach(child => {
            if (child.type === 'Rectangle') child.disableInteractive();
        });
        // Remover os botões de phishing e legítimo
        this.children.list = this.children.list.filter(child => child.type !== 'Rectangle');
    }

    loadChooseGameScene() {
        this.scene.start('ChooseGameScene');
    }


}

class MemoryCard extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('MemoryCard', Board, true);
    }

}

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