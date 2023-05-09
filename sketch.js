let ground;
let lander;
var lander_img;
var bg_img;
var asteroid_img;
var asteroid;
var meteor_img;
var meteor;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var asteroidsGroup,meteorsGroup;


var vx = 0;
var g = 0.009;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg_sur.png");
  asteroid_img = loadImage("Asteroid.png");
  meteor_img = loadImage("meteor.png");

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(300,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;




  rectMode(CENTER);
  textSize(15);

  ground = createSprite(500,700,1000,20);

  asteroidsGroup = new Group();
  meteorsGroup = new Group()
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: ",800,75);
  pop();

  if (gameState===PLAY){

    spawnAsteroids();
    spawnMeteors();

    if(keyIsDown(LEFT_ARROW)) {
      lander.velocityX = -2;
    }
  
    if(keyIsDown(RIGHT_ARROW)) {
      lander.velocityX = 2;
    }
  
    if(keyIsDown(UP_ARROW)) {
      lander.y = -1;
    }
    
    if(keyIsDown(DOWN_ARROW)) {
      lander.velocityY = 1;
    }

    if(meteorsGroup.isTouching(lander)) {
     gameState=END
    }


  lander.collide(ground)
  }

  else if (gameState===END){
    lander.velocityX = 0;
      lander.velocityY = 0;
      textSize(18);
      text("Game Over", 500,400)
      asteroidsGroup.setLifetimeEach(-1);
      meteorsGroup.setLifetimeEach(-1);
      asteroidsGroup.setVelocityXEach(0);
      asteroidsGroup.setVelocityYEach(0);
      meteorsGroup.setVelocityXEach(0);
      meteorsGroup.setVelocityYEach(0);
  
  }

 

  //fall down
  //vy +=g;
  //lander.position.y+=vy;
  drawSprites();
}

function spawnAsteroids() {
  if (frameCount % 100 === 0) {
    asteroid = createSprite(random(10,1000),50,30,30);
    asteroid.addImage(asteroid_img)
    asteroid.scale = 0.17;
   // asteroid.x = Math.round(random(10,1000));
   // asteroid.y = Math.round(random(10,400));
    asteroidsGroup.add(asteroid);
    asteroid.velocityY = 2;
    //asteroid.velocityX = -2;
    asteroidsGroup.lifetime = 2000;
  }
  
}

function spawnMeteors() {
  if (frameCount % 80 === 0) {
    meteor = createSprite(900,50,30,30);
    meteor.addImage(meteor_img)
    meteor.scale = 0.3;
    meteor.x = Math.round(random(10,1000));
    meteorsGroup.add(meteor);
    meteor.velocityY = 2;
    meteor.velocityX = -2;
    meteorsGroup.lifetime = 2000;
  }
  
}



