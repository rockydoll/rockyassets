 var topRange      = 200,  // measure from the top of the viewport to N pixels down
     edgeMargin    = 150,   // margin above the top or margin from the end of the page
	 positioningOffset = 0,
	 positioningOffsetVar = 0;
     animationTime = 500, // time in milliseconds
     contentTop = [];
var isMatch = false
var isHeaderOpen = true;
var isFooterOpen = true;

$(document).ready(function(){
	//positioningOffset = (-140 - positioningOffsetVar) * -1;
	//
	if($(".section:not(:first-child)").legth > 0){
		positioningOffsetVar = 120 - $(".section:not(:first-child)").css("padding-top").replace("px", "") + 2;
	}
	
	//console.debug(positioningOffset);
	positioningOffset = positioningOffsetVar;
	//
	var is_closed_admin_bar = false;
	//console.log($('#wpadminbar').length);
	if($('#wpadminbar').length > 0)
	{
		$('.single_post, .single').css('padding-top', '122px');
		
		$('.section').eq(0).css('margin-top', '-28px');
		
		function hideAdminBar()
		{
			$('#wpadminbar').stop(true, true).animate({
				marginTop: -28
			}, 500);
			$('#adminbar_opener').stop(true, true).animate({
				top: 0
			}, 500);
			is_closed_admin_bar = true;
		}
		
		setTimeout(hideAdminBar, 1000);
		
		$('body').append('<div id="adminbar_opener"></div>');
		
		$('#adminbar_opener').click(function(){
			if(is_closed_admin_bar){
				$('#wpadminbar').stop(true, true).animate({
					marginTop: 0
				}, 500);
				$('#adminbar_opener').stop(true, true).animate({
					top: 28
				}, 500);
				is_closed_admin_bar = false;
			}else{
				$('#wpadminbar').stop(true, true).animate({
					marginTop: -29
				}, 500);
				$('#adminbar_opener').stop(true, true).animate({
					top: 0
				}, 500);
				is_closed_admin_bar = true;
			}
		});
		
	}
	//
	var submenu,
	animTime = 200;

	$('#nav a:not(:#nav ul a)').hover(
		function(){
			$('#nav ul').fadeOut(animTime);
			submenu = $(this).parent().find('ul');
			submenu.stop(true, true).fadeIn(animTime);
		}, 
		function(){
			//submenu.hide();
		});
		$('#nav ul').hover(
		function(){}, 
		function(){
			$(this).stop(true, true).fadeOut(animTime);
		});
		
	$('.sub-menu a').wrapInner("<span></span>");
	
	var _W = $('.sub-menu').outerWidth();
	$('.sub-menu').css('width', _W+10);
	
	$('.sub-menu a').hover(
		function(){
			
			$(this).find('span').animate({
				marginLeft: 5
				
			}, animTime);
			//
			$(this).animate({
				backgroundPosition: '-2px 1px'
			}, animTime);
			//
		}, 
		function(){
			$(this).animate({
				backgroundPosition: '-13px 1px'
			}, animTime);
			//
			$(this).find('span').animate({
				marginLeft: 0
			}, animTime);
			//
		}
	);
	//-----------------------------------------------
	$(".toggle_container").hide(); 
	//
	$("h2.trigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false;
	});
	var the_item_width = $('.toggle_container').parent().width();
	$('.toggle_container').css('width', the_item_width);
	//
	//--------------------------------------------------------------------------
	$('.section').each(function()
	{
		var section_id = $(this).attr('id');
		$('#nav li:not(:.sub-menu li)').each(function()
		{
			$(this).removeClass('current');	
			var nav_id = $(this).find('a').attr('href').substring(1);
			if(section_id == nav_id)
			{
				//$(this).addClass('current');
			}
		});
	});
	if($('.section').length > 1)
	{
		$('#nav li:first-child:not(:.sub-menu li)').addClass('current');
	}
	//Social icons hover animation
	$('#social_icons li').hover(function() {
		$(this).stop().animate({ top: -17 }, 200);
	},
	function() {
		$(this).stop().animate({ top: 0 }, 200);
	})
	//---------------------------------------------------------------------
	
	//---------------------------------------------------------------------
	$('.arrow_container').css( {backgroundPosition: "0px -36px"} );
	function enableFooterClick()
	{
		$('.footer_arrow').click(function(){
		//console.log(isFooterOpen);
			if(isFooterOpen == false)
			{
				$('.footer_arrow').animate({
					marginTop: 4
				}, 500);
				
				$('#footer').stop().animate({
					bottom: 0
				}, 500)
				isFooterOpen = true;
				$('.arrow_container').stop().animate({
					backgroundPosition: '0px -36px'
				}, 500);
			}else{
				$('.footer_arrow').delay(500).animate({
					marginTop: -25
				}, 500);
				
				$('#footer').stop().animate({
					bottom: -29
				}, 500)
				isFooterOpen = false;
				$('.arrow_container').stop().animate({
					backgroundPosition: '0px 0px'
				}, 500);
			}
		})
	}
	setTimeout(function()
	{
		$('#footer').stop().animate({
			queue: false,
			bottom: -29
		}, 500)
		$('.footer_arrow').delay(500).animate({
				marginTop: -25
			}, 500, function(){
				enableFooterClick();
			});
			
		$('.arrow_container').stop().animate({
			backgroundPosition: '0px 0px'
		}, 500)
		isFooterOpen = false;
	}, 1500);
	
	//================================
	$('body').mousemove(function(){
		if(isHeaderOpen == false)
		{
			$('#header').animate({
				top: 0
			}, 500, function(){
				//$('#header').stop();
			});
			positioningOffset = positioningOffsetVar;
			isHeaderOpen = true;
			
			if($.browser.opera)
			{
				$("html:not(:animated)").stop().animate({ scrollTop: $(window).scrollTop() - $('#header').height() + 35}, animationTime );
			}
			else
			{
				$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: $(window).scrollTop() - $('#header').height() + 35}, animationTime );
			}
		}
	});
	//===============================
	if($('#image-grid').length > 0)
	{
		$('.projects').each(function(i)
		{
			$('.image-grid_' + (i+1) ).fGallery('.filter_' + (i+1) );
		})
	}
	
	$("a.zoom").fancybox({
		'opacity'		: true,
		'overlayColor'	: '#000',
		'overlayOpacity' : 0.8,
		'centerOnScroll' : false,
		'titlePosition'	: 'over',
		'onComplete'	:	function() {
			$("#fancybox-title").hide();
			$("#fancybox-wrap").hover(function() {
				$("#fancybox-title").show();
			}, function() {
				$("#fancybox-title").hide();
			});
		}
	});
	$("a.vimeo").click(function(){
		$.fancybox({
			'opacity'		: true,
			'overlayColor'	: '#000',
			'overlayOpacity' : 0.8,
			'centerOnScroll' : false,
			'titlePosition'	: 'over',
			'href'          : this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
			'type'          : 'swf'
		});
		return false;
	})
	
	$("a.youtube").click(function(){
		$.fancybox({
			'opacity'		: true,
			'overlayColor'	: '#000',
			'overlayOpacity' : 0.8,
			'centerOnScroll' : false,
			'titlePosition'	: 'over',
			'href'          : this.href.replace(new RegExp("watch\\?v=","i"),'v/'),
			'type'          : 'swf',
			'width'			: 680,
			'height'		: 400
		});
		return false;
	})
	
	// Set up content an array of locations
	$('#nav').find('a:not(:.sub-menu a)').each(function()
	{
		if($( $(this).attr('href') ).length > 0)
		{
			contentTop.push( $( $(this).attr('href') ).offset().top );
		}
	});
	// adjust navigation menu
	$(window).scroll(function(){
		
		var winTop = $(window).scrollTop(),
		bodyHt = $(document).height(),
		vpHt = $(window).height() + edgeMargin;  // viewport height + margin
		
		$.each( contentTop, function(i,loc){
			if ( ( loc > winTop - edgeMargin && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) ){
				$('#nav li:not(:.sub-menu li)').removeClass('current').eq(i).addClass('current');
				currentSection = i;
				s = i;
			}
		})
	})
	//
	
	//
	var nameVal = $('#name').val();
	
	$('#name').focus(function(){
		if($(this).val() == nameVal)
		{
			$(this).val('');
		}
	});
	
	$('#name').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(nameVal);
		}
	});
	//==================================================================
	var emailVal = $('#email').val();
	
	$('#email').focus(function(){
		if($(this).val() == emailVal)
		{
			$(this).val('');
		}
	});
	
	$('#email').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(emailVal);
		}
	});
	//==================================================================
	var subjectVal = $('#subject').val();
	
	$('#subject').focus(function(){
		if($(this).val() == subjectVal)
		{
			$(this).val('');
		}
	});
	
	$('#subject').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(subjectVal);
		}
	});
	//==================================================================
	var messageVal = $('#message').val();
	
	$('#message').focus(function(){
		if($(this).val() == messageVal)
		{
			$(this).val('');
		}
	});
	
	$('#message').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(messageVal);
		}
	});
	//------------------------------
	$('#contact_form').submit(function(){
		$('.name_error, .email_error, .message_error').remove();
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var emailaddressVal = $("#email").val();
		
		if($("#name").val() == '' || $("#name").val() == nameVal) 
		{
			$("#subject").after('<span class="name_error">* Please, write your name.</span>');
			return false; 
        }else{
			$('.name_error').remove();
		}
		//
        if(emailaddressVal == '' || emailaddressVal == emailVal) 
		{
            $("#subject").after('<span class="email_error">* Please, insert your e-mail address.</span>');
			return false; 
        }
        else if(!emailReg.test(emailaddressVal)) 
		{
            $("#subject").after('<span class="email_error">* Please, insert your e-mail address.</span>');
			return false; 
        }else{
			$('.email_error').remove();
		}
		//
		if($("#message").val() == '' || $("#message").val() == messageVal) 
		{
			
            $("#subject").after('<span class="message_error">* Please, leave a message.</span>');
			return false; 
        }else{
			$('.message_error').remove();
		}
		$.ajax({
			type        : "POST",
			cache       : false, 
			url         : "contactform.php",
			data        : $(this).serializeArray(),
			success: function(data) {
				$.fancybox(data,{
					'opacity'		: true,
					'overlayColor'	: '#000',
					'overlayOpacity' : 0.8,
					'centerOnScroll' : false,
					'titlePosition'	: 'over'
				});
			}
		});
		return false;
	});
	//==================================================================
	var subscribeVal = $('#subscribtion').val();
	
	$('#subscribtion').focus(function(){
		if($(this).val() == subscribeVal)
		{
			$(this).val('');
		}
	});
	
	$('#subscribtion').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(subscribeVal);
		}
	});
	
	var subscribeVal = $("#subscribtion").val();
	
	$('#subscribe').submit(function(){
	
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var emailaddressVal = $("#subscribtion").val();
        if(emailaddressVal == '') 
		{
            hasError = true;
        }
 
        else if(!emailReg.test(emailaddressVal)) 
		{
            hasError = true;
        }
 
        if(hasError == true) { 
			$("#subscribtion").after('<span class="subscribe_error">*</span>');
			return false; 
		}
	});
	//==================================================================
	var matchArr = new Array();
	var n = 0;
	var selection = 'p, h1, h2, h3, h4, h5, ';
	var searchVal = $('#search').val();
	
	$('#search').focus(function(){
		if($(this).val() == searchVal)
		{
			$(this).val('');
			$(selection).highlightRegex();
		}
	});
	
	$('#search').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(searchVal);
		}
	});
	var searchVal = $('#search').val();
	$('#search').keyup(function(){
		
		n = 0;
		matchArr = new Array();
		//
		$(selection).highlightRegex();
		//
		if($(this).val() != '' && $(this).val().length > 2) {
			
			$(selection).highlightRegex(new RegExp($(this).val(), 'ig'));

			
			$('.highlight').each(function(){
			
				if($(this).is(":visible") && $(this).parents().css('visibility') != 'hidden')
				{
					//console.debug($(this));
					var topOffset = $(this);
					matchArr.push(topOffset);
				}
			});
			
			for(var i = 0; i<matchArr.length; i++)
			{
				matchArr[i].removeAttr('id');
			}

			if(matchArr.length > 2)
			{
				matchArr[0].attr('id', 'current_match');
				$("#next").fadeIn("slow");
			}
			else
			{
				//$("#next").fadeOut("slow");
			}
			//=================================
			if(matchArr.length > 0)
			{
				animateScroll();
				isMatch = true;
			}
			if(matchArr.length < 1)
			{
				isMatch = false;
			}
			n = 1;
			//$('#trace').text(matchArr.length);
		}
		else
		{
			//$("#next").fadeOut("slow");
		}
	})
	
	if(!isMatch)
	{
		$('#next').css('cursor', 'pointer');
		$('#next').click(function(){
			
			if( $('#search').val() != searchVal && $('#search').val() != '' ){
				setIdToMatch(n);
				animateScroll();
				
				//$('#trace').text(n + " : " + (matchArr.length - 1));
				
				n++;
				
				if(n > matchArr.length - 1)
				{
					n = 0;
				}
			}
		});
		
		function setIdToMatch(num)
		{
			for(var i = 0; i<matchArr.length; i++)
			{
				matchArr[i].removeAttr('id');
			}
			
			matchArr[num].attr('id', 'current_match');
		}
	}else{
		$('#next').css('cursor', 'auto');
	}
	
	function animateScroll()
	{
		
		var MatchElement = matchArr[n];
   		var destination = $(MatchElement).offset().top - positioningOffset - 160;
		if($.browser.opera)
		{
			//$("html:not(:animated)").animate({scrollTop: destination},{queue:false, duration:500, easing:"quadEaseInOut"});
   			$("html:not(:animated)").animate({ queue:false, scrollTop: destination}, 500);
		}
		else
		{
			//$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination},{queue:false, duration:500, easing:"quadEaseInOut"});
			$("html:not(:animated),body:not(:animated)").animate({ queue:false, scrollTop: destination}, 500);
		}
	}
	//console.debug('ready')
	//$('.current').click();
})

//Site scroll
$(function(){
	$('#nav a, .inline_navigation, .go_to_comments').click(function(e){
   		var elementClicked = '#' + $(this).attr("href").match(/#([^ ]*)/)[1];
		//console.log(elementClicked);
		//var moo = "blah blah cow @moo";
   		var destination = $(elementClicked).offset().top - positioningOffset;
		if($.browser.opera)
		{
   			$("html:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		else
		{
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		return false;
	});
});
//zoomable images hover animation

$(function() {
	/*$('a.zoom, a.vimeo, a.youtube, a.thumb').each(function() {
	//$(this).append('<div style="position:absolute; top:5px; left:5px; width:200px; height:150px; background:red;"></div>');
		$(this).hover(function(){
			$(this).find('img').stop().animate({
				opacity: 0.8
			})
		},function(){
			
			$(this).find('img').stop().animate({
				opacity: 1
			})
		});
	});*/
	$('a.zoom, a.vimeo, a.youtube, a.thumb').hover(function(){
		//console.log( $(this).find('.corner') )
		if($.browser.msie){
			$(this).find('.corner, .corner_bg').stop(true).animate({
				height: 120,
				width: 120
			}, 400)
				$(this).find('.icon_holder').stop(true).delay(100).animate({
				width: 120,
				height: 120
			}, 400)
		}else{
			$(this).find('.corner, .corner_bg').stop(true).animate({
				height: 120,
				width: 120,
			}, 400)
			//
			$(this).find('.icon_holder').stop(true).animate({
				width: 35,
				height: 35
			}, 400)
		}
		//
	},function(){
		
		if($.browser.msie){
			$(this).find('.corner, .corner_bg').stop(true).delay(100).animate({
				height: 0,
				width: 0,
			}, 400)
				$(this).find('.icon_holder').stop(true).animate({
				width: 0,
				height: 0
			}, 400)
		}else{
			$(this).find('.corner, .corner_bg').stop(true).animate({
				height: 0,
				width: 0
			}, 400)
			//
			$(this).find('.icon_holder').stop(true).animate({
				width: 0,
				height: 0
			}, 400)
		}
		
	});
});


//Go up buttons hover animation
/*$(function() {
$('.go_up').each(function() {
	$(this).hover(
		function() {
			$(this).stop().animate({ opacity: 0.5 }, 500);
		},
		function() {
			$(this).stop().animate({ opacity: 1 }, 500);
		})
	});
});*/
//Scrolling the page when go up button is clicked
$(function(){
	$('.go_up').click(function(){
		
		var elementClicked = $(this).attr("href");
   		var destination = $(elementClicked).offset().top - positioningOffset;
		if($.browser.opera)
		{
   			$("html:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		else
		{
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		
		return false;
	});
});
//Key navigation
var s = 0;
$(document).keyup(function (e) {
	if ($(e.target).is(':not(input, textarea)')) {
		positioningOffset = (-45 - positioningOffsetVar) * -1;
		//alert('z'+positioningOffset);
		function _scroll()
		{
			$('html,body').stop();
			if($.browser.opera)
			{
				$("html:not(:animated)").stop().animate({ scrollTop: contentTop[s] - positioningOffset}, animationTime );
			}
			else
			{
				$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: contentTop[s] - positioningOffset}, animationTime );
			}
		}
		//
		function _scrollByChar(theChar)
		{
			
	//				alert(1)


//alert(e.keyCode)


/*if(e.keyCode==65){
document.getElementById('home_about_botm_bg').style.paddingTop='143px';
}
if(e.keyCode==80){
document.getElementById('home_portfolio').style.paddingTop='143px';
}
if(e.keyCode==66){
document.getElementById('home_blog').style.paddingTop='143px';
}*/



			if(e.keyCode >= 65 && e.keyCode <= 90)
			{
				var convertToDataValue = $('body').find(".section[data-key="+ theChar +"]");
				if($(convertToDataValue).get(0) != undefined)
				{
					var destination = $(convertToDataValue).offset().top - positioningOffset;
					
					$('html,body').stop();
					
					if($.browser.opera)
					{
						$("html:not(:animated)").stop().animate({ scrollTop: destination}, animationTime );
					}
					else
					{
						$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: destination}, animationTime );
					}
				}
			}
		}
		
		var chr = String.fromCharCode(e.keyCode || e.which);
		_scrollByChar(chr);

		var keyCode = e.keyCode || e.which,
			arrow = {left: 37, right: 39 };

		switch (keyCode) {
			case arrow.left:
			if(s > 0)
			{
				s--;
				_scroll();
			}
			break;
			case arrow.right:
			if(s < contentTop.length - 1)
			{
				s++;
				_scroll();
			}
			break;
		}
		//
		if(isHeaderOpen == true)
		{
			$('#header').stop().animate({
				top: 0 - $('#header').height() + 35
			}, 500, function(){
				isHeaderOpen = false;
			})
			$('.arrow_container').stop().animate({
				backgroundPosition: '0px -36px'
			}, 500)
		}
		$('#footer').animate({
				bottom: -29
		}, 500)
		$('.arrow_container').stop().animate({
			backgroundPosition: '0px 0px'
		}, 500)
		$('.footer_arrow').delay(500).animate({
				marginTop: -25
			}, 500);
		isFooterOpen = false;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*//alert('a'+positioningOffset);
	
$('#portt1').click(function(){
	
		positioningOffset = (-140 - positioningOffsetVar) * -1;
		//_scroll();
	});	
	
	
$('#portt2').click(function(){
	
		positioningOffset = (-140 - positioningOffsetVar) * -1;
		//_scroll();
	});	
	
$('#portt3').click(function(){
	
		positioningOffset = (-140 - positioningOffsetVar) * -1;
		//_scroll();
	});	
	
$('#portt4').click(function(){
	
		positioningOffset = (-140 - positioningOffsetVar) * -1;
		//_scroll();
	});//	
	
	*/
	
	

});


/*  fancybox youtube video embedding */
jQuery(document).ready(function() {

	$(".icon_youtube").click(function() {
		$.fancybox({
			'padding'		: 7,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title'			: this.title,
			'width'			: 640,
			'height'		: 385,
			'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			'type'			: 'swf',
			'swf'			: {
			'wmode'				: 'transparent',
			'allowfullscreen'	: 'true'
			}
		});

		return false;
	});
/*  fancybox youtube embedding END */	
	
/*  fancybox VIMEO video embedding */
	$(".icon_vimeo").click(function() {
		$.fancybox({
			'padding'		: 7,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title'			: this.title,
			'width'			: 699,
			'height'		: 350,
			'href'			: this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
			'type'			: 'swf'
		});

		return false;
	});
/*  fancybox VIMEO video embedding END */	



	
	
});



