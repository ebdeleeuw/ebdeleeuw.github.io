const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

class Body {
  constructor(x, y, mass, radius, velocity) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.radius = radius;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  update(dt) {
    this.x += this.velocity.x * dt;
    this.y += this.velocity.y * dt;
  }
}

function getGravitationalForce(body1, body2, G) {
  const dx = body2.x - body1.x;
  const dy = body2.y - body1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const force = G * body1.mass * body2.mass / (distance * distance);
  return {
    x: (force * dx) / distance,
    y: (force * dy) / distance,
  };
}

function updateSimulation(dt, body1, body2, G) {
  const force = getGravitationalForce(body1, body2, G);
  body1.velocity.x += (force.x / body1.mass) * dt;
  body1.velocity.y += (force.y / body1.mass) * dt;

  const oppositeForce = {
    x: -force.x,
    y: -force.y,
  };

  body2.velocity.x += (oppositeForce.x / body2.mass) * dt;
  body2.velocity.y += (oppositeForce.y / body2.mass) * dt;

  body1.update(dt);
  body2.update(dt);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mainLoop(timestamp) {
  const dt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  clearCanvas();

  updateSimulation(dt, body1, body2, G);
  body1.draw();
  body2.draw();

  requestAnimationFrame(mainLoop);
}

const G = 6.67430e-11;

const body1 = new Body(300, 300, 5.972e24, 20, { x: 0, y: 0 });
const body2 = new Body(500, 300, 1.989e30, 40, { x: 0, y: 0 });

let lastTimestamp = 0;
requestAnimationFrame(mainLoop);