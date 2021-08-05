var monkey,monkey2;
var bananaGroup,bananaImg;
var bg,bgImg,ground;
var rockGroup,rockImg;
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var lives;


function preload(){
  
  monkey2 = loadAnimation
  ("Monkey1.png","Monkey2.png","Monkey3.png",
   "Monkey4.png","Monkey5.png","Monkey6.png",
   "Monkey7.png","Monkey8.png","Monkey9.png",
              "Monkey10.png");
  
  bgImg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
  
}


function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(200,180,400,20);
  bg.addImage("ground",bgImg);
  bg.x = bg.width/2;
  bg.velocityX = -4;
  
  monkey = createSprite(100,200);
  monkey.addAnimation("running",monkey2);
  monkey.scale = 0.2;
  
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
  ground = createSprite(200,390,400,10);
  ground.visible = false;
   
  
  score = 0;
  lives = 2;
}



function draw() {
  background(220);
    drawSprites();
   
  if(gameState === PLAY){
    
    if(bg.x < 0){
      bg.x = bg.width/2;
    }
    
    bananaSpawn();
    rockSpawn();
    
    monkey.collide(ground);
    
   if(keyDown("space")&& monkey.y>323){
     monkey.velocityY = -10;
   }
    
    monkey.velocityY = monkey.velocityY + 0.35;
    
    if(monkey.isTouching(bananaGroup)){
      
      bananaGroup.destroyEach();
      score += 2;
    }
    
    if(monkey.isTouching(rockGroup)){
      monkey.scale = 0.2;
      lives -= 1;
      rockGroup.destroyEach();
    }
    
    if(lives === 0){
      gameState = END;
    }
    
  } else if(gameState === END){
    
    monkey.destroy();
    bananaGroup.destroyEach();
    rockGroup.destroyEach();
    ground.velocity = 0;
    stroke("yellow");
    textSize(40);
    fill("white");
    background("black");
    text("THE END",140,200);
  
  }
  
  
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score:"+ score,100,50);
  text("lives:"+ lives,300,50);
  
}
function bananaSpawn(){
  
  if(frameCount%80 === 0 ){
  
    var banana = createSprite(400,Math.round(random(150,250)));
    banana.addImage(bananaImg);
    banana.velocityX = -5;
    banana.scale = 0.05;
    banana.lifetime = 100;
    bananaGroup.add(banana);
    
  }
}


function rockSpawn(){

  if(frameCount%200 === 0){
  
    var rock = createSprite(400,355);
    rock.addImage(rockImg);
    rock.scale = 0.15;
    rock.velocityX = -5;
    rock.lifetime = 100;
    rockGroup.add(rock);
    
  }
}


