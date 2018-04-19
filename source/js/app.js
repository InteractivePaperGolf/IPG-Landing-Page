// Smooth Scrolling

var scroll = new SmoothScroll({
    speed: 1000
});

var smoothScrollWithoutHash = function (selector, settings) {
	/**
	 * If smooth scroll element clicked, animate scroll
	 */
	var clickHandler = function (event) {
		var toggle = event.target.closest( selector );
		console.log(toggle);
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
		console.log(toggle.hash);
		var anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
		scroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
	};

	window.addEventListener('click', clickHandler, false );
};

// Run our function
smoothScrollWithoutHash( 'a[href*="#"]' );

// Lighbox
MediaBox('.mediabox');