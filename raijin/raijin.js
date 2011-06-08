//     Raijin.js 0.1
//     (c) 2011 Scott Murphy @hellocreation
//     Raijin may be freely distributed under the MIT license.

(function(w){
	
	//Initial Setup
	
	//set root variable to window object
    var root = w;
 	
	//create Raijin object
	var Raijin = Raijin || {};
	

	// Require Jquery as a dependency
    if (typeof jQuery === 'undefined') {
            throw new Error("Dependency Error.  Jquery is undefined.");
    }
	
	Raijin = {
	
		//current version of Raijin
		VERSION : 0.1,
		
		//vars
		mouseX : null,
		mouseY : null,
		
		//main array to hold storyEvent
		storyScript: new Array(),
		
		init: function() {
			Raijin.mouseEvents.init();
			
			//add fake mouse to be used during playback.  fake mouse initially is hidden
			Raijin.story.registerFakeMouse();
		}
	};

	Raijin.mouseEvents = {
			//set root jquery object
			w : $(root),
			
			//bool to check for recording
			recordAllowed: false,
			
			init: function() {
				this.trackMousePosition();
				this.onMouseClick();
			},
						
			//trace mouse position
			trackMousePosition: function() {
				var self = this;
				this.w.mousemove(function(e){
				     var se = self.setStoryEvent('mousemove', e);
					 self.addStoryEvent(se);
				 });
			},
			
			//log mouse click
			onMouseClick: function() {
				var self = this;
				this.w.click(function(e) {
					var se = self.setStoryEvent('click', e);
					self.addStoryEvent(se);
				});
			},
			
			//get mouse position @return string "mouseX, mouseY"
			getMousePosition: function() {
				var position = Raijin.mouseX + "," + Raijin.mouseY;
				return position;
			},
			
			//creates a storyEvent object in format to be passed to story object
			setStoryEvent: function(type, event) {
				 Raijin.mouseX = event.pageX;
				 Raijin.mouseY = event.pageY;
				 var storyEvent = {
					type: type,
					mouseX: Raijin.mouseX,
					mouseY: Raijin.mouseY
				 }
				return storyEvent;
			},
			
			addStoryEvent: function(storyEvent) {
				if(!(this.recordAllowed)) return;
				Raijin.storyScript.push(storyEvent);
			}
	}

	Raijin.story = {
		//story state
		state: "initialized",
		timer: null,
		currentFrame: 0,
		frameRate: 15,
		prevMouseX: null,
		prevMouseY: null,
		
		//append a fake mouse to be used during playback
		registerFakeMouse: function() {
			cursor = '<img src="/raijin/images/cursor.png" id="raijin-cursor" style="position:absolute !important; z-index:100000; display:none;"/>';
			$('body').append(cursor);
		},
		
		//show the mouse and remove fake mouse image
		showMouse: function() {
			console.log('showmouse');
			$('#raijin-cursor').hide();
		},
		
		//hide the mouse and show fake mouse image
		hideMouse: function() {
			//$('*').css('cursor','none');
		},
			
		//play mouse recording
		play: function() {
			this.state = "playing";
			this.hideMouse();
			this.timer = setInterval("Raijin.story.playFrame()",this.frameRate);
		},
		
		//loop that runs each frame of playback
		playFrame: function() {

			//escape loop if we have completed the storyScript
			if(this.currentFrame === Raijin.storyScript.length) {
				this.stop();
				return;
			}
			
			//set new coordinates
			var mouseX = Raijin.storyScript[this.currentFrame].mouseX;
			var mouseY = Raijin.storyScript[this.currentFrame].mouseY;
			this.currentFrame ++;
			
			if(this.prevMouseX === null) {
					console.log('init');
					$('#raijin-cursor').css("left", mouseX)
									   .css("top", mouseY)
									   .show();
			} else {
				var xDiff = mouseX - this.prevMouseX;
				var yDiff = mouseY - this.prevMouseY;
				$('#raijin-cursor').animate({
				    left: "+=" + xDiff,
					top: "+=" + yDiff
				  }, 5);
			}
			
			//set previous coordinate for next run
			this.prevMouseX = mouseX;
			this.prevMouseY = mouseY;
			
		},
		
		stop: function() {
			this.state = "stopped";
			clearInterval(this.timer);
			Raijin.mouseEvents.recordAllowed = false;
			this.currentFrame = 0; //reset frame to 0;
			this.prevMouseX = null;
			this.prevMouseY = null;
			
			this.showMouse();
		},
		
		record: function() {
			this.state = "recording";
			this.clear(); //clear stories
			Raijin.mouseEvents.recordAllowed = true;
		},
		
		clear: function() {
			this.state = "clearing";
			Raijin.storyScript.length = 0;
		}
	}

	Raijin.output = {
			//export as json
			json: function() {
				
			},
			
			//export as xml
			xml: function() {
				
			},
			
			//output raw object
			raw: function() {
				console.log(Raijin.storyScript);
			}
	}	


	// methods ported from underscore.js
	Raijin._ = {
	  
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  delay : function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){ return func.apply(func, args); }, wait);
	  },
	
	}
	
	
	
	
	//expose Raijin object to window.
    root.Raijin = Raijin;
	root.Raijin.init();
})(window);