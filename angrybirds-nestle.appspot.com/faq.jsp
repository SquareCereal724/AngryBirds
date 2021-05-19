





<!DOCTYPE html>
<html>
<head>
<script src="/js/vendor/angular/angular.min.js"></script>

<script>
var text = 
<!-- TODO: Implemented termporarily. REmove when security constraints are not applied  -->
;
var faqApp = angular.module("faq",[]).run(function() {
	// bootstrap app here
}); 
faqApp.constant("text", text);

angular.element(document).ready(function(){
	angular.element(document.getElementById("no-js")).remove(); // remove the js, happens if js is enabled
	angular.bootstrap(document,["faq"]);
});
function FaqController($scope,text){
	$scope.text = text;	
}
</script>
	<link href="gen/images.css" rel="stylesheet"></link>
	<link href="css/popup.css" rel="stylesheet"></link>
</head>




<body class="popup" ng-controller="FaqController" style="direction:ltr;">
	<div class="game-header header_logos"></div>
	<div class="box">
		<h2>1. What are the minimum requirements for my computer?</h2>
		<div>The game requires Flash 11 to run. Flash 11 has its own requirements. </div>
		<div>Windows:</div>
		<ul>
			<li>2.33GHz or faster x86-compatible processor, or Intel® Atom™ 1.6GHz or faster processor for netbooks</li>
			<li>Microsoft® Windows® XP (32-bit), Windows Server® 2003 (32-bit), Windows Server 2008 (32-bit), Windows Vista® (32-bit), Windows 7 (32-bit and 64-bit)</li>
			<li>Internet Explorer 8.0 and above, Mozilla Firefox 4.0 and above, Google Chrome, Safari 5.0 and above, Opera 11</li>
			<li>1GB of RAM; 128MB of graphics memory</li>
		</ul>
		<div>Mac OS:</div>
		<ul>
			<li>Intel Core™ Duo 1.33GHz or faster processor</li>
			<li>Mac OS X v10.6 or v10.7</li>
			<li>Safari 5.0 and above, Mozilla Firefox 4.0 and above, Google Chrome, Opera 11</li>
			<li>1GB of RAM; 128MB of graphics memory</li>
		</ul>
		<div>Linux:</div>
		<ul>
			<li>2.33GHz or faster x86-compatible processor, or Intel Atom 1.6GHz or faster processor for netbooks</li>
			<li>Red Hat® Enterprise Linux (RHEL) 5.6 or later (32-bit and 64-bit), openSUSE® 11.3 or later (32-bit and 64-bit), Ubuntu 10.04 or later (32-bit and 64-bit)</li>
			<li>Mozilla Firefox 4.0 or Google Chrome</li>
			<li>1GB of RAM; 128MB of graphics memory</li>
		</ul>

		<h2>2. What kind of nicknames can I use?</h2>
		<div>Your nickname is used when you log in to the game and achieve a position in the leaderboards. Feel free to pick any nickname you want, but remember that it has to be unique and a minimum of 5 and maximum of 10 characters. Please, do not use any personal information, like your real name or phone number. Rovio may delete user accounts containing improper language without a warning.</div>

		<h2>3. Can I log in to any country version of the game?</h2>
		<div>Yes, but not with the same account. The language of the game is based on the country to which you are registered. To log in to other country versions, you will need to create a new account.</div>

		<h2>4. I forgot my nickname and/or password; what should I do?</h2>
		<div>You should register again. Next time, write down your nickname and password in order to avoid this. There is no system for recovering the nickname or password.</div>

		<h2>5. How do the leaderboards work?</h2>
		<div>There are two types of leaderboard:</div>
		<div>1) Under the left tab in the sidebar is the global leaderboard for each level, which keeps track of the best scores in the world for these levels.</div>
		<div>2) Under the right tab in the sidebar is your local leaderboard, where you see the best scores of your area. Each area has its own local leaderboard.</div>

		<div>Both leaderboards only show the top 100 players. If you manage to gain a position in one of the leaderboards, your nickname will be displayed there in red. </div>

		<div>The leaderboards will reset weekly at 00:00 UTC. If you wish to keep your nickname in the leaderboards you should achieve a new top score! The game will remember your progress and star counts.</div>

		<h2>6. Can I win something?</h2>
		<div>There are no prizes awarded in this game.</div>

		<h2>7. The game crashed; what should I do?</h2>
		<div>Try refreshing the page. If this doesn’t work, try restarting your browser.</div>

		<h2>8. How long can I keep playing the game?</h2>
		<div>The game will be available until 31.3.2015.</div>
	</div>
</body>
</html>



