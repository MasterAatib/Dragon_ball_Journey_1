class Obstacle {
  constructor(worldX) {
    this.worldX = worldX;
    this.y = 570;

    this.width = 64;
    this.height = 64;

    this.hitbox = {
      xOffset: 10,
      yOffset: 10,
      width: 44,
      height: 44
    };

    this.img = new Image();
    this.img.src = "assets/obstacles/spike.png";
  }

  draw(ctx, cameraX, playerX) {
    const screenX = this.worldX - cameraX + playerX;
    ctx.drawImage(this.img, screenX, this.y, this.width, this.height);
  }

  getHitbox(cameraX, playerX) {
    const screenX = this.worldX - cameraX + playerX;
    return {
      x: screenX + this.hitbox.xOffset,
      y: this.y + this.hitbox.yOffset,
      width: this.hitbox.width,
      height: this.hitbox.height
    };
  }
}

