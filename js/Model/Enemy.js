(function () {
  class Enemy extends Character {
    constructor(x, ctx) {
      super();
      this.x = x;
      this.y = 0;
      this.width = this.size;
      this.height = this.size;
      this.enemiesToRender = [];
      this.pupulateEnemiesToRender();
      this.body = this.enemiesToRender[Math.floor(Math.random() * this.enemiesToRender.length)];
      this.ctx = ctx;
    }

    draw() {
      this.y += 1;
      this.ctx.drawImage(this.body, this.x, this.y, this.size, this.size);
    }

    pupulateEnemiesToRender() {
      let image = new Image();
      image.src = 'images/substitute.png';
      this.enemiesToRender.push(image, image);
    }

  }
  window.Enemy = Enemy;
})();