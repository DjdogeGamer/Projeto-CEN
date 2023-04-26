var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

var questions = [
    {
        question: "Qual o nome do processo de explorar falhas de segurança em software?",
        answers: [
            "Programação",
            "Debugging",
            "Cracking",
            "Hacking"
        ],
        correctAnswerIndex: 3
    },
    {
        question: "Qual a melhor maneira de se proteger de ataques de phishing?",
        answers: [
            "Instalar um antivírus",
            "Manter o software atualizado",
            "Ignorar mensagens de e-mail suspeitas",
            "Nenhuma das anteriores"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Qual o tipo de ataque que consiste em enviar uma grande quantidade de pacotes para um servidor para deixá-lo inacessível?",
        answers: [
            "Phishing",
            "Malware",
            "DDoS",
            "Man-in-the-middle"
        ],
        correctAnswerIndex: 2
    }
];

var currentQuestionIndex = 0;
var score = 0;

function preload() {
    // Carregue as imagens e outros recursos aqui
}

function create() {
    // Adicione os elementos visuais do jogo aqui, como fundo e botões
    
    showQuestion(currentQuestionIndex);
}

function showQuestion(questionIndex) {
    var question = questions[questionIndex];
    
    // Exibe a pergunta
    var questionText = game.add.text(100, 100, question.question, { font: "24px Arial", fill: "#000" });
    
    // Exibe as respostas
    var answerY = 200;
    question.answers.forEach(function(answer, index) {
        var answerButton = game.add.button(100, answerY, 'button', function() {
            if (index === question.correctAnswerIndex) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                showScore();
            }
        }, this, 2, 1, 0);
        answerButton.anchor.setTo(0.5, 0);
        var answerText = game.add.text(0, 0, answer, { font: "18px Arial", fill: "#fff" });
        answerText.anchor.setTo(0.5, 0.5);
        answerButton.addChild(answerText);
        answerY += 50;
    });
}

function showScore() {
    // Exibe a pontuação final
    var scoreText = game.add.text(100, 100, "Sua pontuação é: " + score + "/" + questions.length, { font: "24px Arial", fill: "#000" });
    
    // Adicione um botão para reiniciar o jogo
    var restartButton = game.add.button(100, 200, 'button', function() {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion(currentQuestionIndex);
    }, this, 2, 1, 0);
    restartButton.anchor.setTo(0.5, 0);
    var restartText = game.add.text(0, 0, "Reiniciar", { font: "18px Arial", fill: "#fff" });
    restartText.anchor.setTo(0.5, 0.5);
    restartButton.addChild(restartText);
}
