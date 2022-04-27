let dots=[];
let number = 200;
let speed = 2;
let infected = 1;
let simulating = 0;
var simulation = 0;


//check the select
function check(that) {
  if (that.value == "1") {
      simulation = 1;
  } else if (that.value == "2") {
      simulation = 2;
  }
  else if (that.value == "3") {
      simulation = 3;
  }
  else if (that.value == "4") {
      simulation = 4;
 }
  else if (that.value == "5") {
  simulation = 5;
}

  
}

//reset the canvas
function reset() {
  
  if (simulation > 0) {
    setup();
  } 
}


// make the canvas responsible
windowResized = function() {
  resizeCanvas(window.innerWidth-18, 600);
}

function simulate() {
  if (simulating == 0) {
    simulating = 1;
    $(".btn-toggle").text('Pause');
  } else {
    simulating = 0;
    $(".btn-toggle").text("Simulate");
  }

}

function setup() {
    infected = 1;   
    canvas = createCanvas(window.innerWidth-18, 600);
    dots = [];
    dots[0] = new Dot(0, 1, speed);
    dots[0].healTime = 600;
    // create dots
    if (simulation == 2) { number = 500;} else { number = 200;}
    for (i = 1; i < number; i++) {
        dots[i] = new Dot(i, 0, speed);
    }
}
  
function draw() {
    background(0,0,0);
    fill(255,255,255);
    textAlign(CENTER);
    text('Infected people: ' + infected + '/' + number, width/2, 20);
    let p = 1;

    if (simulation > 3) { p = 0.05;}
    console.log(p);
    if (simulating == 1) {
        for (i=0; i<dots.length; i++) {
            dots[i].show();
            dots[i].move();
            dots[i].heal();
            if (dots[i].infected == 1) {
                if (simulation == 5) {
                  dots[i].speed = 0;
                } 
                for (j=0; j<dots.length; j++) {
                    if (dots[j].infected == 0) {
                        dots[i].infect(dots[j].x,dots[j].y, j, p);
                    }
                }
            }
        }
    }
    else {
        for (i=0; i<dots.length; i++) {
            dots[i].show();
        }

    }
}

//define Dot and functions
class Dot {
    constructor(_index_, _infected_, _speed_) {
      this.infected = _infected_;
      this.index = _index_;
      this.x = Math.random() * windowWidth;
      this.y = Math.random() * 600;
      this.r = 5;
      this.dir = Math.random() * TAU;
      this.speed = _speed_;
      this.healTime = 9999;
    }
    
    //display dots
    show() {
      //     Infected
      if (this.infected == 1) {
        fill(255, 0, 0);;
        //    Recovered
      } else if (this.infected == 0 && this.healTime == 9999) {
        fill(255, 255, 255);
        //  Healthy
      } else {
        fill(0, 255, 0);
      }
      ellipse(this.x, this.y, this.r * 2);
    }
    
    // move dots
    move() {
      this.px = this.x;
      this.py = this.y;
      this.x += Math.cos(this.dir) * this.speed;
      this.y += Math.sin(this.dir) * this.speed;
      if (this.x < 0 || this.x > canvas.width || this.y <0 || this.y > 600) {
        this.x = this.px;
        this.y = this.py;
        this.dir = Math.random() * TAU;
      } 

      let i = Math.random();
      
      // simulation3: check distance
      if (simulation == 3 || simulation == 5) {
        for (i=0; i<dots.length; i++) {
          if ((i != this.index) &&(distance(this.x, this.y, dots[i].x, dots[i].y) < 30)) {
            this.x = this.x + (this.x - dots[i].x) * 0.025 * this.speed;
            this.y = this.y + (this.y - dots[i].y) * 0.025 * this.speed;
          }
      }
      } 
      else if (i > 0.9) {
        this.dir = (this.dir - 0.25 * TAU) + 0.5 * Math.random() * TAU;
      }

      if (this.x < 0 || this.x > canvas.width || this.y <0 || this.y > 600) {
        this.x = this.px;
        this.y = this.py;
        this.dir = Math.random() * TAU;
      } 
      
    }

    // infect uninfected dots
    infect(x, y, index, p) {
      let dx = this.x - x;
      let dy = this.y - y;
      let d = (dx ** 2 + dy ** 2) ** 0.5;
      if (d < 20 && Math.random() < p) {
          dots[index].infected = 1;
          if (p == 1) {dots[index].healTime = 600;}
          else {dots[index].healTime = 200;}
          infected ++;
      }  
    }

    heal() {
        if (this.infected == 1 && this.healTime > 0) {
          this.healTime -= 1;
        } else if (this.infected == 1 && this.healTime == 0) {
          this.infected = 0;
          infected --;
          this.speed = 2;
        }
    
    }
}

function distance(x1, y1, x2, y2) {
  return ((x1-x2)**2 + (y1-y2)**2) ** 0.5;
}
