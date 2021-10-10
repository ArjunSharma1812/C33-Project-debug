const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var rope2, rope3;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var volButton;
var fruit_con2, fruit_con3;

var button, button2, button3;
var canW, canH;
var shelf;
var bubbleImg;
var bubble;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg = loadImage('bubble.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80, displayHeight);
  } 
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH);
  }
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.3);

  engine = Engine.create();
  world = engine.world;

  bubble = createSprite(1050, 630, 30, 30);
  bubble.addImage(bubbleImg);
  bubble.scale = 0.1;
  
  button = createImg('cut_btn.png');
  button.position(750,450);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(950,450);
  button2.size(40,40);
  button2.mouseClicked(drop2);
  
  rope = new Rope(6,{x:750,y:450});
  rope2 = new Rope(6,{x:990 ,y:450});
  ground = new Ground(200,canH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(1100,canH-780,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  volButton = createImg("mute.png");
  volButton.position(1500, 50);
  volButton.size(60, 60);
  volButton.mouseClicked(mute);

  
  
  fruit = Bodies.circle(850,600,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2, fruit);

  shelf = new Ground(1100, canH-710, 100, 10);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  Engine.update(engine);
  background(51);
  image(bg_img,0,0,canW+80,canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  shelf.show();
  ground.show();

  if(collide(fruit,bunny,80)==true)
  {
    eating_sound.play();
    eating_sound.setVolume(1);
    bunny.changeAnimation('eating');
    fruit=null;
  }
  if(collide(fruit,bubble, 40) == true)
  {
    engine.world.gravity.y = -1;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;
  }


   drawSprites();
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}

function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}


