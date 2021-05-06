FB.init({
	appId      : config.appId,
	channelURL : config.channelURL,
	status     : true, // check login status
	cookie     : false, // enable cookies to allow the server to access the session
	oauth      : true, // enable OAuth 2.0
	xfbml      : true,  // parse XFBML
	frictionlessRequests: true,
	hideFlashCallback: onFbVisibilityUpdate
});

// Additional initialization code
FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
		// Store the response parameters
        config.accessToken = response.authResponse.accessToken;
        config.userId = response.authResponse.userID;
		config.tokenExpiresIn = response.authResponse.expiresIn;
		// Login to our own server
        login(response);

		
    } else if (response.status === 'not_authorized') {
		// User is not authorized to use the application, ask the user to authorize
		requestAuthorization();
	} else {
		logout();
	}
});

FB.Canvas.setSize();