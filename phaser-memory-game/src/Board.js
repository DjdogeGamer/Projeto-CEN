import Card from './Card';
import { images } from './imageUtils';
import { getRandomInt } from './util';
import { Text } from 'phaser';

export default class GameScene {
  constructor() {
    this.cards = [];
    this.selectedCards = [];
    this.attempts = 0;
    this.waitForNewRound = false;
    this.score;
    this.matchedCards = [];
  }

  init() { }
  preload ()
  {
    this._loadCards();
    this._newRound();
    // Load the background image
    this.load.image('background', '../assets/background/background.jpg');

    // Load the card images using the imageUtils module
    Object.keys(images).map((name) => {
      this.load.image(name, images[name]);
    });
  }
  
  _loadCards () {
    Object.keys(images).map((name) => {
      this.load.image(name, images[name]);
    });
  }

  _cardClickHandler (card) {
    if (this.waitForNewRound || card.out) { return; }
    card.faceUp();
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this._newRound();
    }
  }

  _newRound() {
    this.waitForNewRound = true;
    setTimeout(() => {
      if (this._matchCards()) {
        this._setAsReadOnly();
        const matchedCardKeys = this.selectedCards.map((card) => card.key);
        this.matchedCards.push(...matchedCardKeys);
      } else {
        this._faceCardsDown();
      }
      this._updateScore();
      this.selectedCards.length = 0;
      this.waitForNewRound = false;
      this.attempts++;
    }, 1000);
  }
  

  _matchedCards() {
    return this.cards.filter((card) => card.outOfTheGame).length / 2;
    
  }

  _updateScore() {
    var style = {
      font: 'bold 32px Arial',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    };
  
    if (!this.score) {
      this.score = this.add.text(0, 425, '', style);
    }
  
    const efficiency = this.attempts
      ? ((this._matchedCards() / this.attempts) * 100).toFixed(0)
      : 0;
  
    const matchedCardCount = this._matchedCards();
    let message = '';
  
    if (matchedCardCount === 0) {
      message = 'Sem cartas par!';
    } else {
      const matchedCardKeys = this.selectedCards.map((card) => card.key);
      const uniqueMatchedCardKeys = [...new Set(matchedCardKeys)]; // Remove duplicate keys
  
      uniqueMatchedCardKeys.forEach((key) => {
        switch (key) {
          case 'card1.png':
            message += 'SQL Injection - Injeção de SQL! Hacker engana o computador com códigos secretos!';
            break;
          case 'card2.png':
            message += 'MitM - Man in the Middle! Hacker espia a conversa de duas pessoas por Wi-Fi!';
            break;
          case 'card3.png':
            message += 'CSRF - Cross Site Request Forgery! Hacker rouba cookies e faz-se passar por ti!';
            break;
          case 'card4.png':
            message += 'XSS - Cross-site Scripting! Hacker esconde uma mensagem maliciosa num website!';
            break;
          case 'card5.png':
            message += 'DoS - Denial of Service! Hacker subcarrega o website até ele ficar muito lento!';
            break;
          default:
            console.log(`No message for key ${key}`);
            break;
        }
      });
  
      if (message === '') {
        message = 'Oops... Tenta novamente!';
      }

      this.selectedCards = []; // Clear the selectedCards arra
    }
  
    const messageStyle = {
      font: 'bold 16px Arial',
      fill: '#fff',
      boundsAlignH: 'left',
      boundsAlignV: 'bottom'
    };
  
    const scoreStyle = {
      font: 'bold 12px Arial',
      fill: '#fff',
      boundsAlignH: 'right',
      boundsAlignV: 'bottom'
    };
  
    this.score.text = `
      ▶ ${message}\n\n\n
      \n ➤ Tentativas: ${this.attempts}
      \n ➤ Pares: ${this._matchedCards()}
      \n ➤ Eficiência: ${efficiency}%
    `;
  
    this.score.setStyle(scoreStyle, 0);
    this.score.setStyle(messageStyle, 1);
    console.log(message);
  }
  
  

  _setAsReadOnly() {
    this.selectedCards.forEach((card) => card.readOnly());
  }

  _faceCardsDown() {
    this.selectedCards.forEach((card) => card.faceDown());
  }

  _matchCards () {
    if (!this.selectedCards.length) {
      return false;
    }
    
    const cardA = this.selectedCards[0];
    const cardB = this.selectedCards[1];
    const isMatched = cardA.key === cardB.key;
  
    if (isMatched) {
      // Flash message for x seconds
      const message = this.add.text(525, 500, 'Correcto!', { font: 'bold 30px Oswald', fill: '#fff' });
      message.setOrigin(0.5);
      message.setDepth(1);
      this.time.delayedCall(2000, () => {
        message.destroy();
      });
    }
  
    return isMatched;
  }

  create ()
  {

    // Load the background image
    const backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(1.2);

    // Add the cards to the scene
    this.cards.forEach((card) => {
      card.addToScene();
    });
  

    const MAX_CARD_PER_LINE = 5;
    const PAIRS = 5;
    const H_OFFSET = 200;
    const V_OFFSET = 200;
    const INITIAL_X = 70;
    const INITIAL_Y = 100;

    const lines = parseInt(PAIRS * 2 / MAX_CARD_PER_LINE) + ((PAIRS * 2 / MAX_CARD_PER_LINE % MAX_CARD_PER_LINE ? 1 : 0));
    const numberOfCards = PAIRS * 2;
    const positions = [];
    
    const imageNames = Object.keys(images).filter((name) => {
      return name.includes('card');
    }).slice(0, PAIRS);

    let total = numberOfCards;
    for (let line = 0; line < lines; line++) {
      for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
        if (total > 0) { 
          positions.push({
            x: INITIAL_X + (H_OFFSET * pos),
            y: INITIAL_Y + (V_OFFSET * line)
          });
        }
        total--;
      }
    }

    while (positions.length) {
      const posA = positions.splice(getRandomInt(positions.length), 1)[0];
      const posB = positions.splice(getRandomInt(positions.length), 1)[0];
      const key = imageNames.splice(getRandomInt(imageNames.length), 1)[0];
      this.cards.push(new Card( {key, gameScene: this, ...posA, handler: this._cardClickHandler.bind(this)} ));
      this.cards.push(new Card( {key, gameScene: this, ...posB, handler: this._cardClickHandler.bind(this)} ));
    }
    
  }
}