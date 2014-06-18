---
layout: post
title: "Particles in Canvas"
description: "Using JavaScript to generate particle effects using HTML5 Canvas."
tags: [development, javascript]
imageURL: fountain_small.gif
published: true
---

Canvas is an exciting new way to create animated content for the web. With it you can create eye-catching animation in the web browser using only HTML and JavaScript, without adding much size to your web pages.

In this article I will explore some ways you can make use of canvas to create particles, bounce them around the screen and respond to gravity.

## The Canvas tag

HTML5 contains many tags and tools that allow you to create and animate amazing interactive content. This article will focus on the `canvas` element, and how you can use it to create animated scenes with JavaScript.

Introduced in 1994 by Apple, the `canvas` tag was initially designed to be used in the webkit-based Safari browser. However after it was adopted by Firefox and Opera it became a web standard and can now be used confidently across all major browsers.

Canvas is frequently used as a basis for HTML-based games as it allows for a self-contained area of a web page, within which you can draw and animate shapes, respond to user input and add interactivity to your page.

## Recommended: Zevan Rosser’s video tutorial

If you like to watch tutorials, one of the best introductions to the topic is presented by [Zevan Rosser](https://www.youtube.com/watch?v=YCI8uqePkrc). I would like to thank Zevan for the great introduction that helped me get started with `canvas`. Some of the examples that follow, including extending the Particle prototype, are based on his introduction.

### Follow along

As we progress through setting up and using Canvas, you'll find each of the examples [as a set online](https://github.com/donovanh/particles/tree/master/examples), and I'll link to a live example of each as we go. You'll also find all the files [on Github](https://github.com/donovanh/particles) for you to download.

## A blank canvas

Since `canvas` is natively supported by most browsers, there is no need for any additional plugins to get it to work. This means the following code should itself be enough to tell the browser that there is a canvas on the page:

    <canvas id="example" width="200" height="200">
      This text is displayed if your browser does not support HTML5 Canvas.
    </canvas>

Alternately, you can place a `canvas` element on a page using JavaScript.

    <script>
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 200;
      document.body.appendChild(canvas); 
    </script>

You won’t yet see anything on the page! This is ok. The next step is add some color by drawing a rectangle on the canvas that will act as a background.

Continuing the JavaScript we started above, we can make use of the `context` we created by running the `getContext` method. This `context` object is used for all drawing on this `canvas` element. For example, you could draw a black rectangle like so:

    context.fillRect(0, 0, canvas.width, canvas.height);

The `fillRect` method draws a filled rectangle on the canvas. It is used by setting the starting X and Y values in pixels, then the shape to draw. In this case we start the rectangle at the top left corner (0,0) and draw a rectangle that is the same width and height as the canvas.

<script async src="//codepen.io/assets/embed/ei.js"></script>

<p data-height="380" data-theme-id="0" data-slug-hash="KmBpv" data-default-tab="result" class='codepen'></p>

This example can be found in the [examples/01-canvas.html](http://hop.ie/particles/examples/01-canvas.html) file.

## Introducing a particle

We have a blank canvas drawn on the page, it’s now time to do some more drawing. We’ll start with a small rectangle that I’ll describe as a particle.

    // Draw a square particle on the canvas
    context.fillStyle = "white";
    context.fillRect(300, 200, 10, 10);

When a `fillStyle` is not specified, it will default to black. So before telling the canvas to draw a rectangle we set it to white. The rectangle this time is drawn at 300 pixels from the left, 200 pixels from the top, and is 10 by 10 pixels in size.

We can also draw other shapes. Canvas includes an `arc` function that can draw curved shapes, and we can use it to make a round particle.

    // Draw a circle particle on the canvas
    context.beginPath();
    context.fillStyle = "white";
    // After setting the fill style, draw an arc on the canvas
    context.arc(500, 200, 10, 0, Math.PI*2, true); 
    context.closePath();
    context.fill();

In creating a circle, we draw a path and use the `arc` method to do so. The `arc` method expects the following:

    content.arc(x, y, radius, startAngle, endAngle, anticlockwise)

We supply the `arc` method with a starting point, the size (radius) of the circle, and draw it by giving a start and end angle. If you’d like to learn more about creating circles using JavaScript, a nice interactive tutorial [can be found here](http://www.scienceprimer.com/drawing-circles-javascript-html5-canvas-element).

<p data-height="380" data-theme-id="0" data-slug-hash="CsKoj" data-default-tab="result" class='codepen'></p>

This example can be found at [examples/02-particle.html](http://hop.ie/particles/examples/02-particle.html).

## Movement

Moving objects around on a canvas is quite different from how you might have moved HTML elements around. Rather than move an existing object on a page, the illusion of movement is created on a canvas by erasing and redrawing the elements.

To illustrate this, we’ll start by moving the particle and drawing it again a number of times.

First, we’ll establish a starting position in the X and Y axes as variables:

    var posX = 20,
        posY = 100;

We then draw a particle, adjust the position, and repeat:

    // Draw shapes on the canvas using an interval of 30ms
    setInterval(function() {
      posX += 1;
      posY += 0.25;

      // Draw a circle particle on the canvas
      context.beginPath();
      context.fillStyle = "white";
      // After setting the fill style, draw an arc on the canvas
      context.arc(posX, posY, 10, 0, Math.PI*2, true); 
      context.closePath();
      context.fill();
    }, 30);

<p data-height="380" data-theme-id="0" data-slug-hash="CyFub" data-default-tab="result" class='codepen'></p>

Press **Rerun** to see the animation play again. This example is at ([examples/03-movement-a.html](http://hop.ie/particles/examples/03-movement-a.html)):

Since we are simply redrawing the particle on top of the previous canvas, we’ve created a line of particles. This isn’t quite what we want, so let’s instead erase the canvas each time. Adjust the top of the `setInterval` function to contain these lines:

    setInterval(function() {
      // Erase canvas
      context.fillStyle = "black";
          context.fillRect(0,0,canvas.width, canvas.height);
    ...

This will result in the canvas being redrawn each time, creating what looks like the particle moving across the canvas (`examples/03-movement-b.html`):

<p data-height="380" data-theme-id="0" data-slug-hash="AaJie" data-default-tab="result" class='codepen'></p>

This example is at ([examples/03-movement-b.html](http://hop.ie/particles/examples/03-movement-b.html)):

The basic idea here is that we can draw particles on the canvas, and when we want to move them we “redraw” the blank canvas, adjust where the particle is to be drawn, and draw it again.

We can extend this technique to create more interesting effects.

## Physics &amp; randomness

In the previous example we adjusted the position of the particle each time it was drawn by adding to the X and Y positions. Since we were adding the same amount each time, the particle moved in a straight line.

We can adjust the way we calculate these X and Y positions by introducing velocity and gravity. Where X and Y describes the position of a particle, the velocity of a particle describes the rate at which it is moving in the X and Y axes. We will describe these as VX and VY:

    // Initial velocities
    var vx = 10,
        vy = -10,
        gravity = 1;

The initial velocity means that each time the particle is drawn, it will be moving 10 pixels across and 10 pixels down. Since we set these values in variables, we can adjust them each time the `setInterval` function is called:

    posX += vx;
    posY += vy;
    vy += gravity;

Each time the particle is drawn we add the `vx` value to the particle’s X position, and the same for the corresponding Y position. 

The particle begins with a negative value for the Y velocity, making it move up the screen. Since we then add the `gravity` value to the Y velocity, the particle slows as that value approaches zero, then accelerates as the Y velocity continues to increase each time.

<p data-height="380" data-theme-id="0" data-slug-hash="KzAbt" data-default-tab="result" class='codepen'></p>

You can press **Rerun** to see the animation again. The example can be found at [examples/04-gravity-a.html](http://hop.ie/particles/examples/04-gravity-a.html).

### Bouncing

With a little more logic we can have the particle bounce along rather than drop straight off the screen. Rather than simply adjust the Y velocity, we can test if the particle has reached a certain height and flip the direction of the particle. 

    if (posY > canvas.height * 0.75) {
      vy *= -0.6;
      vx *= 0.75;
      posY = canvas.height * 0.75;
    }

In this case we test to see if the particle’s height is greater than is 75 percent from the top of the canvas. If so, it’ll multiply it’s Y velocity by *minus* 0.6. This has the effect of both flipping it from a downward direction to upward, but also slows it down by 40%. If the particle has a Y velocity of 10 at this point, it would then become -6.

The next time the particle is drawn, it’s Y position would move up 6 pixels instead of down.

At the same time, the X velocity is reduced by 25%. This causes the particle to slow as it moves across the screen.

Since we are still applying the gravity adjustment to the Y velocity, the negative number will again approach zero and become positive, resulting in a bounce effect.

<p data-height="380" data-theme-id="0" data-slug-hash="diJua" data-default-tab="result" class='codepen'></p>

This example is at [examples/04-gravity-b.html](http://hop.ie/particles/examples/04-gravity-b.html).

## Randomness

So far we’ve created some particles, animated them, and added some gravity into the equation. Next we’ll extend the example to generate multiple particles and add in some randomness in the way they move.

### Generating particles

Where we have been working with just the one particle so far, we need to extend our code to generate multiple particles. 

To do this we will create a function called `Particle` that will be called as many times as we need and will create a particle each time. It will act as a generator for each particle and allow us to manipulate them, have them move independently, and be removed without affecting other particles.

First though, we’ll want to reuse some settings within this particle function so we’ll set up the settings as an object.

    var particles = {},
        particleIndex = 0,
        settings = {
          density: 20,
          particleSize: 10,
          startingX: canvas.width / 2,
          startingY: canvas.height / 4,
          gravity: 0.5,
          maxLife: 100
        };

We have initialised an empty `particles` object, to contain the generated particles, and then set some values which we will use in the function. These settings will be useful later when we add more interactivity and allow them to be changed on the fly. For now though, here’s the function that will generate a particle:

    function Particle() {
      // Establish starting positions and velocities
      this.x = settings.startingX;
      this.y = settings.startingY;

      // Random X and Y velocities
      this.vx = Math.random() * 20 - 10;
      this.vy = Math.random() * 20 - 5;

      // Add new particle to the index
      particleIndex ++;
      particles[particleIndex] = this;
      this.id = particleIndex;
      this.life = 0;
    }

Taking its values from the settings, this function sets (using `this`) both the initial X and Y positions. The X and Y velocities are then generated using JavaScript’s `Math.random()` method. With the starting position and velocities generated, it then increments  a cursor (`particleIndex`) and uses this cursor to place this particle into the `particles` object.

Rather than use an array to hold the set of particles, it’s easier to manage an object with keys and values, as it makes removing the particles later easier.

Lastly we set the `life` of the particle to zero. This is a counter we’ll use to determine when to have the particle vanish so that the screen doesn’t end up full of particles.

### Drawing the many particles

So far we have an object containing multiple particles. We need to create a method that draws these particles on the screen, and updates their position according to the velocity settings.

To draw the on the screen we can extend the `Particle` function by adding a `draw` method.

    Particle.prototype.draw = function() {
      this.x += this.vx;
      this.y += this.vy;

      // Adjust for gravity
      this.vy += settings.gravity;

      // Age the particle
      this.life++;

      // If Particle is old, remove it
      if (this.life >= settings.maxLife) {
        delete particles[this.id];
      }

      // Create the shapes
      context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
      context.beginPath();
      context.fillStyle="#ffffff";
      context.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2, true); 
      context.closePath();
      context.fill();
    }

This method achieves a couple of things. Firstly it adjusts the particle’s velocity by adding on the particle’s velocity to its position. Since these velocity values have been randomly generated, it results in the particle being moved a random amount in both axes.

The Y axis is adjusted for gravity, as before. We then “age” the particle by incrementing it’s `life` value. When this `life` value reaches the `maxlife` value, it is then removed.

If it’s not removed, we then finish by drawing the particle on the canvas.

The result is a random-looking spray of particles, falling off the screen with the effect of gravity.

<p data-height="380" data-theme-id="0" data-slug-hash="qwxLl" data-default-tab="result" class='codepen'></p>

This example is at [examples/05-multiple.html](http://hop.ie/particles/examples/05-multiple.html).

## Walls

Using some ideas from the [gravity example earlier](http://hop.ie/particles/examples/04-gravity-b.html), we can add some walls to bounce the particles around.

Begin by setting some values for where the walls will be placed:

    settings = {
      ...
      groundLevel: canvas.height * 0.75,
      leftWall: canvas.width * 0.25,
      rightWall: canvas.width * 0.75
    };

We add some extra values to the settings object. A ground level, left wall and right wall are represented as being 3/4 of the way down the canvas, 1/4 in from the left and 3/4 across the canvas. When drawing the particles we can check the particle’s position against these values, and reverse the particle’s motion when it hit’s a “wall”.

Let’s add a few lines to the `draw` method to check for these walls:

    Particle.prototype.draw = function() {
      ...
      // Bounce off the ground
      if ((this.y + settings.particleSize) > settings.groundLevel) {
        this.vy *= -0.6;
        this.vx *= 0.75;
        this.y = settings.groundLevel - settings.particleSize;
      }

      // Determine whether to bounce the particle off a wall
      if (this.x - (settings.particleSize) <= settings.leftWall) {
        this.vx *= -1;
        this.x = settings.leftWall + (settings.particleSize);
      }

      if (this.x + (settings.particleSize) >= settings.rightWall) {
        this.vx *= -1;
        this.x = settings.rightWall - settings.particleSize;
      }

      // Adjust for gravity
      this.vy += settings.gravity;

      // Age the particle
      ...
    }

There are three comparisons happening here. First, the particle’s Y position is checked to see if it’s greater that the ground level. The position value is measured from the top of the screen so in this case, a large number means further down the screen.

We also allow for the size of the particle, as the Y value is actually the top-left corner of the particle. By adding on the particle’s size, we prevent the particle’s bottom from moving through the wall.

### Drawing the walls

While this covers the “bounce” effect of the particles, we can make it look better by drawing in some walls. Adjust the `setinterval` function to contain the following:

    setInterval(function() {
      ...
      // Draw a left, right walls and floor
      context.fillStyle = "white";
      context.fillRect(0, 0, settings.leftWall, canvas.height);
      context.fillRect(settings.rightWall, 0, canvas.width, canvas.height);
      context.fillRect(0, settings.groundLevel, canvas.width, canvas.height);
      ...

We’re drawing 3 rectangles in white which start at the wall positions we put in the settings earlier.

<p data-height="380" data-theme-id="0" data-slug-hash="FHtwk" data-default-tab="result" class='codepen'></p>

This example is at [examples/06-walls.html](http://hop.ie/particles/examples/06-walls.html).

## Adjustable settings

Since we’re using a `settings` object to hold the settings, we can adjust them easily and see the effects changing on the canvas. If you go into any of the later example files, this is a great way to experiment and see how changing various values can result in very different effects.

We can go further and make use of a great plugin called [dat.gui](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) to make it easier to play with these settings.

Setting up `dat.gui` is simply a case of referencing the JavaScript plugin, and telling it which values we’d like to play with. Firstly, we’ll call in the script from a CDN:

    <script src="http://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js"></script>

Then with that included, we can initialize it and tell it which settings we’d like to use:

    var gui = new dat.GUI();

A `gui` object is initialized using `new dat.GUI()` and then from here each of the various settings is added. These are structured as follows:

    gui.add(object, 'property', values)

In this case, `object` is the JavaScript object containing preset values. A property within that object is then specified, and finally a possible range of values that it can use. In our case we specify a bunch of settings like this:

    gui.add(settings, 'density', 0, 5 );
    gui.add(settings, 'particleSize', 1, 50 );
    gui.add(settings, 'gravity', -2, 2 );
    gui.add(settings, 'startingY', 0, canvas.height * 0.75 )
    gui.add(settings, 'groundLevel', 0, canvas.height );
    gui.add(settings, 'leftWall', 0, canvas.width * 0.4);
    gui.add(settings, 'rightWall', canvas.width * 0.6, canvas.width);
    gui.add(settings, 'blur', 0.1, 0.9);

Going through this list we see various items that are reflected in the `settings` object. The particle density takes a value between 0 and 5, and other settings include the size of the particles, positions  of the walls and many others. See it in action:

For performance reasons, it's best to [run this in another tab](http://hop.ie/particles/examples/07-settings.html). Play with the settings and see the results in real time.

Lots more great examples can be found on the [dat.gui](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) website.

## Going further

### Blur

If you’re reading closely you may have noticed a `blur` setting in the previous code. Something you can do with canvas is adjust the transparency of the color being drawn to the canvas.

With RGBA, we adjusting the `alpha` part results in a slightly-transparent block of color being drawn over the scene.

If the alpha value is lower, it takes more redraws to completely hide the particle, and the result is a kind of blur as previous versions of the particle show through.

Play with the `blur` value in [the settings example](http://hop.ie/particles/examples/07-settings.html) to see how this changes the way the scene looks.

### Using background images

Rather than stick with plain particles against a flat background, we can set up a more interesting scene by using background graphics.

Up till now we’ve been redrawing the scene by drawing a solid black box over the canvas each time. It’s possible to instead erase the canvas contents using `clearRect`:

    context.clearRect(0, 0, canvas.width, canvas.height);

This preserves the transparent background and allows anything that is behind the canvas to show through.

You could then add a background image and layer the canvas effect on top:

<a href="http://hop.ie/particles/fountain.html"><img src="/images/posts/particles/fountain_small.gif" width="300"></a>

See this [fountain example live here](http://hop.ie/particles/fountain.html).

In this example, I’ve included a great photo by  [Garry Forger](http://econtent.arizona.edu/people/garry-forger) of The University of Arizona, of the [Alexander Berger Memorial Fountain](http://parentseyes.arizona.edu/placesinthesun/alexander.php).

## Sparking ideas

Canvas is a great way to create self-contained, animated content within web pages without the need for any additional plugins or downloads. While browser support is not 100% yet, it’s at a stage now where we can confidently start using the technology and looking for ways it can add extra value to our projects.

I hope this introduction to canvas and particles has inspired some ideas of your own. I look forward to seeing what great things you create and share.

If you’d like to learn more about canvas, [The Expressive Web](http://beta.theexpressiveweb.com/#!/html5-canvas/) has a great overview and reference to the subject.

I can be found on Twitter as [@donovanh](http://twitter.com/donovanh) and am always happy to answer any questions, and hear your ideas.


