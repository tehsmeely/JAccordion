//Begin imported JAccordion
function JAccordion(items, titles, contentContainers, autoClose) {
    var self = this;
    this.items = $(typeof items !== 'undefined' ? items : ".item");
    this.titles = $(typeof titles !== 'undefined' ? titles : ".title");
    this.contentContainer_str = typeof contentContainers !== 'undefined' ? contentContainers : ".content-container";
    this.contentContainers =  $(this.contentContainer_str);
    this.autoClose = typeof autoClose !== 'undefined' ? autoClose : true;
    this.activeItem = null;
    console.log(this.items);
    console.log(this.titles);
    console.log(this.contentContainers);
    console.log(this.autoClose);

    $(window).resize(function() {

        $.each(self.contentContainers, function(i, e) {

            self.createAccordionTween(e, i);

        });

    });

    /*
      this function creates the tween for the accordion item
      records the height of the element and then creates a fromTo() instance. Also records the current progress of the element's tween (if any) and then takes the new instance to that point (this only for the active item - if there's an item currently animating)
      the function's target should be a regular DOM element.
      in this case the function will be called in a loop that will pass the DOM element
    */
    this.createAccordionTween = function(target, index) {

        // clear the height property of previous animations
        TweenLite.set(target, {
            clearProps: "height"
        });

        var _this = target,
            $this = $(target),
            targetAnimation = _this.toggleAnimation, // null on the first pass
            /*
              get the paused state to determinate the playhead's direction.
              if the tween exists get the state (could be true or false)
              if the tween doesn't exists set the paused state to null, 
              in this case the animation will be created for the first time
              and we don't care about the playhead's direction.
            */
            targetAnimationActive = targetAnimation ? targetAnimation.isActive() : null,
            // same with the reversed state
            targetAnimationReversed = targetAnimation ? targetAnimation.reversed() : true,
            // get the current's animation progress, if the animation exists
            targetAnimationProg = targetAnimation ? targetAnimation.progress() : 0,
            $thisHeight = $this.outerHeight(),
            // create the new tween and set the current progress
            t = TweenLite.fromTo(_this, 1, {
                height: 0
            }, {
                height: $thisHeight,
                paused: true
            }).progress(targetAnimationProg);
        console.log($this);
        /*
          check the direction of the playhead only if the animation was active
          if the animation is going forward => play() else => reverse()
        */
        if (targetAnimationActive) {

            targetAnimationReversed ? t.reverse() : t.play();

        }

        // attach the animation to the DOM element
        _this.toggleAnimation = t;
        console.log(t);
        console.log($thisHeight);

    }

    /*
     *  CLICK EVENT
     */
    // CLick event chooses between two functions based on autoClose setting
    // Autoclose will enable accordion behaviour, if False it's simple toggles
    //
    var accordionClick = function(){
        var targetContent = $(this).siblings(self.contentContainer_str)[0],
            targetAnimation = targetContent.toggleAnimation,
            $this = $(this),
            $thisIndex = self.titles.index($this);

        if ($thisIndex !== self.activeItem && self.activeItem !== null) {
            self.contentContainers[self.activeItem].toggleAnimation.reverse();
            // remove the active class
            $(".active-accordion").removeClass("active-accordion");
            
            // add the active class to this element
            $this.addClass("active-accordion");

            targetAnimation.play();

            self.activeItem = $thisIndex;

        } else if (self.activeItem === null) {
            // add the active class to this element
            $this.addClass("active-accordion");

            targetAnimation.play();

            self.activeItem = $thisIndex;

        } else {
            // remove the active class
            $(".active-accordion").removeClass("active-accordion");

            targetAnimation.reverse();

            self.activeItem = null;
        }

    }
    var toggleClick = function(){
        var targetContent = $(this).siblings(self.contentContainer_str)[0],
            targetAnimation = targetContent.toggleAnimation,
            $this = $(this);
        
        if ($this.hasClass("active-accordion")){
            targetAnimation.reverse();
            $this.removeClass("active-accordion");
        } else {
            targetAnimation.play()
            $this.addClass("active-accordion");
        }
    }
    //Set the click handle here, and select function
    if (self.autoClose) {
        this.titles.click(accordionClick);
    } else {
        this.titles.click(toggleClick);
    }
    
    
    console.log("init loop");
    $.each(this.contentContainers, function(i, e) {
        console.log(e)
        self.createAccordionTween(e);

    });
}
// End import JAccordion
