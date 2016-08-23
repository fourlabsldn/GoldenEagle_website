(function gew_slider() {
  var GLOBALS = {
    classes: {
      active: 'gew_slider-slide--active',
      slider: 'gew_slider',
      slide: 'gew_slider-slide',
      prevBtn: 'gew_slider-btn-prev',
      nextBtn: 'gew_slider-btn-next',
    }
  };

  function toSelector(className) {
    return '.' + className;
  }

	function setActiveSlide(index, elements) {
		var activeIndex = constrain(index, 0, elements.length - 1);
		[].forEach.call(elements, function (e) {
      e.classList.remove(GLOBALS.classes.active);
    });
		elements[activeIndex].classList.add(GLOBALS.classes.active);
		centerSlide(activeIndex, elements);
	}

	function getActiveSlideIndex(elements) {
    var activeIndex = -1;
    [].forEach.call(elements, function (el, index) {
      if (el.classList.contains(GLOBALS.classes.active)) {
        activeIndex = index;
      }
    });
    return activeIndex;
  }

	function centerSlide(activeIndex, elements) {
		[].forEach.call(elements, function (s) {
      setTranslation(s, activeIndex * -100);
    });
	}

  // Returns int that is min <= val <= max
	function constrain(val, min, max) {
		diff = max - min + 1; // plus one so that val is <=max and not <max
    v = val - min;
    return min + (diff + (v % diff)) % diff;
	}


	// Translations
	function toInt(val) {
		try {
			val = parseInt(val) || 0;
			return val;
		} catch (e) {
			return 0;
		}
	}

	function getTranslation(el) {
		return {
			x: toInt(el.dataset.x),
			y: toInt(el.dataset.y),
		}
	}

	function setTranslation(el, x, y) {
    x = x || 0;
    y = y || 0;
		el.dataset.x = x;
		el.dataset.y = y;
		el.style.transform = "translate3d(" + x + "%, " + y + "%, 0)";
	}

	function addTranslation(el, xAdd, yAdd) {
    xAdd = xAdd || 0;
    yAdd = yAdd || 0;
		var translation = getTranslation(el);
		setTranslation(el, translation.x + xAdd, translation.y + yAdd);
	}

  var slider = document.querySelector(toSelector(GLOBALS.classes.slider));
  var slides = document.querySelectorAll(toSelector(GLOBALS.classes.slide));
  var prevBtn = document.querySelector(toSelector(GLOBALS.classes.prevBtn));
  var nextBtn = document.querySelector(toSelector(GLOBALS.classes.nextBtn));

  prevBtn.addEventListener('click',function () {
    var activeIndex = getActiveSlideIndex(slides);
    setActiveSlide(activeIndex - 1, slides);
  });

  nextBtn.addEventListener('click', function() {
    var activeIndex = getActiveSlideIndex(slides);
    setActiveSlide(activeIndex + 1, slides);
  })
}());
