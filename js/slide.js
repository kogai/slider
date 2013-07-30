(function($){
	$.fn.slideShow = function(){

	var	slideWrap		= ".slide"								// スライドのクラス
		Wrap			= ".wrap"								// スライドの幅のクラス
		wrapWidth		= $(Wrap).width();						// スライドの幅を算出
		objCount 		= $(slideWrap).children().length;		// スライドの数を算出
		objWidth		= wrapWidth * objCount;					// スライド全体の幅を算出
		objPagerWrapTag	= "<div class='objPagerWrap'></div>"	// ページャーを囲むタグ
		objPagerTag		= "<div class='objPager'></div>"		// ページャーのタグ
		objPagerWrap	= ".objPagerWrap"						// ページャーを囲むクラス
		objPager		= ".objPager"							// ページャーのクラス
		objActive		= ".active"								// ページャーのアクティブ状態のクラス
		objActiveName	= "active"								// ページャーのアクティブ状態のクラス名
		btnLeftTag		= "<div class='btnLeft'></div>"			// 左ボタンのタグ
		btnRightTag		= "<div class='btnRight'></div>"		// 右ボタンのタグ
		btnLeft			= ".btnLeft"							// 左ボタンのクラス
		btnRight		= ".btnRight"							// 右ボタンのクラス
		objLeft			= $(slideWrap).css("left");				// スライドの位置を算出
		objLeftMax		= -objWidth + wrapWidth					// スライドの最右端を算出
		anmTime			= 200									// スライドアニメーションの速度
		anmType			= "easeOutBack"							// スライドアニメーションの種類
		anmCycle		= 10000									// 自動スライドする周期
	
	// ページャーの囲み要素 .objPagerWrap を挿入
	$(slideWrap).after(objPagerWrapTag);

	// 左右ボタン .btnLeftTag .btnRightTag を挿入
	$(Wrap).before(btnLeftTag).before(btnRightTag);

	// ページャー .objPager を挿入
	$(slideWrap).children().each(function(){
		$(this).parent().next().append(objPagerTag);
	});
	
	// ページャー .objPager に .active を付与
	$(objPager).first().addClass(objActiveName);

	
	$(btnLeft).click(function(){
		$(slideWrap).not(":animated").animate(
			{left:"+=" + wrapWidth + "px"},
			anmTime,
			anmType,
			(function(){
				var objPost		= $(slideWrap).css("left");		// スライドの位置
					objPostval	= objPost.replace('px','');		// スライドの位置の絶対値
				if(objPostval > 0) {
					$(slideWrap).not(":animated").animate({left: objLeftMax + "px"}, anmTime, anmType );
					$(objPager).last().addClass(objActiveName);
				}
			})
		);
		$(objActive).toggleClass(objActiveName).prev().toggleClass(objActiveName);
	});

	$(btnRight).click(function(){
		$(slideWrap).not(":animated").animate(
			{left:"-=" + wrapWidth + "px"},
			anmTime,
			anmType,
			(function(){
				var objPost		= $(slideWrap).css("left");		// スライドの位置
					objPostval	= objPost.replace('px','');		// スライドの位置の絶対値
				if(objPostval < objLeftMax) {
					$(slideWrap).not(":animated").animate({left: 0 + "px"}, anmTime, anmType );
					$(objPager).first().addClass(objActiveName);
				}
			})
		);
		$(objActive).toggleClass(objActiveName).next().toggleClass(objActiveName);
	});
	
	setInterval(function(){
		var	objPost		= $(slideWrap).css("left");				// スライドの位置
			objPostval	= objPost.replace('px','');				// スライドの位置の絶対値

		if( objPostval == objLeftMax ){
			$(slideWrap).not(":animated").animate( {left:0 + "px"}, anmTime, anmType);
			$(objPager).removeClass(objActiveName).first().addClass(objActiveName);
		} else {
			$(slideWrap).not(":animated").animate( {left:"-=" + wrapWidth + "px"}, anmTime, anmType);
			$(objActive).toggleClass(objActiveName).next().toggleClass(objActiveName);
		}
	},anmCycle);
	
	$(objPager).click(function(){
		var objIndex	= $(this).index();						// ページャーの番号
			objMove		= objIndex * wrapWidth					// 移動距離
		$(slideWrap).not(":animated").animate( {left:"-" + objMove + "px"}, anmTime, anmType );
		$(objPager).removeClass(objActiveName);
		$(this).addClass(objActiveName);
	});

	}
})(jQuery);
