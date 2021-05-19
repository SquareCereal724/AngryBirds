





<!DOCTYPE html>
<html>
<head>
<script src="/js/vendor/angular/angular.min.js"></script>

<script>
var text = 
<!-- TODO: Implemented termporarily. REmove when security constraints are not applied  -->
;
var faqApp = angular.module("terms",[]).run(function() {
	// bootstrap app here
}); 
faqApp.constant("text", text);

angular.element(document).ready(function(){
	angular.element(document.getElementById("no-js")).remove(); // remove the js, happens if js is enabled
	angular.bootstrap(document,["terms"]);
});
function FaqController($scope,text){
	$scope.text = text;	
}
</script>
	<link href="gen/images.css" rel="stylesheet"></link>
	<link href="css/popup.css" rel="stylesheet"></link>
</head>



<body class="popup" ng-controller="FaqController" style="direction:???dir???;">
	<div class="game-header header_logos"></div>
	<div class="box">
		<div>Your use of the software is subject to these terms and conditions. By installing, using or accessing the software, you agree to be bound by this agreement. If you do not accept the terms and conditions, do not install, use or access the software.</div>
		<div>Rovio Entertainment Ltd hereby grants you a non-exclusive, non-sublicensable, limited  license to install and to use one copy of the software for your personal, non-commercial use for gameplay on a single computer. You may not reverse engineer, decompile, disassemble, translate, prepare derivative works based on or otherwise modify the software, in whole or in part. All rights not expressly granted herein are reserved by Rovio Entertainment Ltd.</div>
		<div style="font-weight: bold">The software is provided “as is” without any warranties or representations. By way of example there is no warranty of quality, performance or fitness for a particular purpose; or that the software or its performance would be uninterrupted or error-free. </div>
		<div style="font-weight: bold">In no event shall Rovio Entertainment, including its affiliates or partners be liable for any damages except where required by mandatory applicable law.</div>
		<div>This agreement will be governed by the laws of Finland without reference to its choice of law rules. The United Nations Convention for the International Sale of Goods shall not apply. You agree that you may bring claims against Rovio Entertainment Ltd and its partners only in your individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.  </div>
		<div>Angry Birds TM © 2009-2014 Rovio Entertainment Ltd.</div>
	<div>
</body>
</html>



