
(function() {
  'use strict';
  class Hero extends Character {
    constructor( canvas, ctx ) {
      super();
      this.x = 0;
      this.y = canvas.height - this.size;
      this.color = 'grey';    
      this.canvas = canvas;
      this.ctx = ctx;
    }

    draw() {
      if (this.x < 0) this.x = 0;
      if (this.x > this.canvas.width - this.size) this.x = this.canvas.width - this.size;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);  
    }

    checkCollision(enemy) {
      return (this.x < enemy.x + enemy.width) && (this.x + this.width > enemy.x) && (this.y < enemy.y + enemy.height) && (this.y + this.height > enemy.y);
    }  
  }
  window.Hero = Hero;
})();