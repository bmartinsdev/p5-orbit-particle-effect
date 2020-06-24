class Orbit {
    pos;
    vel;
    acc;
    speed;
    history = [];
    historySize = 160;

    constructor(x, y, speed, history) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.speed = speed;
      this.historySize = history;
      this.vel.mult(8);
    }
  
    update(x, y) {
      let follow = createVector(x, y);
      this.acc = p5.Vector.sub(follow, this.pos);
      this.acc.setMag(0.8);
  
      this.vel.add(this.acc);
      this.vel.limit(this.speed);

      this.pos.add(this.vel);
      let v = createVector(this.pos.x, this.pos.y);
      this.history.push(v);

      if(this.history.length > this.historySize)
        this.history.shift();
    }

    show() {
      beginShape();
      for(let i = 1; i < this.history.length; i++){
        let opacity = i < 35 ? i: 35;
        stroke(100, 100, 100, opacity);
        line(this.history[i].x, this.history[i].y, this.history[i-1].x, this.history[i-1].y);
      }
      endShape();
    };
  }