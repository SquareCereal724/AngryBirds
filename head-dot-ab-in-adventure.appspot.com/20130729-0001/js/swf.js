var pausePending = false;
var gameIsPaused = false;
var forcePause = false;

var alreadyTracked = false;

function onFlashLoadComplete() {
	FB.Canvas.setDoneLoading();
}

function onFbVisibilityUpdate(params) {
	if (params.state == "opened") {
		pauseGame();
	} else {
		resumeGame();
	}
}

function getURLParameter(name) {
	return decodeURI(
		(RegExp(name + "=" + "(.+?)(&|$)").exec(location.search)||[,null])[1]
	);
}

function pauseGame() {
	if (pausePending || gameIsPaused)
	{
		return; // We're already pausing
	}
	pausePending = true;
	gameIsPaused = true;

	document.getElementById("AngryBirdsFacebook").pause();

	document.getElementById('screenshot').style.display = 'none';
	document.getElementById('flashContent').style.top = '-10000px';
	document.getElementById('imageContent').style.top = '';
	document.getElementById('pauseLoading').style.display = '';
}

function flashScreenshotReadyHandler(pauseScreenBase64) {
	// If the user resumes before we get the screenshot, do nothing.
	if (pausePending) {
		pausePending = false;
	} else {
		return;
	}

	var imageContent = document.getElementById("imageContent");
	var flashContent = document.getElementById("flashContent")
	var screenshot = document.getElementById("screenshot");

	document.getElementById('pauseLoading').style.display = 'none';

	var imageData = "data:image/jpeg;base64," + pauseScreenBase64;

	screenshot.src = imageData.toString();
	screenshot.style.display = '';
}

function resumeGame() {
	if (!gameIsPaused || forcePause) {
		return;
	}
	
	document.getElementById('flashContent').style.top = '';
	document.getElementById('imageContent').style.top = '-10000px';
	document.getElementById('screenshot').style.display = 'none';

	document.getElementById("AngryBirdsFacebook").resume();
	pausePending = false;
	gameIsPaused = false;
}

function flashRequestPauseHandler() {
	pauseGame();
}

function loadMainClient(swfobject) {
	var params = {
		allowScriptAccess: "always",
		wmode: "direct",
		allowFullScreen: "true",
		bgcolor: "#000000"
	};

	var attributes = {
		id: "AngryBirdsFacebook",
		name: "AngryBirdsFacebook"
	};

	var flashvars = {
		assetsUrl: config.assetsUrl,
		serverVersion: config.serverVersion,
		serverRoot: config.serverRoot,
		accessToken: config.accessToken,
		userId: config.userId,
		tokenExpiresIn: config.tokenExpiresIn
	};
	
	if (config.levelId) { // If we were brought here by a request that points to a level
		// Send it to the flash client
		flashvars.levelId = config.levelId;
	}
	swfobject.embedSWF(
			config.assetsUrl + "AngryBirdsIntelUltraBook.swf", "flashHolder",
			"100%", "570",
			"11.0.0", config.assetsUrl + "playerProductInstall.swf",
			flashvars, params, attributes
	);
	// If the flash was not embedded, this will display the message for the user to upgrade
	swfobject.createCSS("#flashHolder", "display: block;");
	// Move imageContent up dynamically so it can be put back to default by setting it to ''
	document.getElementById('imageContent').style.top = '-10000px';
	// Unhide it
	document.getElementById('imageContent').style.display = 'block';
	trackEvent10Percent("flash", "embed");
}

function postLogin() {
    var request_ids = getURLParameter("request_ids");

    if (request_ids && request_ids != "null") // If we have been forwarded to the game via a request
	{
        var requests = request_ids.split('%2C');
        if (requests.length == 1) {
            // Download the request from facebook to check it, if we only have one
            var fullRequestId = request_ids + '_' + config.userId;
            var url = "https://graph.facebook.com/" + fullRequestId + "?access_token=" + config.accessToken;
            $.get(url, null, "json").complete(
				function(response) { // On downloaded
					config.levelId = response.data;
					// Now we have the level to load, so we load the game
					loadMainClient(swfobject);
					deleteAllRequests();
					updatePermissions();
				}
			);
        } else {
            loadMainClient(swfobject);
			deleteAllRequests();
			updatePermissions();
        }

        
    } else {
		// No requests, load the game immediately
		loadMainClient(swfobject);
		updatePermissions();
	}
}

function flashGetAccessToken() {
	return config.accessToken;
}

function flashGetUserId()
{
	return config.userId;
}


// Tracking pixel
function playClicked() {
	doPixelTrack();
}

function doPixelTrack() {
	if (alreadyTracked)
	{
		return;
	}

	alreadyTracked = true;

	var pix = document.createElement('img');
	pix.width = pix.height = 1;
	pix.src = "https://47.xg4ken.com/media/redir.php?track=1&token=03528881-38a4-4bc5-809d-4787b7060aad&type=game_played&val=0.0&orderId=&promoCode=&valueCurrency=USD";
	document.body.appendChild(pix);
}