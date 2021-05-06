config.feedImageVersion = "4";

var stringConstants = {
	CROWN_BRONZE: "bronze",
	CROWN_SILVER: "silver",
	CROWN_GOLD: "gold",

	SHARE_THREE_STARS_TITLE: "Angry Birds in Ultrabook™ Adventure",
	SHARE_THREE_STARS_LINE1: "I just beat %1 with %2 and got three stars.",
	SHARE_THREE_STARS_LINE2: "Click now to beat my score!",
	
	SHARE_CROWN_TITLE: "Angry Birds in Ultrabook™ Adventure",
    SHARE_CROWN_LINE1: "I just beat %2 with %3 points and won a %1 crown.",
    SHARE_CROWN_LINE2: "Click now to beat my score!",
	
	SHARE_TOURNAMENT_1ST_TITLE: "Gold Standard!",
	SHARE_TOURNAMENT_1ST_LINE1: "I got %1 points and beat all my friends in the Angry Birds Friends Weekly Tournament.",
	SHARE_TOURNAMENT_1ST_LINE2: "Think you can beat me in the next tournament?",
	
	SHARE_TOURNAMENT_2ND_TITLE: "Silver Bullet!",
	SHARE_TOURNAMENT_2ND_LINE1: "I took second place in the Angry Birds Friends Weekly Tournament with %1 points.",
	SHARE_TOURNAMENT_2ND_LINE2: "Come and challenge me in the next tournament!",
	
	SHARE_TOURNAMENT_3RD_TITLE: "Bronze Medalist!",
	SHARE_TOURNAMENT_3RD_LINE1: "I won the bronze trophy in the Angry Birds Friends Weekly Tournament with %1 points.",
	SHARE_TOURNAMENT_3RD_LINE2: "Come play with me in the next tournament!", 
 
	SHARE_ME_TITLE: "Total destruction!",
	SHARE_ME_LINE1: "I just obliterated %1 with the Mighty Eagle.",
	SHARE_ME_LINE2: "Click play to try the level yourself!",
	
	SHARE_DEFAULT_TITLE: "Angry Birds in Ultrabook™ Adventure",
	SHARE_DEFAULT_LINE1: "I just %1 %2 with a score of %3!",
	SHARE_DEFAULT_LINE2: "Click now to beat my score!",

	SHARE_AVATAR_TITLE: "I made a new avatar!",
	
	INVITE_TITLE: "Select friends to invite",
	INVITE_MESSAGE: "Chirp! Come fling birds and pop cyber pigs in the Angry Birds in Ultrabook™ Adventure.",

	SEND_GIFTS_FRIEND_SELECTOR_TITLE: "Select friends to send mystery gifts to",
	SEND_GIFTS_SINGLE_TITLE: "Send a gift to your friend.",
	SEND_GIFTS_MESSAGE: "%1 just sent you a mystery gift. It may contain an amazing power up. Click to see if you've won one!",
	
	BRAG_TITLE: "Let your friends know you passed them",
	BRAG_MESSAGE: "I beat your high score in %1 in Angry Birds in Ultrabook™ Adventure! Think you can beat mine?"
}

var permissions = {};

function deleteAllRequests() {
// Delete all requests that brought us here, always
    var request_ids = getURLParameter("request_ids");
    if (request_ids && request_ids != "null") {
        var requests = request_ids.split('%2C');
        $.each(requests, function() {
            FB.api(this + '_' + config.userId, "delete", function(response) {
                //console.log("Delete requests response: " + response);
            });
        });
    }
}

function updatePermissions(callback) {
	FB.api('/me/permissions', function (response) {
		permissions = response.data[0];
		if (callback) {
			callback();
		}
	});
}

function placeOrder(productId) {
	forcePause = true;
    // calling the API ...
    var order = {
        method: 'pay',
        order_info: productId,
        purchase_type: 'item',
        dev_purchase_params: {'oscif': true}
    };

	pauseGame();
	setTimeout(function() {
		FB.ui(order, orderCallback);
	}, 100);
}

function onUrl(data) {
	document.getElementById("AngryBirdsFacebook").onUrl(data.path);
}

var widthToggle = true;

var orderCallback = function(data) {
	forcePause = false;
	onUIDialogClose();
	if (data['order_id'] && data["status"] == "settled") {
		document.getElementById("AngryBirdsFacebook").purchaseComplete();

        var url = "/orderinfo/" +  data['order_id'];
        $.get(url, function(data){

        }, "json");
	}
};

function sharePhoto(photoId) {
	pauseGame();
	FB.ui({
		method: "feed",
		link: "http://apps.facebook.com/" + config.appDomain,
		picture: "http://facebook.com/photo.php?fbid=" + photoId,
		name: stringConstants.SHARE_AVATAR_TITLE,
        ref: "avatar"
	}, onUIDialogClose);
}

function shareThreeStars(levelId, levelDisplay, score) {
	pauseGame();
	FB.ui({
		method: "stream.publish",
		user_message_prompt: "",
		message: "message",
        ref: "stars",
		attachment: {
			name: stringConstants.SHARE_THREE_STARS_TITLE.replace("%1", levelDisplay),
			caption: stringConstants.SHARE_THREE_STARS_LINE1.replace("%1", levelDisplay).replace("%2", score),
			description: stringConstants.SHARE_THREE_STARS_LINE2,
			href: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=stars",
			media: [{"type": "flash", 
				"swfsrc": getEmbedUrl(score, levelId),
				"imgsrc": config.serverRoot + "/fb_images/stars.png?v=" + config.feedImageVersion,
				"expanded_width": "398", 
				"expanded_height": "270"}]
		}
	}, onShareUIDialogClose("stars", levelId));
}

function shareFeather(levelId, levelDisplay) {
	pauseGame();
	FB.ui({
		method: "stream.publish",
		user_message_prompt: "",
		message: "message",
        ref: "feather",
		attachment: {
			name: stringConstants.SHARE_ME_TITLE,
			caption: stringConstants.SHARE_ME_LINE1.replace("%1", levelDisplay),
			description: stringConstants.SHARE_ME_LINE2,
			href: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=feather",
			media: [{"type": "flash", 
				"swfsrc": getEmbedUrl(0, levelId),
				"imgsrc": config.serverRoot + "/fb_images/me.png?v=" + config.feedImageVersion,
				"expanded_width": "398", 
				"expanded_height": "270"}]
		}
	}, onShareUIDialogClose("me", levelId));
}


function shareDefault(levelId, levelDisplay, score, completedLevel) {
	pauseGame();
	FB.ui({
		method: "stream.publish",
		user_message_prompt: "",
		message: "message",
        ref: "play",
		attachment: {
			name: stringConstants.SHARE_DEFAULT_TITLE,
			caption: stringConstants.SHARE_DEFAULT_LINE1.replace("%1", (completedLevel ? "beat" : "played")).replace("%2", levelDisplay).replace("%3", score),
			description: stringConstants.SHARE_DEFAULT_LINE2,
			href: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=play",
			media: [{"type": "flash", 
				"swfsrc": getEmbedUrl(score, levelId),
				"imgsrc": config.serverRoot + "/fb_images/default.png?v=" + config.feedImageVersion,
				"expanded_width": "398", 
				"expanded_height": "270"}]
		}
	}, onShareUIDialogClose(completedLevel ? "win" : "lose", levelId));
}

function shareCrown(levelId, levelDisplay, rank, score) {
	if (rank >= 1 && rank <= 3)
	{
		var crown = [stringConstants.CROWN_GOLD, stringConstants.CROWN_SILVER, stringConstants.CROWN_BRONZE][rank - 1];
		pauseGame();
		FB.ui({
			method: "stream.publish",
			user_message_prompt: "",
			message: "message",
            ref: "crown",
			attachment: {
				name: stringConstants.SHARE_CROWN_TITLE,
				caption: stringConstants.SHARE_CROWN_LINE1.replace("%1", crown).replace("%2", levelDisplay).replace("%3", score),
				description: stringConstants.SHARE_CROWN_LINE2,
				href: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=crown",
				media: [{"type": "flash", 
					"swfsrc": getEmbedUrl(score, levelId),
					"imgsrc": config.serverRoot + "/fb_images/crown.png?v=" + config.feedImageVersion,
					"expanded_width": "398", 
					"expanded_height": "270"}]
			}
		}, onShareUIDialogClose("crown", levelId) );
	}
}

function onShareUIDialogClose(shareType, levelId) {
	return function (response) {
		if (response) { // Only track if it was actually shared
			trackEvent10Percent("share", shareType, levelId);
		}
		onUIDialogClose(response);
	};
}

// tournamentRank == "1st" || "2nd" || "3rd"
function shareTournamentRank(tournamentRank, points) {
	pauseGame();
	
	var tournamentMsgName, tournamentCaption, tournamentDescription;
	
	switch(tournamentRank)
	{
		case "1st":
			tournamentMsgName = stringConstants.SHARE_TOURNAMENT_1ST_TITLE;
			tournamentCaption = stringConstants.SHARE_TOURNAMENT_1ST_LINE1;
			tournamentDescription = stringConstants.SHARE_TOURNAMENT_1ST_LINE2;
			break;
		
		case "2nd":
			tournamentMsgName = stringConstants.SHARE_TOURNAMENT_2ND_TITLE;
			tournamentCaption = stringConstants.SHARE_TOURNAMENT_2ND_LINE1;
			tournamentDescription = stringConstants.SHARE_TOURNAMENT_2ND_LINE2;
			break;
		
		case "3rd":
			tournamentMsgName = stringConstants.SHARE_TOURNAMENT_3RD_TITLE;
			tournamentCaption = stringConstants.SHARE_TOURNAMENT_3RD_LINE1;
			tournamentDescription = stringConstants.SHARE_TOURNAMENT_3RD_LINE2;
			break;
	}
	
	FB.ui({
		method: "feed",
		link: "http://apps.facebook.com/" + config.appDomain + "/?ref=tournament",
		picture: config.serverRoot + "/fb_images/tournament"+ tournamentRank +".png?v=" + config.feedImageVersion,
		name: tournamentMsgName,
		caption: tournamentCaption.replace("%1", points),
		description: tournamentDescription,
        ref: "tournament"
	}, onUIDialogClose);
}

function getEmbedUrl(score, levelId) {
	var serverRoot = config.serverRoot.substr(0, 7) == "http://" ? "https://" + config.serverRoot.substr(7) : config.serverRoot;
	return serverRoot + "/flash_embed/AngryBirdsEmbed.swf?assetsUrl=" + serverRoot + "/flash_embed/&score=" + score + "&levelId=" + levelId;
}

function flashInviteFriendsHandler(toUser) {
	var uiObj = { method: "apprequests", 
		filters: ["app_non_users"],
		title: stringConstants.INVITE_TITLE,
		message: stringConstants.INVITE_MESSAGE
	};
	if (toUser) {
		uiObj.to = toUser;
	}
	pauseGame();
	FB.ui(uiObj, onInvitationDialogClose);
}

function onInvitationDialogClose(response) {
	onUIDialogClose(response);
	if(response && response.to) {
		// Here, requests have been sent, facebook gives you the ids of all requests
		var url = "/invitationsent/" + encodeURIComponent(response.to);
		$.get(url);
		trackEvent1Percent("invite", "invitation-sent", null, 0);
    } else {
    	// No requests sent
	}
}

function flashSendGiftToFriends(originName, excludeIDs) {
	pauseGame();
	FB.ui({ method: "apprequests",
		exclude_ids: excludeIDs,
		title: stringConstants.SEND_GIFTS_FRIEND_SELECTOR_TITLE,
		message: stringConstants.SEND_GIFTS_MESSAGE.replace("%1", originName)
	}, onGiftSent);
}

function flashSendGiftFriend(originName, friendId) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendId,
		title: stringConstants.SEND_GIFTS_SINGLE_TITLE,
		message: stringConstants.SEND_GIFTS_MESSAGE.replace("%1", originName)
	}, onGiftSent);
}

function onGiftSent(response) {
    onUIDialogClose(response);
    if (response !== undefined && response.request !== undefined) {
		document.getElementById("AngryBirdsFacebook").giftsSentToUsers(response.to);

        var url = "/giftrequestsent/" + response.request + "/" + encodeURIComponent(response.to);
        $.get(url);
		trackEvent1Percent("gift", "gift-sent", null, 0);
    }
}

/*function flashSendCrownStolen(friendIds, levelName) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendIds,
		message: "Sorry, but I took your crown on level " + levelName + " in Angry Birds. Try to get it back if you can!",
        title: "Let your friends know you passed them",
        data: levelName
	}, onUIDialogClose);
}*/

function flashBrag(friendId, levelId, levelDisplay) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendId,
		title: stringConstants.BRAG_TITLE,
		message: stringConstants.BRAG_MESSAGE.replace("%1", levelDisplay)
	}, function (response) {
        onUIDialogClose(response);
        if (response !== undefined && response.request !== undefined) {
            var url = "/bragrequestsent/" + response.request + "/" +  levelId + "/" + encodeURIComponent(response.to);
            $.get(url);
        }
    });
}

function askForPublishStreamPermission()
{
	if (permissions.publish_stream) {
		document.getElementById("AngryBirdsFacebook").permissionRequestComplete("true");
	} else {
		// No permission, ask for it
		FB.login(
			function(response) {
				// Check to see if the user granted us the permissions after the dialog has been closed
				updatePermissions(function() {
					if (permissions.publish_stream) {
						document.getElementById("AngryBirdsFacebook").permissionRequestComplete("true");
					} else {
						document.getElementById("AngryBirdsFacebook").permissionRequestComplete("false");
					}
				});
			}, {scope:'publish_stream'}
		);
	}
}

function flashDeleteRequest(requestId) {
    FB.api(requestId, 'delete', function(response) {
        // keep calm and carry on
    });
}

 function login(response) {
	 postLogin();
	/*var url = "/login/" +  response.authResponse.userID + "/" + response.authResponse.accessToken +  "/" + response.authResponse.expiresIn;
	$.get(url, function(data){
		if (data.error !== undefined) {
			// TODO handle error
		} else {
			postLogin();
		}
	})*/;
}

function onUIDialogClose(response) {
	resumeGame();
}

function requestAuthorization() {
	window.location.replace("/fbauth/authRequest" + window.location.search);
}

function logout() {
	window.location.replace("/logout");
}

