---
layout: post
title: "Introduction to AngularJS"
description: "Making your browser the way it should have been."
tags: ['development']
published: true
javascripts: ['angular']
bodyTag: 'ng-app'
---
JavaScript frameworks have been taking great strides in the last couple of years. [Backbone.js][1], [Knockout][2], [Ember][3] and many others offer new ways to keep your app data separate from the DOM, and making interesting web applications that work in the browser is getting easier and easier.

Introducing [AngularJS][4]. Billing itself as a "superheroic javascript <acronym title="Model View Whatever">MVW</acronym> framework", AngularJS aims to make web browsers better at web apps. It offers two-way data binding, built-in templating, testing, and even a way to create your own HTML tag behaviour.

While most of the new frameworks aim to offer an agnostic set of tools, AngularJS is opinionated. This brings a bit of a learning curve, but leads to very lean code that can be more easily understood by others familiar with the AngularJS approach.

##Look ma, no code!

The way AngularJS handles two-way binding allows for very light code. Binding data between the model and DOM is as easy as declaring the model in a controller function, and referencing the model in the HTML. 

Input methods such as text or textarea fields are handled most easily, and more advanced binding is handled by the use of "directives". Here's a simple example:

##Hello {% assign world = '{{world}}' %}{{world}}!

<input type="text" ng-model="world" placeholder="Say hello!" />

The heading above contains a "world" variable in curly braces:

<code class="ng-non-bindable">
	Hello {{world}}!
</code>

The input text field references the "world":

	<input type="text" ng-model="world" placeholder="Say hello!" />

The curly braces describe variables (or functions), and is in this case "world". By telling AngularJS that the input uses a model by the same name. The binding between the two is handled automatically behind the scenes.

Aside from the above code, all that's needed is to declare "ng-app" as an attribute on a containing element ("body" in this case), and to include the AngularJS library.

The de facto standard ToDo list implementation is demonstrated [on their homepage][4].

##Directives: Creating your own tags

Instantly updated two-way binding between inputs and models is a great start, but AngularJS goes further with [directives][8]. Directives let you create custom behaviour for bespoke HTML tags and attributes. This means you can style and display the model data how you wish, and maintain it's behind-the-scenes binding.

I'll admit, the structure of directives took me a while to get my head around. It's possible to achieve a lot with AngularJS' many built in functions, but extending and customising your data with directives is very much worth a little extra effort.

The end result is bespoke HTML tags and behaviours that can be thrown into layouts, moving much of the code and logic away from the templates. It's even been used to recreate the [blink tag][6].

John Lindquist has [a directive screencast][7] available, which is a great introduction to the idea.

One more example. In the above code I wrapped the <span class="ng-non-bindable">"Hello {{world}}"</span> text in code tags with the "ng-non-bindable" attribute. The attribute is itself a form of directive.

##Community

The community behind AngularJS is vibrant and there are plenty of examples and places to discuss issues. The [AngularJS Google Group][11] is active, along with the IRC channel (#angularjs on freenode), and the [official documentation][12] includes many examples. While some of the examples might have issues from the transition between versions 0.9 and 1.0, they seem to be catching up.

The AngularJS site includes a great [showcase area][13] for completed projects, which even includes a wonderful [ermagerd translator][14].

##Templating, testing and more

As shown above, AngularJS allows for the curly brace style of template variables. It offers custom functionality, including loops and other logic that can be delivered along with the templates, which makes directives even more powerful. It also includes tools for the injection of tests to ensure your code does what it is supposed to. I'll expand on these topics as my understanding of this interesting framework grows.

In the meantime, do check out the [AngularJS tutorial pages][9], and their [Youtube videos][10] for more info.

 [1]: http://backbonejs.org/
 [2]: http://knockoutjs.com/
 [3]: http://emberjs.com/
 [4]: http://angularjs.org/
 [5]: http://net.tutsplus.com/tutorials/javascript-ajax/5-awesome-angularjs-features/
 [6]: http://blog.petermolgaard.com/2012/05/31/how-to-implement-a-blink-tag-in-angularjs/
 [7]: http://johnlindquist.com/2012/04/16/angularjs_directive_tutorial.html
 [8]: http://docs.angularjs.org/guide/directive
 [9]: http://docs.angularjs.org/tutorial
 [10]: http://www.youtube.com/watch?v=WuiHuZq_cg4
 [11]: https://groups.google.com/forum/?fromgroups#!forum/angular
 [12]: http://docs.angularjs.org/
 [13]: http://builtwith.angularjs.org/
 [14]: http://ermahgerd.jmillerdesign.com/#!/translate
 
