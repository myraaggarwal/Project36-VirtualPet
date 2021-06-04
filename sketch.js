var dog,sadDog,happyDog;
var database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed; 
var lastFed;
var hour;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup(){
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food();

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  FeedDog=createButton("Feed Dog");
  FeedDog.position(700,95);
  FeedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var FeedTime = database.ref('FeedTime');
  FeedTime.on("value",function(data){
    FeedTime= data.val();
 });

  
  //write code to display text lastFed time here
  fill("white");
  if(lastFed>=12){
    text("Last Fed : 12 PM",350,30)
  }else if(lastFed==12){
   text("Last Fed:12 AM",350,30)
  }else{
   text("Last Fed : 12 AM",350,30)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  //hour = hour();
  //write code here to update food stock and last fed time
  var foodStock= foodObj.getFoodStock();
  if(foodStock <=0 ){
    foodObj.updateFoodStock(foodStock*0);
  } else {
    foodObj.updateFoodStock(foodStock-1);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
