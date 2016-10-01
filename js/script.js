$( document ).ready( function(){
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

    animateCircle();

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
    statCounter();
});




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
