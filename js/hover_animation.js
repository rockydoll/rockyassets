/*

Main Javascript for jQuery Realistic Hover Effect

*/

/* =Realistic Navigation
============================================================================== */

	// Begin jQuery
	
	$(document).ready(function() {

	
	
		// Animate buttons
		
		$("#social_links li,.home_blog_pic,#portfolio_listing li,#top_scroll").hover(function() {
			var e = this;
		    $(e).find("a").stop().animate({ marginTop: "-14px" }, 250, function() {
		    	$(e).find("a").animate({ marginTop: "-10px" }, 250);
		    });
		},function(){
			var e = this;
		    $(e).find("a").stop().animate({ marginTop: "4px" }, 250, function() {
		    	$(e).find("a").animate({ marginTop: "0px" }, 250);
		    });
		});
						
	// End jQuery
	
	});