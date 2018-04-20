// ##########################################################################
// UI
// ##########################################################################

// Icons 
feather.replace();

// Smooth Scrolling
var scroll = new SmoothScroll();

var smoothScrollWithoutHash = function (selector, settings) {
	/**
	 * If smooth scroll element clicked, animate scroll
	 */
	var clickHandler = function (event) {
		var toggle = event.target.closest( selector );
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
		var anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
		scroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
	};

	window.addEventListener('click', clickHandler, false );
};

smoothScrollWithoutHash( 'a[href*="#"]', {
	speed: 1000
});

// Lighbox
MediaBox('.mediabox');

// ##########################################################################
// Vue
// ##########################################################################

var tabs = new Vue({
	el: '#tabs',
	data: {
		tabsOpen: false,
		activeTab: 1,
		windowWidth: 0,
		coords: []
	},
	methods: {
		getWindowWidth: function(event) {
			this.windowWidth = document.documentElement.clientWidth;
		},
		calculateCoords: function() {
			this.coords = [
				{
					tabWidth: this.tabs[0].getBoundingClientRect().width,
					tabLeft: this.tabs[0].getBoundingClientRect().left + (this.tabs[0].getBoundingClientRect().width / 2) - 20
				},
				{
					tabWidth: this.tabs[1].getBoundingClientRect().width,
					tabLeft: this.tabs[1].getBoundingClientRect().left + (this.tabs[1].getBoundingClientRect().width / 2) - 20
				},
				{
					tabWidth: this.tabs[2].getBoundingClientRect().width,
					tabLeft: this.tabs[2].getBoundingClientRect().left + (this.tabs[2].getBoundingClientRect().width / 2) - 20
				}
			]
		},
		closeTab: function() {
			this.tabsOpen = false;
		},
		openTab: function() {
			this.tabsOpen = true;
		},
		changeTab: function(index) {
			if(this.activeTab > index) {
				this.$el.classList.add('reverse');
				this.activeTab = index;
			} else if(this.activeTab < index && this.$el.classList.contains('reverse')) {
				this.$el.classList.remove('reverse');
				this.activeTab = index;
			} else {
				this.activeTab = index;
			}
		},
		tabClick: function(index) {
			if(this.tabsOpen) {
				if(this.activeTab == index) {
					this.closeTab();
				} else {
					this.changeTab(index);
				}
			} else {
				this.changeTab(index);
				this.openTab();
			}
		}
	},
	computed: {
		small: function() {
			if(this.windowWidth >= 1180) {
				return false;
			} else {
				return true;
			}
		},
		tabs: function() {
			var elements = [];
			elements.push(document.getElementById('tab-one'));
			elements.push(document.getElementById('tab-two'));
			elements.push(document.getElementById('tab-three'));
			return elements;
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			window.addEventListener('resize', this.getWindowWidth);
			window.addEventListener('resize', this.calculateCoords);

			//Init
			this.getWindowWidth();
		})
	},
	created: function() {
		this.calculateCoords();
	},
	beforeDestroy: function() {
		window.removeEventListener('resize', this.getWindowWidth);
		window.removeEventListener('resize', this.calculateCoords);
	}
});