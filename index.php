<?php
require __DIR__ . '/vendor/autoload.php';

use Cowsayphp\Farm;

header('Content-Type: text/plain');

$text = "Hi!  I'm the Ripskis cow.  This is the future home of Ripskis.  The best bonghits from around the universe!";
//$text = "Set a message by adding ?message=<message here> to the URL";

if(isset($_GET['message']) && $_GET['message'] != '') {
	$text = htmlspecialchars($_GET['message']);
}

$cow = Farm::create(\Cowsayphp\Farm\Cow::class);
echo $cow->say($text);
