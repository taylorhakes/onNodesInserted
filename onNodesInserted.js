(function(global) {
	"use strict";
	var onNodesInserted = (function () {

		var sequence = 100,
			isAnimationSupported = false,
			animationstring = 'animationName',
			keyframeprefix = '',
			domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
			pfx = '',
			pollTime = 400,
			elm = document.createElement('div');

		if (elm.style.animationName) {
			isAnimationSupported = true;
		}

		if (isAnimationSupported === false) {
			for (var i = 0; i < domPrefixes.length; i++) {
				if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
					pfx = domPrefixes[i];
					animationstring = pfx + 'AnimationName';
					keyframeprefix = '-' + pfx.toLowerCase() + '-';
					isAnimationSupported = true;
					break;
				}
			}
		}

		var listen;
		if(isAnimationSupported) {
			listen = function(selector, callback) {
				var styleAnimation, animationName = 'insQ_' + (sequence++);

				var eventHandler = function (event) {
					if (event.animationName === animationName || event[animationstring] === animationName) {
						callback(event.target);
					}
				};

				styleAnimation = document.createElement('style');
				styleAnimation.innerHTML = '@' + keyframeprefix + 'keyframes ' + animationName + ' {  from {  outline: 1px solid transparent  } to {  outline: 0px solid transparent }  }' +
					"\n" + selector + ' { animation-duration: 0.001s; animation-name: ' + animationName + '; ' +
					keyframeprefix + 'animation-duration: 0.001s; ' + keyframeprefix + 'animation-name: ' + animationName + '; ' +
					' } ';

				document.head.appendChild(styleAnimation);

				var bindAnimationLater = setTimeout(function () {
					document.addEventListener('animationstart', eventHandler, false);
					document.addEventListener('MSAnimationStart', eventHandler, false);
					document.addEventListener('webkitAnimationStart', eventHandler, false);
					//event support is not consistent with DOM prefixes
				}, 10); //starts listening later to skip elements found on startup. this might need tweaking

				return {
					destroy: function () {
						clearTimeout(bindAnimationLater);
						if (styleAnimation) {
							document.head.removeChild(styleAnimation);
							styleAnimation = null;
						}
						document.removeEventListener('animationstart', eventHandler);
						document.removeEventListener('MSAnimationStart', eventHandler);
						document.removeEventListener('webkitAnimationStart', eventHandler);
					}
				};
			}
		} else {
			listen = function(selector, callback) {
				var currentEls = document.querySelectorAll(selector), to;
				function intervalFn() {
					var newEls = document.querySelectorAll(selector), found;
					for(var j = 0, lenj = newEls.length; j < lenj; j++) {
						found = false;
						for(var i = 0, len = currentEls.length; i < len; i++) {
							if(newEls[j] === currentEls[i]) {
								found = true;
								break;
							}
						}
						if(!found) {
							callback(newEls[j]);
						}
					}
					currentEls = newEls;
					to = setTimeout(intervalFn, pollTime)
				}
				to = setTimeout(intervalFn, pollTime);
				return {
					destroy: function() {
						clearTimeout(to);
					}
				}
			}
		}

		// aggregates multiple insertion events into a common parent
		function catchInsertions(selector, callback) {
			var insertions = [];
			//throttle summary
			var sumUp = (function () {
				var to;
				return function () {
					clearTimeout(to);
					to = setTimeout(function () {
						callback(insertions);
						insertions = [];
					}, 10);
				};
			})();

			return listen(selector, function (el) {
				insertions.push(el);
				sumUp();
			});
		}

		catchInsertions.setPollTime = function(time) {
			pollTime = time;
		};

		return catchInsertions;
	})();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = onNodesInserted;
	} else if (typeof require !== 'undefined' && require.amd) {
		define(function () {
			return onNodeInserted;
		});
	} else {
		global.onNodesInserted = onNodesInserted;
	}


})(this);
