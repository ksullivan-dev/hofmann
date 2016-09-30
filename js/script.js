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
