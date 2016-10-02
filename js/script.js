var siteWidth;
var respSlider;
var slideWidth;
var doubleOptions = {
    controls: false,
    auto: true,
    pause: 8000,
    minSlides: 2,
    maxSlides: 2,
    slideWidth: slideWidth,
    slideMargin: 20
};

var singleOptions = {
    controls: false,
    auto: true,
    pause: 6000,
    slideMargin: 20
};

$( document ).ready( function(){
    $( '.slider--client' ).bxSlider({
        pager: false,
        auto: true,
        pause: 6000,
        autoHover: true
    });

    getDimensions();
    respSlider = $( '.slider--people' ).bxSlider( siteWidth < 500 ? singleOptions : doubleOptions );

    //animateCircle();
    //statCounter();
    labelView();
    searchToggle();
});

$( window ).on( 'resize orientationchange', function() {
    getDimensions();
    responsiveSlider();
});

function searchToggle(){
    $( '.js-search__toggle' ).click( function( e ){
        $( e.currentTarget ).closest( '.search-container' ).find( '.search__input' ).toggleClass( 'active' ).focus();
    });
    $( '.search__input' ).keyup( function( e ){
        var $this = $( e.currentTarget );
        var searchToggle = $( '.js-search__toggle' );
        if( $this.val() !== '' ){
            searchToggle.addClass( 'hidden' );
            if( e.keyCode === 13 ) {
                alert( "The search doesn't really work." );
            }
        } else {
            searchToggle.removeClass( 'hidden' );
        }
    });
    $( '.search__button' ).click( function( e ){
        if( $( '.search__input' ).val() !== '' ){
            alert( "The search doesn't really work" );
        }
    });
}

function getDimensions(){
    var widthAvailable = $( '.layout__people-slider' ).find( '.width-container' ).width();
    siteWidth = $( 'body' ).width();
    slideWidth = widthAvailable / 2;
    doubleOptions.slideWidth = slideWidth;
}

function responsiveSlider(){
    var currentSlide = respSlider.getCurrentSlide();
    doubleOptions.startSlide = currentSlide;
    singleOptions.startSlide = currentSlide;
    respSlider.reloadSlider( siteWidth < 500 ? singleOptions : doubleOptions );
}

function animateCircle(){
    $( '.stat-container' ).each( function( idx ){
        var $this, circle, radius, circleLength, circlePct, dashOffset;
        $this = $( this );
        circle = $this.find( '.path' );
        radius = circle.attr("r");
        circleLength = 2 * Math.PI * radius;
        circlePct = $this.find( '.stat' ).text().split( ',' )[0];
        dashOffset = ( 100 - circlePct ) / 100 * circleLength;
        setTimeout( function(){
            circle.attr( 'style', 'stroke-dashoffset: ' + dashOffset );
        }, 500 * idx );
    });
}

function triggerNumbers( el ){
    el.find( '.count-up').each(function(){
        var $container = $(this).parent();
        var endNumber = $(this).text();

        $( this ).text( '' );

        //Check for %
        if(endNumber.indexOf('%') > -1){
            endNumber = endNumber.replace('%','');
            $container.append('%');
        }

        //Check for $
        if(endNumber.indexOf('$') > -1){
            endNumber = endNumber.replace('$','');
            $container.prepend('$');
        }

        // Use comma only if there is a comma already in the number
        var needsComma = ( endNumber.indexOf( ',' ) > -1 ? ',' : '' );
        endNumber = endNumber.replace(/\,/g,''); //remove commas

        // Allow trailing letters and + character
        var endLetter = endNumber.match( /\d+\.?\d+|[a-zA-Z]|\+/g );
        if( endLetter ){
            if( endLetter[1] ){
                endNumber = endLetter[0];
                $container.append( endLetter[1] );
            }
        }

        //Determine decimal length
        var decimal = endNumber.split('.');
        if(decimal[1]){
            decimal = decimal[1].length;
        }else{
            decimal = 0;
        }

        var options = {
            useEasing : true,
            useGrouping : true,
            separator : needsComma,
            decimal : '.',
            prefix : '',
            suffix : ''
        };
        var count = new CountUp($(this).attr('id'), endNumber*0.25, endNumber, decimal, 3, options);
        count.start();
    });
}

function statCounter(){
    $( '.inview-trigger' ).on( 'inview', function( event, isInView, visiblePartX, visiblePartY ){
        if( isInView ){
            $( '.stat' ).each( function( idx ){
                var $this = $( this );
                setTimeout( function(){
                    if( ! $this.hasClass( 'counted' ) ){
                        triggerNumbers( $this );
                        $this.addClass( 'counted' );
                    }
                }, ( 2000 / 3 ) * ( idx  ) );
            });
        }
    });
}

function labelView() {
    var formInput, formSelect;
    formInput = $( '.input-wrapper' ).find( $( 'input, textarea' ) );
    //formSelect = $( '.form-line' ).find( 'select' );
    function getLabel(){
        return $( event.currentTarget ).closest( '.input-wrapper' ).find( 'label' );
    }
    $( formInput ).keypress( function(){
        getLabel().addClass( 'small-display' );
    });
    $( formInput ).keyup( function(){
        if( $( event.currentTarget )[0].value === '' ){
            getLabel().removeClass( 'small-display' );
        }
    });
    $( formSelect ).change( function(){
        getLabel().addClass( 'small-display' );
    });
}



// Plugins



/*******************
Package: CountUp
*******************/
// https://inorganik.github.io/countUp.js/
var CountUp=function(t,a,e,n,i,r){for(var o=0,s=["webkit","moz","ms","o"],u=0;u<s.length&&!window.requestAnimationFrame;++u)window.requestAnimationFrame=window[s[u]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[u]+"CancelAnimationFrame"]||window[s[u]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var a=(new Date).getTime(),e=Math.max(0,16-(a-o)),n=window.setTimeout(function(){t(a+e)},e);return o=a+e,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),this.options={useEasing:!0,useGrouping:!0,separator:",",decimal:"."};for(var m in r)r.hasOwnProperty(m)&&(this.options[m]=r[m]);""===this.options.separator&&(this.options.useGrouping=!1),this.options.prefix||(this.options.prefix=""),this.options.suffix||(this.options.suffix=""),this.d="string"==typeof t?document.getElementById(t):t,this.startVal=Number(a),this.endVal=Number(e),this.countDown=this.startVal>this.endVal,this.frameVal=this.startVal,this.decimals=Math.max(0,n||0),this.dec=Math.pow(10,this.decimals),this.duration=1e3*Number(i)||2e3;var l=this;this.version=function(){return"1.6.0"},this.printValue=function(t){var a=isNaN(t)?"--":l.formatNumber(t);"INPUT"==l.d.tagName?this.d.value=a:"text"==l.d.tagName||"tspan"==l.d.tagName?this.d.textContent=a:this.d.innerHTML=a},this.easeOutExpo=function(t,a,e,n){return e*(-Math.pow(2,-10*t/n)+1)*1024/1023+a},this.count=function(t){l.startTime||(l.startTime=t),l.timestamp=t;var a=t-l.startTime;l.remaining=l.duration-a,l.frameVal=l.options.useEasing?l.countDown?l.startVal-l.easeOutExpo(a,0,l.startVal-l.endVal,l.duration):l.easeOutExpo(a,l.startVal,l.endVal-l.startVal,l.duration):l.countDown?l.startVal-(l.startVal-l.endVal)*(a/l.duration):l.startVal+(l.endVal-l.startVal)*(a/l.duration),l.frameVal=l.countDown?l.frameVal<l.endVal?l.endVal:l.frameVal:l.frameVal>l.endVal?l.endVal:l.frameVal,l.frameVal=Math.round(l.frameVal*l.dec)/l.dec,l.printValue(l.frameVal),a<l.duration?l.rAF=requestAnimationFrame(l.count):l.callback&&l.callback()},this.start=function(t){return l.callback=t,l.rAF=requestAnimationFrame(l.count),!1},this.pauseResume=function(){l.paused?(l.paused=!1,delete l.startTime,l.duration=l.remaining,l.startVal=l.frameVal,requestAnimationFrame(l.count)):(l.paused=!0,cancelAnimationFrame(l.rAF))},this.reset=function(){l.paused=!1,delete l.startTime,l.startVal=a,cancelAnimationFrame(l.rAF),l.printValue(l.startVal)},this.update=function(t){cancelAnimationFrame(l.rAF),l.paused=!1,delete l.startTime,l.startVal=l.frameVal,l.endVal=Number(t),l.countDown=l.startVal>l.endVal,l.rAF=requestAnimationFrame(l.count)},this.formatNumber=function(t){t=t.toFixed(l.decimals),t+="";var a,e,n,i;if(a=t.split("."),e=a[0],n=a.length>1?l.options.decimal+a[1]:"",i=/(\d+)(\d{3})/,l.options.useGrouping)for(;i.test(e);)e=e.replace(i,"$1"+l.options.separator+"$2");return l.options.prefix+e+n+l.options.suffix},l.printValue(l.startVal)};

/*******************
Package: inView.js
Version: 1.0
*******************/
(function(d){var p={},e,a,h=document,i=window,f=h.documentElement,j=d.expando;d.event.special.inview={add:function(a){p[a.guid+"-"+this[j]]={data:a,$element:d(this)}},remove:function(a){try{delete p[a.guid+"-"+this[j]]}catch(d){}}};d(i).bind("scroll resize",function(){e=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null});setInterval(function(){var k=d(),j,n=0;d.each(p,function(a,b){var c=b.data.selector,d=b.$element;k=k.add(c?d.find(c):d)});if(j=k.length){var b;
if(!(b=e)){var g={height:i.innerHeight,width:i.innerWidth};if(!g.height&&((b=h.compatMode)||!d.support.boxModel))b="CSS1Compat"===b?f:h.body,g={height:b.clientHeight,width:b.clientWidth};b=g}e=b;for(a=a||{top:i.pageYOffset||f.scrollTop||h.body.scrollTop,left:i.pageXOffset||f.scrollLeft||h.body.scrollLeft};n<j;n++)if(d.contains(f,k[n])){b=d(k[n]);var l=b.height(),m=b.width(),c=b.offset(),g=b.data("inview");if(!a||!e)break;c.top+l>a.top&&c.top<a.top+e.height&&c.left+m>a.left&&c.left<a.left+e.width?
(m=a.left>c.left?"right":a.left+e.width<c.left+m?"left":"both",l=a.top>c.top?"bottom":a.top+e.height<c.top+l?"top":"both",c=m+"-"+l,(!g||g!==c)&&b.data("inview",c).trigger("inview",[!0,m,l])):g&&b.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
/* ===================================================================================== */
/**
 * Custom modifications of one of my favourite responsive sliders.
 * ---------------------------------------------------------------------------------------
 * - Author: Rahisify
 * - Url   : http://rahisify.com
 * ---------------------------------------------------------------------------------------
 * (1) Added data attributes support
 * (2) Added break points support
 * (3) Added automatic reload option
 * (4) Added self calling capability
 * ---------------------------------------------------------------------------------------
 * - Would not be possible without the awesome work of Steven Wanderski.
 * - Released under same license - not for sale!
 * ---------------------------------------------------------------------------------------
 */

!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,autoReload:!1,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){function e(t,e,i){var s=(t-i*(e-1))/e;return Math.floor(s)}function i(t){for(var e in t)o.settings[e]=t[e]}function l(){o.settings.slides&&(o.settings.maxSlides=o.settings.slides,o.settings.minSlides=o.settings.slides,o.settings.slideWidth=e(a,o.settings.slides,o.settings.slideMargin))}function d(t){t=t.replace(/([a-zA-Z0-9]+?):/g,'"$1":'),t=t.replace(/'/g,'"');var e=jQuery.parseJSON(t);return e}o.settings=t.extend({},s,n),l();var g=t(window).width();a=g;var h=t(r).attr("data-options");if(h){var p=h.charAt(h.length-1),v=h.charAt(0);"{"!=v&&"}"!=p&&(h="{"+h+"}");var u=d(h);for(var f in u)o.settings[f]=u[f];l()}var x=t(r).attr("data-breaks");if(x&&(o.settings.breaks=d(x)),o.settings.breaks){o.settings.breaks.sort(function(t,e){return t.screen-e.screen});for(var m=0;m<o.settings.breaks.length;++m){var S,b=o.settings.breaks[m],w={},T=b.screen;m<o.settings.breaks.length-1?(w=o.settings.breaks[m+1],S=w.screen,g>=T&&S>g&&i(b)):g>=T&&i(b)}l()}o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="'+o.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing");f();o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:v()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return void i();var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(p()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",R),o.settings.auto&&o.settings.autoStart&&(x()>1||o.settings.autoSlideForOnePage)&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&N()},p=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=s.add(n+i>=o.children.length?o.children.eq(i-1):o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),"border-box"==o.viewport.css("box-sizing")?e+=parseFloat(o.viewport.css("padding-top"))+parseFloat(o.viewport.css("padding-bottom"))+parseFloat(o.viewport.css("border-top-width"))+parseFloat(o.viewport.css("border-bottom-width")):"padding-box"==o.viewport.css("box-sizing")&&(e+=parseFloat(o.viewport.css("padding-top"))+parseFloat(o.viewport.css("padding-bottom"))),e},v=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width()+o.settings.slideMargin;t=Math.floor((o.viewport.width()+o.settings.slideMargin)/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=Math.ceil(o.children.length/m());else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.outerWidth())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),A()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),F()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){A()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),F()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",z),o.controls.prev.bind("click",k),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",y),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),D(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},z=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},k=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},y=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget);if(void 0!==i.attr("data-slide-index")){var s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()}},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),void o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i)):(o.pagerEl.find("a").removeClass("active"),void o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}))},A=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},D=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){if(o.settings.autoDelay>0){setTimeout(r.startAuto,o.settings.autoDelay)}else r.startAuto();o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));F(n)}),F()},F=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},N=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",O)},O=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",X),o.viewport.bind("touchend",Y)}},X=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},Y=function(t){o.viewport.unbind("touchmove",X);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",Y)},R=function(){if(o.initialized){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))}};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),A()});else{o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&D("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&D("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",p()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",R))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},t(window).resize(function(){o.settings.autoReload&&r.reloadSlider()}),d(),this},t('[data-call="bxslider"]').each(function(){t(this).bxSlider()})}(jQuery);
