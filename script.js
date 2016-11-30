document.addEventListener("DOMContentLoaded", function () {
    
    // animation constants
    var FPS = 10;
    var ANIMATION_DURATION = 200;
    
    // navbar fixing logic
    var nav = document.getElementById("navbar");
    var navGhost = document.getElementById("navbar-ghost");
    var navOffsetTop = nav.offsetTop;

    function fixTopNavbar(pos) {
        if (pos > navOffsetTop) {
            nav.classList.add("nav-fixed");
            navGhost.classList.remove("hidden");
        }
        else {
            nav.classList.remove("nav-fixed");
            navGhost.classList.add("hidden");
        }
    };
   
    // from MDN, ticking variable prevents overprocessing
    var ticking = false;
    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
            // decide whether navbar needs to be fixed
            fixTopNavbar(last_known_scroll_position);
            ticking = false;
            });
        }
        ticking = true;
    });
    
    // add functionality for darkify button
    var darkifyButton = document.getElementById("darkify-button");
    darkifyButton.addEventListener("click", darkify);
    
    function darkify () {
        document.body.classList.toggle("dark");
    }
    
    // add functionality for clicking nav buttons
    var navItems = document.getElementsByClassName("nav-item");
    
    for (var i=0; i<navItems.length; i++) {
        var item = navItems[i];
        item.addEventListener("click", goToSection);
    }    
    
    function goToSection (event) {
        event.preventDefault();
        var item = this;
        // get section name, e.g. 'about' from id='nav-about'
        var sectionName = item.id.slice(0, item.id.indexOf("-"));
        // have actually removed the "to top" menu item
        if (sectionName === "totop") {
            animateScrollTo(0, ANIMATION_DURATION);
        }
        else {
            var section = document.getElementById(sectionName + "-section");
            var sectionOffset = section.offsetTop;
            // animate scroll to the right place on page: -50 because of height of navbar
            animateScrollTo(sectionOffset - 60, ANIMATION_DURATION);
        }
    }
    
    function animateScrollTo (offset, time) {
        var numFrames = Math.ceil(time/FPS),
            refreshTime = time/numFrames,
            counter = 0;
        // set interval with refreshTime and function which increments the scroll towards
        // the inputted offset
        var intervalId = window.setInterval(function () {
            var d = (offset - window.scrollY) / (numFrames - counter);
            window.scrollTo(0, window.scrollY + d);
            // clear interval when counter equals number of frames
            if (++counter >= numFrames){
                window.clearInterval(intervalId);
            } 
        }, refreshTime);
    };
     
});