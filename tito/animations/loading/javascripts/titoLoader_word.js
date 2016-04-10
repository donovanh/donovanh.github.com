$(function() {
    var loaderCSS = '.tito-loader{opacity:0;-webkit-transition:opacity .4s ease-out;transition:opacity .4s ease-out;width:100%;height:100%;position:absolute;top:0;right:0;bottom:0;left:0;z-index:9999}.tito-loader.show{opacity:1}.tito-loader-background{background:#ECEFF4;position:absolute;top:0;right:0;bottom:0;left:0}.tito-machine .numbermask{fill:#ECEFF4}.tito-machine{opacity:1;width:240px;height:110px;-webkit-transition:opacity .5s ease-out;transition:opacity .5s ease-out;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tito-machine .to-show{fill:rgba(0,0,0,0);stroke:#5489B8;stroke-width:0}.tito-machine .to-show.show-lines{stroke-width:.1;-webkit-animation:show-machine-lines 1.6s cubic-bezier(.51,0,.33,1) forwards;animation:show-machine-lines 1.6s cubic-bezier(.51,0,.33,1) forwards}.tito-machine .to-show.show-lines:nth-child(3){-webkit-animation-delay:0;animation-delay:0;-webkit-animation-duration:1.2s;animation-duration:1.2s}.tito-machine .to-show.show-lines:nth-child(6){-webkit-animation-delay:.4s;animation-delay:.4s;-webkit-animation-duration:1s;animation-duration:1s}.tito-machine .to-show.show-lines:nth-child(4){-webkit-animation-delay:.6s;animation-delay:.6s;-webkit-animation-duration:1.6s;animation-duration:1.6s}.tito-machine .to-show.show-lines:nth-child(1){-webkit-animation-delay:.8s;animation-delay:.8s;-webkit-animation-duration:2.4s;animation-duration:2.4s}.tito-machine .to-show.show-lines:nth-child(2){-webkit-animation-delay:1s;animation-delay:1s;-webkit-animation-duration:1.6s;animation-duration:1.6s}.tito-machine .to-show.show-lines:nth-child(5){-webkit-animation-delay:1.4s;animation-delay:1.4s;-webkit-animation-duration:2.4s;animation-duration:2.4s}.tito-machine .to-show.show-lines.no-stroke{stroke-width:0}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes show-machine-lines{100%{stroke-dashoffset:0}}@keyframes show-machine-lines{100%{stroke-dashoffset:0}}';
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    if (style.styleSheet){
      style.styleSheet.cssText = loaderCSS;
    } else {
      style.appendChild(document.createTextNode(loaderCSS));
    }
    head.appendChild(style);
    var loaderHTML = '<div class="tito-loader" id="tito-loader"> <div class="tito-loader-background"></div><div class="tito-machine"> <svg width="100%" height="100%" viewBox="-1 -1 25 12" xmlns="http://www.w3.org/2000/svg"> <g id="tito"> <path class="to-show" d="M10.6,4.4 L10.6,2.8 L11.5,2.8 L11.5,0.1 L13.3,0.1 L13.3,2.8 L14.7,2.8 L14.7,4.4 L13.3,4.4 L13.3,7.9 C13.3,8.7 14.6,8.6 14.6,8.6 L14.6,10.2 C11.5,10.3 11.5,8.7 11.5,8.6 L11.5,7.9 L11.5,4.4 L10.6,4.4 L10.6,4.4 Z" id="small-t"></path> <path class="to-show" d="M15.5,6.5 C15.5,4.3 17.3,2.6 19.4,2.6 C21.5,2.6 23.3,4.4 23.3,6.5 C23.3,8.7 21.5,10.4 19.4,10.4 C17.3,10.4 15.5,8.7 15.5,6.5 L15.5,6.5 Z" id="o"></path> <path class="to-show" d="M2.3,10.2 L2.3,1.9 L0,1.9 L0,0 L6.8,0 L6.8,1.9 L4.5,1.9 L4.5,10.2 L2.3,10.2 L2.3,10.2 Z" id="T"></path> <path class="to-show" d="M7.7,10.2 L7.7,2.8 L9.6,2.8 L9.6,10.2 L7.7,10.2 L7.7,10.2 Z" id="i"></path> <path class="to-show" d="M19.6,4.3 C18.4,4.3 17.4,5.3 17.4,6.5 C17.4,7.7 18.4,8.7 19.5,8.7 C20,8.7 20.5,8.4 20.5,7.7 C20.5,7 19.9,6.8 19.6,6.8 C19.3,6.8 19.1,7 19.1,7 L19.1,5.5 C19.4,5.3 19.5,5.3 19.9,5.3 C20.3,5.3 21.6,5.5 21.8,6.9 L21.8,6.6 C21.8,5.3 20.8,4.3 19.6,4.3 L19.6,4.3 Z" id="tito-curl"></path> <path class="to-show" d="M7.7,1.8 L7.7,0 L9.6,0 L9.6,1.8 L7.7,1.8 L7.7,1.8 Z" id="i-dot"></path> </g> </svg> </div></div>';
    var functions = {
    showLoader: function(target) {
      functions.addHTMLtoSelector(target);
      functions.setLinesOffset(target);
      setTimeout(function() {
        $(target + " #tito-loader").addClass("show");
        $(target + " .to-show").addClass('show-lines');
        $(target + " .animated-numbers").removeClass("hide");
      }, 150);
    },
    hideLoader: function(target) {
      $(target + " #tito-loader").removeClass("show");
      setTimeout(function() {
        functions.removeHTMLfromPage(target);
      }, 800);
    },
    addHTMLtoSelector: function(target) {
      $(target).append(loaderHTML);
    },
    removeHTMLfromPage: function(target) {
      $(target + " #tito-loader").remove();
    },
    setLinesOffset: function(target) {
      $(target + " .to-show").each(function(index, path) {
        if (path.getTotalLength) {
          var length = path.getTotalLength();
          $(path).css(
            {
              strokeDasharray: length + ", " + length,
              strokeDashoffset: length
            }
          );
        }
      });
    }
  };
  window.titoLoader = {
    show: function(target) {
      if (!target) target  = 'body';
      functions.showLoader(target);
    },
    hide: function(target) {
      if (!target) target  = 'body';
      functions.hideLoader(target);
    }
  };
}());
