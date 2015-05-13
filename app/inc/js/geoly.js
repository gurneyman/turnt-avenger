var STACK = document.getElementById('stack');


getRestaurantList();


var CARDS = STACK.children;
var LIKED = document.getElementById('likedStack');
var FEEDBACK = document.getElementById('feedback');
var LIKE_GESTURES    = "swipeleft";
var DISLIKE_GESTURES = "swiperight";


handleSwipes();



/*
  Precondition: STACK element must exist 
*/
function getRestaurantList(){
  navigator.geolocation.getCurrentPosition(function(position){
    callYelp(position);
  });
}

/*********************
    Event Handling
**********************/
// TODO: Add in desktop event handling
// Keys and left/right mouse buttons
/*
    1) Init hammer.js
    2) Handle any swipes
*/
function handleSwipes(){
  var mc = initHammer();

  mc.on(LIKE_GESTURES, function(ev) {
      dislike(ev);
  });

  mc.on(DISLIKE_GESTURES, function(ev) {
      like(ev);
  });
}

function initHammer(){
  var myElement = document.getElementById('screen');
  // create a simple instance
  // by default, it only adds horizontal recognizers
  return new Hammer(myElement);
}

function dislike(ev){
  if(CARDS[0]){
    $(CARDS[0]).animate({
      left: "-4000px"
    }, 500, function(){
      CARDS[0].remove(); // Destroy card
      moveToNextCard();
    });
    console.log("No");
    FEEDBACK.innerHTML = "Noped";
    FEEDBACK.classList.remove('bg-success');
    FEEDBACK.classList.add('bg-danger');
  }
  
}

function like(ev){
  if(CARDS[0]){
    $(CARDS[0]).animate({
      left: "4000px"
    }, 500, function(){
      LIKED.appendChild(CARDS[0]); // Add to liked list
      $(this).css({'position': 'static'});
      moveToNextCard();
    });
    console.log("Yes");
    FEEDBACK.innerHTML = "Yeped";
    FEEDBACK.classList.remove('bg-danger');
    FEEDBACK.classList.add('bg-success');
  }
  
}

function moveToNextCard(cards){
  if(CARDS[0]){
    CARDS[0].classList.toggle('active');
  }else{
    showLiked();
  }
  /*
  var activeCardIndex = findActive(cards);
  cards[activeCardIndex].classList.toggle('active');
  if(cards[activeCardIndex + 1]){
    cards[activeCardIndex + 1].classList.toggle('active');
  }else{
    // Restart cycle... I think I'll fetch next 20 restaurants here.
    cards[0].classList.toggle('active');
  }*/
}
function showLiked(){
  LIKED.classList.toggle('active');
  document.getElementById('instructions').innerHTML = "<h2>What You Liked</h2>";
}
function findActive(cards){
  for(var i = 0; i < cards.length; i++){
    if(hasClass(cards[i], 'active')){
      return i;
    }
  }
  console.log('Error in findActive()');
  
}

// hasClass, takes two params: element and classname
// From https://www.snip2code.com/Snippet/24493/has-class-function---vanilla-JS--Check-i
function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

/*************************
  AJAX
*************************/

function getXMLHttp()
{
  var xmlHttp

  try
  {
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    //Internet Explorer
    try
    {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e)
      {
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}

function callYelp(pos)
{
  var xmlHttp = getXMLHttp();
  var lat = pos.coords.latitude;
  var lng = pos.coords.longitude;

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      HandleResponse(xmlHttp.responseText);
    }
  }

  xmlHttp.open("GET", "../src/geoly-ajax.php?lat=" + lat + "&lng=" + lng, true); 
  xmlHttp.send(null);
}

function HandleResponse(response)
{
  document.getElementById('stack').innerHTML = response;
}

/**************************
      Geolocation
**************************/
function getLocation(){
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("GEOLOCATION!");
} else {
  /* geolocation IS NOT available */
  console.log("No geolocation");
}
}