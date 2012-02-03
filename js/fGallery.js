(function($){ 
	jQuery.fn.fGallery = function(filter_element, options)
	{
		var animTime = 300;
		
		var element = this;
		var elHeight = element.height();
		
		var posLeftArr = new Array();
		var posTopArr = new Array();
		var marginArr = new Array();
		
		element.css('height', elHeight);
		
		var clone = element.clone().appendTo(element.parent()).attr('id','grid_clone');
		
		element.css('visibility', 'hidden');
		clone.css('position', 'absolute');
		
		/*clone.css('top', element.position().top);
		
		$(window).resize(function(){
			clone.css('top', element.position().top);
		});*/
		
		$(filter_element).find('a').each(function(){
			
			$(this).click(function(){
				$(filter_element).find('li').each(function(){
					$(this).removeClass('filter_current');
				});
				var value = $(this).attr('href');
				var subvalue = value.substring(1);
				
				$(this).parent().addClass('filter_current');
				_filter(subvalue);
				return false;
			});
		});
		
		$(element).find('li').each(function(i){
			posTopArr.push($(this).position().top - element.position().top);
			posLeftArr.push($(this).position().left - element.position().left);
			var margins = {
				top:$(this).css('margin-top'),
				right:$(this).css('margin-right'),
				bottom:$(this).css('margin-bottom'),
				left:$(this).css('margin-left')
			} 			
			marginArr.push(margins);
			//console.debug($(this).position())
		})
		
		$(clone).find('li').each(function(i){
			$(this).css('position', 'absolute');
			
			$(this).css('top', posTopArr[i]);
			$(this).css('left', posLeftArr[i]);
		})
		
		_filter_do_first();
		function _filter_do_first()
		{
			var first_filter = $(filter_element).find('a').eq(0);
			$(filter_element).find('li').each(function(){
				$(this).removeClass('filter_current');
			});
			var value = first_filter.attr('href');
			if(value != '' && value != 'undefined' && value != null){
				var subvalue = value.substring(1);
				
				first_filter.parent().addClass('filter_current');
				_filter(subvalue);
			}
		}
		
		function _filter(value)
		{
			
			if(value != 'all')
			{
				$(clone).find('li[data-category="'+ value +'"]').each(function(i){
					$(this).show();
					if(i % 3 != 0)
					{
						$(this).stop().animate({
							'top': posTopArr[i],
							'left': posLeftArr[i],
							
						}, 500)
					}else{
						$(this).stop().animate({
							'top': posTopArr[i],
							'left': posLeftArr[i],
							
						}, 500, function(){
							
						});
					}
				});
				$(clone).find('li[data-category!="'+ value +'"]').each(function(i){
					
					$(this).stop().animate({
						'top': posTopArr[i] + $(window).height(),
						'left': posLeftArr[i],
						
					}, 500, function(){
						$(this).hide();
					});
				});
			}else{
				$(clone).find('li').each(function(i){
					$(this).show();
					if(i % 3 != 0)
					{
						$(this).stop().animate({
							'top': posTopArr[i],
							'left': posLeftArr[i],
							
						}, 500)
					}else{
						$(this).stop().animate({
							'top': posTopArr[i],
							'left': posLeftArr[i],
							
						}, 500, function(){
							
						});
					}
				});
			}
		}
		
	}
})(jQuery);