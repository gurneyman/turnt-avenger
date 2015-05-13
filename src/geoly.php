<?php
/*
  This file should contain constants, functions and other vars that shouldn't be publically accessible.
*/
  require_once('keys.php');
  define( 'IMG_SIZE', '300x300');

  require_once("FoursquareAPI.class.php");


  function getVenues($params){
    $foursquare = new FoursquareAPI(CLIENT_ID, CLIENT_SECRET);

    // Searching for venues nearby Montreal, Quebec
    $endpoint = "venues/explore";

    // Perform a request to a public resource
    $response = $foursquare->GetPublic($endpoint,$params);

    // Returns a list of Venues
    // $POST defaults to false
    $venues = $foursquare->GetPublic($endpoint, $params, $POST=false);
    
    return json_decode($venues);
  }


  function buildImgUrl($venue){
    $img_pre = $venue->venue->featuredPhotos->items[0]->prefix;
    $img_suf = $venue->venue->featuredPhotos->items[0]->suffix;
    return $img_pre . IMG_SIZE . $img_suf;
  }
?>