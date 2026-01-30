class Player {
  constructor() {
    this.x = 150;
    this.y = 500;

    // sprite info
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.width = 128;
    this.height = 128;

    // hitbox (smaller than sprite)
    this.hitbox = {
      xOffset: 30,
      yOffset: 20,
      width: 70,
      height: 90
    };

    // physics
    this.velocityY = 0;
    this.gravity = 1.4;
    this.jumpForce = -30;
    this.grounded = true;

    // animation
    this.frameX = 0;
    this.maxFrames = 4;
    this.frameTimer = 0;
    this.frameInterval = 6;

    // images
    this.runImg = new Image();
    this.runImg.src = "assets/player/run.png";

    this.jumpImg = new Image();
    this.jumpImg.src = "assets/player/jump.png";
  }

  update() {
    if (jumpPressed && this.grounded) {
      this.velocityY = this.jumpForce;
      this.grounded = false;
      this.frameX = 0;
    }

    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y >= 500) {
      this.y = 500;
      this.velocityY = 0;
      this.grounded = true;
    }

    if (this.grounded) {
      this.frameTimer++;
      if (this.frameTimer >= this.frameInterval) {
        this.frameX = (this.frameX + 1) % this.maxFrames;
        this.frameTimer = 0;
      }
    }
  }

  draw(ctx) {
    const img = this.grounded ? this.runImg : this.jumpImg;

    ctx.drawImage(
      img,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  getHitbox() {
    return {
      x: this.x + this.hitbox.xOffset,
      y: this.y + this.hitbox.yOffset,
      width: this.hitbox.width,
      height: this.hitbox.height
    };
  }
}
