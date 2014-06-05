(function(global) {
    "use strict";
    var onNodesInserted = (function() {

        // rAF polyfill
        var lastTime = 0,
            vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            }
        };

        function getNewNodes(currentEls, newEls) {
            var diff = [], found;
            for (var j = 0, lenj = newEls.length; j < lenj; j++) {
                found = false;
                for (var i = 0, len = currentEls.length; i < len; i++) {
                    if (newEls[j] === currentEls[i]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    diff.push(newEls[j]);
                }
            }
            return diff;
        }

        var listen = function(selector, callback) {
            var currentEls = document.querySelectorAll(selector),
                frame;

            var eventHandler = function() {
                var newNodes = document.querySelectorAll(selector);
                var diff = getNewNodes(currentEls, newNodes);
                if (diff.length) {
                    callback(diff);
                    currentEls = newNodes;
                };
                frame = window.requestAnimationFrame(eventHandler);
            };

            setTimeout(function() {
                eventHandler();
            }, 50); //starts listening later to skip elements found on startup. this might need tweaking

            return {
                destroy: function() {
                    window.cancelAnimationFrame(frame);
                }
            };
        };

        // aggregates multiple insertion events into a common parent
        function catchInsertions(selector, callback) {
            var insertions = [];
            //throttle summary
            var sumUp = (function() {
                var to;
                return function() {
                    clearTimeout(to);
                    to = setTimeout(function() {
                        callback(insertions);
                        insertions = [];
                    }, 10);
                };
            })();

            return listen(selector, function(els) {
                insertions = insertions.concat(els);
                sumUp();
            });
        }

        return catchInsertions;
    })();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = onNodesInserted;
    } else if (typeof require !== 'undefined' && require.amd) {
        define(function() {
            return onNodeInserted;
        });
    } else {
        global.onNodesInserted = onNodesInserted;
    }

})(this);
