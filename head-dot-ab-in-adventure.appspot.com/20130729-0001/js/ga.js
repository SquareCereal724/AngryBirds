var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23082676-25']); // TODO configure GA to use the live FB app
/*_gaq.push(['_setSampleRate', '100']);*/ // No this level sampling, using our own implementation
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var sample1Percent = Math.random();
var sample10Percent = Math.random();

/*
 This is our own down sampling
*/
function trackEvent10Percent(eventCategory, eventAction, eventLabel, eventValue) {
	if (sample10Percent <= 0.1)
	{
		trackEvent(eventCategory, eventAction + " x 10", eventLabel, eventValue);
	}
}

/*
 This is our own down sampling
*/
function trackEvent1Percent(eventCategory, eventAction, eventLabel, eventValue) {
	if (sample1Percent <= 0.01)
	{
		trackEvent(eventCategory, eventAction + " x 100", eventLabel, eventValue);
	}
}


/*
 Tracks the event in Google Analytics.

 @eventCategory The category of the event as string. e.g. 'Links'. Cannot be empty.
 @eventAction The action of the event as string. e.g. 'Button'. Optional.
 @eventLabel The label of the event as string. e.g. 'MyButton'. Optional.
 @eventValue An integer value. Optional.
 */
function trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
    if (eventCategory == null) {
        return;
    }
    if (eventAction == null) {
        eventAction = '';
    }
    if (eventLabel == null) {
        eventLabel = '';
    }

    if (eventValue == null) {
        _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel]);
    } else {
        _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue]);
    }
}
