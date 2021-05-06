/*
 *  Cross browser Mouse wheel stopper and Mac MouseWheel events forwarding to Flash
 *  
 *  Requires jQuery 1.6 or newer
 *  Requires swfwheel.js for Mac wheel events!
 */


$(document).ready(function(e) {

    var handleWheel = function (wheelEvent) {
    		
    		//IE fix
    		if(!wheelEvent)
    		{
    			wheelEvent = window.event;
    		}
    		
    		if(wheelEvent.stopPropagation)
    		{
            	wheelEvent.stopPropagation();
            }
            
            if(wheelEvent.preventDefault)
            {
            	wheelEvent.preventDefault();
            }
            
            //IE fix
            wheelEvent.returnValue = false;
    };
    
    var flashArea = $("#flashContent")[0];
	
    if (flashArea) {
        if (flashArea.addEventListener)
		{
			flashArea.addEventListener("mousewheel", handleWheel, false);
            flashArea.addEventListener("DOMMouseScroll", handleWheel, false);
        }
		else
		{
            if (flashArea.attachEvent)
			{
                flashArea.attachEvent("onmousewheel", handleWheel);
            }
        }
    }
});


