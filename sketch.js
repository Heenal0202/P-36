var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed,feed

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTimeRef=database.ref('FeedTime');
  feedTimeRef.on("value",function(data){
lastFed=data.val()

  });
 console.log(lastFed)
  //write code to display text lastFed time here
  textSize(20)
  fill("white")
  if(lastFed>=12){
    text("Feed Time:"+lastFed%12+"PM",600,95)

  }

  else if(lastFed==0){
    text("Feed Time:12 AM",600,95)
  }

  else{
    text("Feed Time:"+lastFed+"AM",600,95)
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
  foodObj.deductFood();
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }

  )

  //write code here to update food stock and last fed time
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

/*function readTime(data){
lastfed=data.val();
console.log(lastFed)
}
*/