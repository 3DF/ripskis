<?php
require __DIR__ . '/vendor/autoload.php';

//header('Content-Type: text/plain');
header('Content-Type: text/html');

//$videoPath = "https://ybcledejiqybeyogdgyr.supabase.co/storage/v1/object/public/videos/bong.mp4"; 
$videoPath = "https://ybcledejiqybeyogdgyr.supabase.co/storage/v1/object/public/videos/IMG_4635.mov";
?>

<html>
<head>
	<title>Ripskis</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<link rel="icon" type="image/x-icon" href="https://ybcledejiqybeyogdgyr.supabase.co/storage/v1/object/public/videos/favicon.ico">
	<link rel="stylesheet" type="text/css" href="base.css">
	<script type="module" src="script.js"></script>
</head>
<body>
	<h1>Ripskis</h1>
	<h2>The best bong hits from around the universe</h2>
	<br/>
	<video controls>
		<source src="<?php echo $videoPath; ?>" type="video/mp4">
		Your browser does not support the video tag.
	</video>
	<br/>
	<br/>
	<input type="file" id="videoInput" accept="video/*">
    <button id="uploadButton">Upload Video</button>
</body>
</html>
