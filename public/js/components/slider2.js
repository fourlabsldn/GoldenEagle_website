(function gewSlider() {
	var GLOBALS = {
		classes: {
			slider: 'gew_slider2-contentWrapper',
			content: 'gew_slider2-content',
			prevBtn: 'gew_slider2-btn-prev',
			nextBtn: 'gew_slider2-btn-next',
		}
	};

	function toSelector(className) {
		return '.' + className;
	}

	function getContent(element) {
		return element.querySelector(toSelector(GLOBALS.classes.content));
	}

	// Translations
	function toInt(notInt) {
		try {
			var val = parseInt(notInt, 10) || 0;
			return val;
		} catch (e) {
			return 0;
		}
	}

	function getTranslation(el) {
		return {
			x: toInt(el.dataset.x),
			y: toInt(el.dataset.y),
		};
	}

	function setTranslation(el, xParam, yParam) {
		var x = xParam || 0;
		var y = yParam || 0;
		el.dataset.x = x;
		el.dataset.y = y;
		el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
	}


	// Get scrollWidth of elements with overflow hidden
	// or visible
	function getScrollWidth(element) {
		var originalOverflow = element.style.overflowX;

		element.style.overflowX = 'scroll';
		var scrollWidth = element.scrollWidth;
		element.style.overflowX = originalOverflow;

    // Because the element is being translated, the translation value
    // is not reflected in the scrollWidth, so we have to add it.
    var currentScroll = getScroll(element);
    return scrollWidth + currentScroll;
	}

	function getMaxScroll(element) {
		var elementWidth = element.clientWidth;
		var scrollWidth = getScrollWidth(element);
		var maxScroll = scrollWidth - elementWidth;
		return maxScroll;
	}

	function getScroll(element) {
		return -getTranslation(getContent(element)).x;
	}

	function addScroll(value, element) {
		var maxScroll = getMaxScroll(element);
    var currentScroll = getScroll(element);
		// Between 0 and maxScroll;
		var scrollVal = Math.max(0, Math.min(maxScroll, currentScroll + value));
		setTranslation(getContent(element), -scrollVal);
	}

	var slider = document.querySelector(toSelector(GLOBALS.classes.slider));
  var prevBtn = document.querySelector(toSelector(GLOBALS.classes.prevBtn));
  var nextBtn = document.querySelector(toSelector(GLOBALS.classes.nextBtn));

	var options = {
		scroll: 200,
	};

	prevBtn.addEventListener('click', function () {
		addScroll(-options.scroll, slider);
	});

	nextBtn.addEventListener('click', function () {
		addScroll(options.scroll, slider);
	});
}());
