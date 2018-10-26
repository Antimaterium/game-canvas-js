(function() {
  class Enemy extends Character {
    constructor(x, ctx) {
      super();
      this.x = x;
      this.y = 0;
      this.width = this.size;
      this.height = this.size;
      console.log(this.size)
      this.enemiesColors = [ 'red', 'blue', 'yellow', 'white', 'purple', 'cyan', 'gray', 'orange' ]
      this.color = this.enemiesColors[Math.floor(Math.random() * this.enemiesColors.length)];

      this.ctx = ctx; 
    }

    draw() {
      this.y += 1;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);  
    }

    static get enemiesColors() {
      return this.enemiesColors;
    }

    static get size() {
      return this.size;
    }
  }
  window.Enemy = Enemy;
})();