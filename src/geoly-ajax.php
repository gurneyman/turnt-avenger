<?php 
  require_once('../src/geoly.php');

  $lat = $_GET['lat'];
  $lng = $_GET['lng'];
  $ll  = $lat . "," . $lng;

  // Prepare parameters
  $params = array(
    "ll"=> $ll,
    "venuePhotos"=>1,
    "query"=>"food",
    "limit"=>10
  );

  $venues = getVenues($params);
  $class = "card active";
?>
<?php foreach($venues->response->groups[0]->items as $venue): ?>

<?php
  $img_url = buildImgUrl($venue);
  $venue_name = $venue->venue->name;
  $venue_loc = $venue->venue->location;
  $venue_rating = $venue->venue->rating;
?>
<div class="row col-xs-8 col-sm-4 center-block clearfix <?php echo $class; ?>">
    <div class="col-sm-12">
      <img src="<?php echo $img_url; ?>" alt="">
    </div>
    <div class="venue-info">
      <div class="col-xs-6">
        <span class="venue-name"><?php echo $venue_name; ?></span>
      </div>
      <div class="col-xs-6">
        <span class="venue-rating pull-right">Rating: <?php echo $venue_rating; ?></span>
      </div>
      <!-- Button trigger modal -->
      <div class="col-xs-12">
        <button type="button" class="center-block btn btn-primary" data-toggle="modal" data-target="#myModal<?php echo $venue->venue->id; ?>">
          More Info
        </button>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="myModal<?php echo $venue->venue->id; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel"><?php echo $venue_name; ?></h4>
            </div>
            <div class="modal-body row">
              <address class="col-xs-12">
                <?php 
                  foreach ($venue_loc->formattedAddress as $line) {
                    echo $line . "<br/>";
                  }
                ?>
              </address>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div><!-- End Modal -->
  </div>
</div>
<!--<pre>
  <?php //print_r($venue->venue); ?>
</pre> -->
<?php $class = "card"; ?>
<?php endforeach; ?>