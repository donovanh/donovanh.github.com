---
layout: post
title: "Introducing Node.js"
description: ""
tags: [development, node, server-side]
published: false
---

This post is based on [a talk](/talks/node-intro/) delivered at [MMUG Dublin](http://www.meetup.com/augdublin/events/106312122/) on March 12th, 2013.

## Node

I first got excited about computers when I was in my early teens, using an old Amiga to sample sound effects and create music. I also spent a long time creating 3D scenes and leaving the computer on overnight to render them. What motivated me most was how I could use this technology to make cool stuff. 

As I got online and started learning how to make websites to show off this music and artwork, I got into using HTML, then CSS, Flash and JavaScript to make stuff on the web. Again, the motivation was finding exciting and rewarding ways to make cool stuff.

Over the decade that followed I learned how to set up servers and server-side code, as a means of creating more functional and useful websites. Using PHP and then later, Ruby, to create the engines that powered websites was great, but I always prefered to get the back-end written and working and spend more time working on the front-end code. So while PHP and the likes were handy tools, they were a means to an end.

### JavaScript on the server

Last year, when I decided to take a look at Node.js, I was pleasantly surprised to find that it was all JavaScript. The idea that I could write an application entirely in JavaScript was intruiging.

Node.js is itself [written in JavaScript](https://github.com/joyent/node/blob/master/src/node.js), but there's more to it than simply bringing JavaScript to the server. It sets out to provide an [event driven](http://en.wikipedia.org/wiki/Event-driven_programming) method of writing applications that are [non-blocking](http://en.wikipedia.org/wiki/Non-blocking_algorithm).

## Event-driven

An analogy that might help visualise the issue Node.js tries to address is that of a Doctor's office and a fast food restaurant. [Dan York](http://code.danyork.com/2011/01/25/node-js-doctors-offices-and-fast-food-restaurants-understanding-event-driven-programming/) explains it well, but to summarise, it's something like this.

When you visit a doctor, you wait in a waiting room and go in to see the doctor. The doctor can only see one person at a time, and everyone else must wait. However, when you go to a fast food restaurant, you place your order at the counter then wait. Meanwhile, the next person places their order and waits. Then, when your order is ready, it is brought to you.

The key difference here is that a blocking process is one that causes the system to wait and stop processing new requests until the old one has finished. On the other hand, the non-blocking approach is to keep taking on new processed while the previous processes are waiting.

The way Node.js tackles this is through the use of [callbacks](http://stackoverflow.com/questions/4506240/understanding-the-concept-of-javascript-callbacks-with-node-js-especially-in-lo). A callback is a function that is called after something has happened. For example, if you 


## Asynchronous


