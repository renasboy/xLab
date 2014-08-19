<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="chrome=1, IE=9">
    <meta name="format-detection" content="telephone=no">
    <meta name="HandheldFriendly" content="true">
    <meta name="HandheldFriendly" content="true">
    <meta name="robots" content="noindex,nofollow">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="x-lab Colors">
    <link rel="apple-touch-icon" href="img/apple-touch-icon.png">
    <title>x-lab Colors</title>
    <?php
    $path = '../phaser';
    include($path . '/build/config.php');
    ?>
    <script src="js/Boot.js"></script>
    <script src="js/Preloader.js"></script>
    <script src="js/MainMenu.js"></script>
    <script src="js/ColorWheel.js"></script>
    <script src="js/Tube.js"></script>
    <script src="js/Bottle.js"></script>
    <script src="js/Level.js"></script>
    <script src="js/Game.js"></script>
    <style>
    @font-face {
        font-family: FontBold;
        src: url("fonts/Dosis-Bold.otf");
    }
    @font-face {
        font-family: FontExtraBold;
        src: url("fonts/Dosis-ExtraBold.otf");
    }
    html, body {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: auto;
    }
    </style>
</head>
<body>

<div id="game" style="text-align: center;"></div>

<script type="text/javascript">
(function () {
    var width = window.innerWidth;
    if (width <= 600) {
        var width = window.innerWidth;
        var height = window.innerHeight;
    }
    else {
        var width = 480;
        var height = 320;
    }
    var width = 1200;
    var height = 640;
    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game');
    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('Game', Game.Game);
    game.state.start('Boot');
    window.scrollTo(0, 1);
})();
</script>

</body>
</html>
