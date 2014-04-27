onNodesInserted
==============

Get notified when DOM node is inserted.
Browser support:
	Any that supports [document.querySelectorAll](http://caniuse.com/queryselector)

onNodesInserted attempts to use `animationStart` event, but falls back to `setTimeout` in older browsers.

## Example
```
// onNodesInserted takes 10ms to start. It avoids getting elements on initial load
onNodesInserted('.hello', function(newElements) {
	console.log(newElements); // [div]
});

// wait 100ms, so onNodesInserted is listening
setTimeout(function() {
	document.creatElement('div');
	div.className = 'hello';
	document.body.appendChild(div);
}, 100);
```

## API
```
// Listen to nodes inserted. CSS_SELECTOR must be 2.1 to support IE8
// Callback gets passed an array of HTMLElements
onNodesInserted(<CSS_SELECTOR>,<CALLBACK>);

// For older browsers, onNodesInserted polls for new DOM elements. Set the poll time. By default it's 400ms.
onNodesInserted.setPollTime(<POLL_TIME>);
```
