---
layout: post
title: "Make a 3D iPhone with CSS"
description: "Transformers. Headaches in disguise."
tags: [css]
newstylesheet: "iphone"
published: true
---

When front-end developers tire of positioning, fonts, floats and divs, they make fun stuff. Stuff that probably only works in Chrome or similar. This is one of those times. Here's a CSS-animated 3D phone:

<div class="phone-container">
  <div class="phone">
    <div class="front"> </div>
    <div class="back"> </div>
    <div class="left"> </div>
    <div class="left-top"> </div>
    <div class="left-bottom"> </div>
    <div class="right"> </div>
    <div class="right-top"> </div>
    <div class="right-bottom"> </div>
    <div class="shadow"> </div>
  </div>
</div>

## 3D Transforms

CSS3 includes some handy tools for rotating, moving and scaling within the 3D space. When you introduce transitions, you can animate and move things around in interesting ways.

## Setting the stage

When creating a 3D object using CSS, the first thing to create is the container that holds the object. You can define this in the usual way, using width and height, and then specify a value for <code>perspective</code>. The perspective value is used to set the vanishing point that is then applied to any child objects. The smaller the value, the more dramatic the effect:

<style>
.grid-example {
  width: 80%;
  height: 150px;
  overflow: hidden;
  border: 1px solid #000;
  background-color: #000;
}
.grid-example label {
  display: block;
  width: 100%;
  text-align: center;
}
.grid-example section {
  width: 100%;
  height: 100%;
  background: url(/images/posts/grid.png);
  -webkit-transform: translateY(50%) rotateX(45deg) translateZ(100px);
  transform: translateY(50%) rotateX(45deg) translateZ(100px);
}
</style>
<div class="third">
  <div class="grid-example one" style="-webkit-perspective: 2000px;-moz-perspective: 2000px;perspective: 2000px;"><section></section></div>
  <label>Perspective: 2000px</label>
</div>
<div class="third">
  <div class="grid-example two" style="-webkit-perspective: 500px;-moz-perspective: 500px;perspective: 500px;"><section></section></div>
  <label>Perspective: 500px</label>
</div>
<div class="third">
  <div class="grid-example three" style="-webkit-perspective: 100px;-moz-perspective: 100px;perspective: 100px;"><section></section></div>
  <label>Perspective: 100px</label>
</div>
<p class="clearfix"></p>

## Putting together the pieces

One the container has been given a perspective, you can then set up the pieces that make up your 3D object. Positioning the pieces is done using the <code>transform</code> property. Transform is given a chain of effects, including rotate, scale and translate.

    transform: effect1(value) effect2(value) effect3(value)...

As shown above, the effects can be chained. It's important to keep in mind that they apply from left to right. Here's an example:

    transform: translateX(50px) translateY(50px) rotateY(45deg)

The above would <code>translate</code> the object along the X axis 100 pixels, then translate it along the Y axis 100 pixels, then rotate it 45 degrees. It should look something like this:
<style>
.rotate-container {
    width: 200px;
    height: 200px;
    -webkit-perspective: 400px;
    -moz-perspective: 400px;
    perspective: 400px;
    background: #fff;
    border: 1px solid #eee;
    margin: 10px auto;
    -webkit-border-radius(5px);
    border-radius: 5px;
}
.rotate-example {
    width: 100px;
    height: 100px;
    background: red;
    -webkit-transform: translateX(50px) translateY(50px) rotateY(45deg);
    -moz-transform: translateX(50px) translateY(50px) rotateY(45deg);
    transform: translateX(50px) translateY(50px) rotateY(45deg);
}
</style>
<div class="rotate-container">
    <section class="rotate-example"></section>
</div>

## iPhone 5

Using the free iPhone5 template [from Carter Digital](http://carterdigital.com.au/download/iphone_5_gui_psd/free_iphone_5_gui_psd.zip), I cobbled together the front and side pieces. The side pieces needed some adjustment as all pictures I could find where at an angle.

<img src="/images/phone_parts/parts.png" width="100%" alt="All the phone bits." />

One area I had trouble with was the corners. Since they're curved, I cropped the top and bottom off the side images, and replaced them with an angled black div. It's a bit like a low polygon action game look, but it hides the gap where there should be a curved corner.

## Try it for yourself!

Rather than explain setting up each of the pieces, here's a chance to see each piece of the iPhone above being assembled. In the CSS code, uncomment each "/\*" to see the associated piece of the phone animate into place. You can change the transforms and see the changes take effect on the displayed phone.

<div class="thirty-percent">
    <div class="phone-container ex">
      <div class="phone">
        <div class="front"> </div>
        <div class="back"> </div>
        <div class="left"> </div>
        <div class="left-top"> </div>
        <div class="left-bottom"> </div>
        <div class="right"> </div>
        <div class="right-top"> </div>
        <div class="right-bottom"> </div>
        <div class="shadow"> </div>
      </div>
    </div>
</div>
<div class="seventy-percent">
<style>
.phone-container.ex * {
  position: absolute;
  -webkit-transition: all 1500ms;
  opacity: 0;
}
.phone-container.ex .phone {
  -webkit-animation: rotate-phone 15s linear infinite;
  left: 50px;
  opacity: 1;
  -webkit-transform-style: preserve-3d;

}
.phone-container.ex .shadow {
  opacity: 0.7 !important;
}
</style>
<pre id="phone-example-code"><style type="text/css" class="editable-styles" contenteditable="true">.phone-container.ex .front {
  opacity: 0.7;
  -webkit-transform: translateX(-125px) rotateY(0deg) translateZ(14px);
}
.phone-container.ex .left {
  -webkit-backface-visibility: visible;
  -webkit-transform: none;
  /* opacity: 0.7;
  -webkit-transform: translateX(-138px) rotateY(-90deg); */
}
.phone-container.ex .left-top {
  -webkit-transform: none;
  /* opacity: 0.7;
  -webkit-transform: translateX(-129px) rotateY(-90deg) rotateX(30deg); */
}
.phone-container.ex .left-bottom {
  -webkit-transform: none;
  /* opacity: 0.7; 
  -webkit-transform:  translateX(-131px) translateY(490px) rotateY(-90deg) rotateX(-30deg); */
}
.phone-container.ex .right {
  -webkit-backface-visibility: visible;
  -webkit-transform: none;
  /* opacity: 0.7;
  -webkit-transform: translateX(105px) rotateY(90deg); */
}
.phone-container.ex .right-top {
  -webkit-transform: none;
  /* opacity: 0.7;
  -webkit-transform: translateX(98px) rotateY(-90deg) rotateX(-30deg);
}
.phone-container.ex .right-bottom {
  -webkit-transform: none;
  /* opacity: 0.7;
  -webkit-transform: translateX(100px) translateY(490px) rotateY(-90deg) rotateX(30deg); */
}
.phone-container.ex .back {
  -webkit-transform: translateX(-125px);
  /* opacity: 0.7;
  -webkit-transform: translateX(-125px) rotateY(180deg) translateZ(13px); */
}
</style></pre>
</div>
<p class="clearfix"></p>

## Animating the result

In this example I've added a drop shadow using CSS, and animated the entire phone using a couple of keyframes. To see this and more, grab the [full iPhone CSS source](/stylesheets/iphone.css) for all the rules and browser prefixes.

Please let me know if you have any questions or feedback. My email is [d@hop.ie](mailto:d@hop.ie) and I can also be reached on Twitter at [@donovanh](http://twitter.com/donovanh).

