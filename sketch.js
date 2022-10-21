const Engine = Matter.Engine
const World = Matter.World
const Body = Matter.Body
const Bodies = Matter.Bodies
var world,engine;
var player,idleimg,runimg,jumpimg,runleftimg,jumpleftimg
var p1,p1,p3,p4,p5;
var ladder1,ladder2
var s1
var isJump = true
var pos = [[533,494],[890,402],[336,402],[620,307],[354,209]]
var score = 0

function preload()
{
   bg = loadImage("bg.png");
   idleimg = loadAnimation("Assets/Idle.png")
   runimg = loadAnimation("Assets/Run__000.png","Assets/Run__001.png","Assets/Run__002.png","Assets/Run__003.png","Assets/Run__004.png","Assets/Run__005.png","Assets/Run__006.png","Assets/Run__007.png","Assets/Run__008.png","Assets/Run__009.png")
   jumpimg = loadAnimation("Assets/Jump__000.png","Assets/Jump__001.png","Assets/Jump__002.png","Assets/Jump__003.png","Assets/Jump__004.png","Assets/Jump__005.png","Assets/Jump__006.png","Assets/Jump__007.png","Assets/Jump__008.png","Assets/Jump__009.png")
   runleftimg = loadAnimation("Assets/Run_000 copy.png","Assets/Run_001 copy.png","Assets/Run_002 copy.png","Assets/Run_003 copy.png","Assets/Run_004 copy.png","Assets/Run_005 copy.png","Assets/Run_006 copy.png","Assets/Run_007 copy.png","Assets/Run_008 copy.png","Assets/Run_009 copy.png")
   jumpleftimg = loadAnimation("Assets/Jump_000.png","Assets/Jump_001.png","Assets/Jump_002.png","Assets/Jump_003.png","Assets/Jump_004.png","Assets/Jump_005.png","Assets/Jump_006.png","Assets/Jump_007.png","Assets/Jump_008.png","Assets/Jump_009.png")
}

function setup()
{
   createCanvas(1000,600)
   engine = Engine.create()
   world = engine.world

   createPlatform()

   coinGroup = new Group()

   createCoins()

   player = createSprite(340,490,20,20)
   player.scale=0.10
   player.addAnimation("idle",idleimg)
   player.addAnimation("runright",runimg)
   player.addAnimation("jump",jumpimg)
   player.addAnimation("runleft",runleftimg)
   player.addAnimation("jumpleft",jumpleftimg)

}
function draw()
{
    background(255)
    push()
    textSize(30)
    fill(0)
    text(score,835,40)
    pop()
    Engine.update(engine)
    
    imageMode(CENTER)
    image(bg,width/2,height/2,width,height)
    text(mouseX+","+mouseY,mouseX,mouseY)

    if(!player.isTouching(ladder1))
    {
        player.velocityY +=0.2
    }



    player.collide(p1)
    player.collide(p2)
    player.collide(p3)
    player.collide(p4)
    player.collide(p5)


    coinGroup.overlap(player,increaseScore)

    /*if(player.collide(p1)||player.collide(p2))
    {
        isJump = true
    }*/


    colliding()


    console.log(player.y)


    drawSprites()
}

function keyPressed()
{
    if(keyCode===RIGHT_ARROW)
    {
    player.changeAnimation("runright")
    player.velocityX = 4
    }

    if(keyCode===UP_ARROW&&player.y>490)
    {

    if(player.isTouching(ladder1)||player.isTouching(ladder2))
    {
        player.changeAnimation("idle")
        player.y-=10
    }else{
        player.changeAnimation("jump")
        isJump=false
        player.velocityY = -5
    }}
    else if(keyCode===UP_ARROW&&player.y>407)
    {

    }

    if(keyCode===LEFT_ARROW)
    {
        player.changeAnimation("runleft")
        player.velocityX = -4
    }

    if(player.velocityX===-4&&player.velocityY===-5)
    {
        player.changeAnimation("jumpleft")
    }
}

function keyReleased()
{
    player.changeAnimation("idle")
    player.velocityX = 0
}

function createPlatform()
{
    p1 = createSprite(290,531,160,10)
    p1.visible = true

    p2 = createSprite(537,531,150,10)
    p2.visible = true

    p3 = createSprite(822,531,180,10)
    p3.visible = true

    p4 = createSprite(355,438,480,10)
    p4.visible = true

    p5 = createSprite(770,437,30,10)
    p5.visible = false

    ladder1 = createSprite(120,380,10,80)
    ladder1.visible = false

    ladder2 = createSprite(889,475,10,80)
    ladder2.visible = true

    s1 = createSprite(676,533,28,28)
    s1.visible=false
}

function colliding()
{
    if(player.isTouching(s1))
    {
        player.x=340
        player.y=490
    }
}

function createCoins()
{
    for(var i = 0;i<=4;i++)
    {
        coin = createSprite(pos[i][0],pos[i][1],20,20)
        coinGroup.add(coin)
    }
}

function increaseScore(c)
{
    c.destroy()
    score = score+5
}

//Platform 1: 284 533
//Platform 2: 537 533
//Platform 4: 375 433
//Platform 3: 822 530
//Ladder1: 120 380
//s1: 676 533
//Platform 5: 735 437
//Ladder2: 889 475