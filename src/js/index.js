import "./import/modules.js";

import LazyLoad from "vanilla-lazyload";

var getClosest = function(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
    }
  
    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;
};
  
var lazy = new LazyLoad({
    elements_selector: "img",
    callback_enter: function(image) {
        let figure = getClosest(image, "figure");
        const aspectRatio = figure.offsetWidth / figure.offsetHeight;
  
        // If aspect-ratio is portrait
        if (aspectRatio < 1) {
            image.style.minHeight = "100%";
            image.style.height="100%";
            image.style.width = "auto";
        } else if (aspectRatio > 1) {
        // If aspect-ratio is landscape
            image.style.minWidth = "100%";
            image.style.width = "100%";
            image.style.height = "auto";
        } else {
        // Otherwise, image is square
            image.style.maxWidth = "100%";
            image.style.height = "auto";
        }
    }
});
/*
          // Conditional statement
          if(aspectRatio > 1) {
              $figure.addClass('img-landscape');    
          } else if (aspectRatio < 1) {
              $figure.addClass('img-portrait');    
          } else {
              $figure.addClass('img-square');         
          }
          
          */
  