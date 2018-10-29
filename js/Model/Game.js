(function () {
  'use strict';
  class Game extends Elements {
    constructor() {
      super();
      this.score = 0;
      this.frames = 0;
      this.looper;
      this.isPlaying;
      this.isGameOver = false;
      this.enemyesStore = [];
      
      this.hero = new Hero(this.$canvas, this.ctx);
      this.character = new Character();
      this.primarySound = new Audio('./sounds/primary-bg-sound.mp3');
      this.secondarySound = new Audio('./sounds/secondary-bg-sound.mp3');
      this.setMusicVolume(0.04);

      this.scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];
      localStorage.setItem('scoreHistory', JSON.stringify(this.scoreHistory));
      this.bind();

      $('#start').addEventListener('click', this.startGame, false);
    }

    startGame( { target } ) {
      // this.primarySound.play();
      target.style.display = 'none';
      this.startLooper();
      window.addEventListener('keydown', this.handleKeys);
      this.$audioButton.addEventListener('click', this.handleMusicState);
      this.$restartButton.addEventListener('click', this.restart);
      this.primarySound.addEventListener('ended', this.playPrimaryMusic, false);
      this.secondarySound.addEventListener('ended', this.playSecondaryMusic, false);
    }

    startLooper() {
      this.isPlaying = true;
      this.looper = setInterval(this.render, 0);
    }

    render() {
      this.resetCanvas();
      this.frames += 1;
      this.hero.draw();
      this.createEnemy();
      this.drawEnemies();
      this.collisionChecker();
      this.renderScore();
    }

    resetCanvas() {
      this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }

    createEnemy() {
      if (this.frames % this.character.size === 0) {
        let x = Math.floor(Math.random() * 10) * this.character.size;
        this.enemyesStore.push(new Enemy(x, this.ctx));
        if (this.enemyesStore.length === 12)
          this.enemyesStore.shift();
      }
    }

    drawEnemies() {
      this.enemyesStore.forEach(enemy => enemy.draw());
    }

    collisionChecker() {
      this.enemyesStore.forEach(enemy => {
        if (this.hero.checkCollision(enemy)) {
          this.gameOver();
        }
        if (enemy.y === 500)
          this.score++;
      })
    }

    renderScore() {
      this.ctx.font = '16px Arial';
      this.ctx.fillStyle = '#0095DD';
      this.ctx.fillText(`Score: ${this.score}`, this.$canvas.width - 100, 20);
    }

    gameOver() {
      this.stopLoop();
      this.ctx.font = '20px Verdana';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('GAME OVER', 185, 220);
      this.updateGameState();
      this.updateScoreHistory();
      this.$restartButton.style.display = 'block';
    }

    restart() {
      this.enemyesStore.splice(0, this.enemyesStore.length);
      this.$restartButton.style.display = 'none';
      this.score = 0;
      this.startLooper();
      this.changeGameOverState();
    }

    handleKeys({ keyCode }) {
      if (keyCode === 37 && this.isPlaying) {
        if (this.hero.x <= 0)
          return;
        this.hero.x -= this.character.size;
      }
      if (keyCode === 39 && this.isPlaying) {
        if (this.hero.x >= this.$canvas.width - this.character.size)
          return;
        this.hero.x += this.character.size;
      }
      if (keyCode === 32 && !this.isGameOver) {
          this.handlePauseGame();
      } else if (keyCode === 32 && this.isGameOver) {
          this.restart();
      }
    }

    handlePauseGame() {
      if(this.isPlaying) {
        this.stopLoop();
        this.isPlaying = false;
      } else {
        this.startLooper();
        this.isPlaying = true;
      }
    }
    playPrimaryMusic() {
      this.secondarySound.play();
    }

    playSecondaryMusic() {
      this.primarySound.play();
    }

    stopLoop() {
      clearInterval(this.looper)      
    }

    changeGameOverState() {
      this.isGameOver = !this.isGameOver;
    }

    changeIsPlayingState() {
      this.isPlaying = this.isPlaying;
    }

    updateGameState() {
      this.changeGameOverState();
      this.changeIsPlayingState();
    }

    updateScoreHistory() {
      this.scoreHistory.push(this.score);
      this.scoreHistory.sort((a, b) => a > b);
      if(this.scoreHistory.length > 5) 
        this.scoreHistory.shift();

      //this.$scoreHistory.innerHTML = this.mapScoreHistoryToLi();
      localStorage.setItem('scoreHistory',JSON.stringify(this.scoreHistory));
    }

    mapScoreHistoryToLi() {
      return this.scoreHistory.map((score, index) => (
        `<li><b>${index+1}°</b> ${score}</li>`
      )).join('');
    }

    setMusicVolume(volume) {
      this.primarySound.volume = volume;
      this.secondarySound.volume = volume;
    }

    handleMusicState() {
      if (this.primarySound.paused && this.secondarySound.paused) {
        this.playSecondaryMusic();
        this.$audioButton.setAttribute('src', './images/high-volume.png')
      } else {
        this.primarySound.pause();
        this.primarySound.currentTime = 0;
        this.secondarySound.pause();
        this.secondarySound.currentTime = 0;
        this.$audioButton.setAttribute('src', './images/mute-volume.png')
      }
    }

    bind() {
      this.render = this.render.bind(this)
      this.restart = this.restart.bind(this);
      this.startGame = this.startGame.bind(this);
      this.handleKeys = this.handleKeys.bind(this);
      this.setMusicVolume = this.setMusicVolume.bind(this);
      this.playPrimaryMusic = this.playPrimaryMusic.bind(this);
      this.handleMusicState = this.handleMusicState.bind(this);
      this.playSecondaryMusic = this.playSecondaryMusic.bind(this);
    }
  }
  window.Game = Game;
})();
