<?php
require __DIR__ . '/vendor/autoload.php';

use Cowsayphp\Farm;

//header('Content-Type: text/plain');
header('Content-Type: text/html');


$text = "Hi!  I'm the Ripskis cow.  This is the future home of Ripskis.  The best bonghits from around the universe!";
//$text = "Set a message by adding ?message=<message here> to the URL";

if(isset($_GET['message']) && $_GET['message'] != '') {
	$text = htmlspecialchars($_GET['message']);
}

$cow = Farm::create(\Cowsayphp\Farm\Cow::class);
//echo $cow->say($text);

$videoPath = "https://ybcledejiqybeyogdgyr.supabase.co/storage/v1/object/public/videos/bong.mp4"; 
?>

<html>
<head></head>
<body>
<video width="640" height="360" controls>
  <source src="<?php echo $videoPath; ?>" type="video/mp4">
  Your browser does not support the video tag.
</video>
</body>
</html>
