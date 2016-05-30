console.log("Loaded:", "visibility.js");

// Check if window is active, from:
	// http://stackoverflow.com/questions/1060008/is-there-a-way-to-detect-if-a-browser-window-is-not-currently-active
	(function() {
  var hidden = "hidden";

  // Standards:
  if (hidden in document) document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document) document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document) document.addEventListener("msvisibilitychange", onchange);
  else if ("onfocusin" in document) document.onfocusin = document.onfocusout = onchange; // IE 9 and lower:
  else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange; // All others:

  function onchange (evt) {
    var v = "visible",
				h = "hidden",
        evtMap = { focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h };

    evt = evt || window.event;
    if (evt.type in evtMap) document.body.dataset.visibility = evtMap[evt.type];
    else document.body.dataset.visibility = this[hidden] ? "hidden" : "visible";
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if( document[hidden] !== undefined ) onchange({type: document[hidden] ? "blur" : "focus"});
})();