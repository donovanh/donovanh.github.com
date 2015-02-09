---
layout: post
title: "Launching a new site"
description: "Things I learned while creating CSSAnimation.rocks"
tags: [running, non-computer]
imageURL: rocks.png
published: false
---

There's a lot that goes into creating and launching a new website. Thankfully websites are easier to launch than software or even a native mobile application. [FINISH INTRO LAST] [Mention the numbers of subscribers and numbers of readers the posts have got in the first few weeks (about 14k visitors and close to 20k pageviews) from zero in two weeks]

In this post I'll discuss the steps involved in planning, building and launching [CSSAnimation.rocks](http://cssanimation.rocks).

## Initial idea

At the beginning of 2015, I began to write a book. I had been thinking of topics and brainstorming ideas for a few weeks, and when January arrived I'd decided to focus on CSS animation as my topic.

My initial plan was to focus on writing the book while building a basic landing page with signup form. Once I began, it became clear I had a lot of work to do. A simple landing page wasn't going to be enough, I needed to work on expanding my knowledge of the topic and building an audience along the way.

After taking some advice from the wonderful Paul Boag, I'd decided to create a website specifically about CSS animation. So I got to work building it.

## Choosing a name

Some people can start working on a project without a name. I'm not so great at that. I also tend to get unhealthily excited about choosing domain names. The effort required to resist registering all the names is unbearable.

I settled on the domain [cssanimation.rocks](http://cssanimation.rocks). It's a simple, straightforward name that is obvious, and the "rocks" domain name is fun. CSS animation absolutely does rock.

## Creating the story

It's one thing having a domain name, but a website needs a bit of narrative, or something more to act as a hook. Considering this in the shower, the crazy idea occurred to me that I should go for the literal meaning of rocks. As in stone.

Rock's aren't exactly known for being **animated**. All the more reason to play on the theme, as far as I'm concerned. It would certainly be more memorable than a fist in the air.

With a name and a bit of a theme, I opened Illustrator and drew some ideas for how some rocks might look. I put together the initial draft of the logo, and drew a smiling rock that would act as a mascot.

[TODO: SVG of the rock smiling]

The design could do with some polish but it would do for a start. The next thing was to decide some goals.

## Setting goals for the site

I wanted the site to be fun and educational, and include lots of examples and tutorials around the subject of CSS animation. Having written quite a few tutorials here over the past couple of years, I knew that was something I enjoyed doing, so seemed like a good approach.

At the same time, I'd already been fleshing out the topics for what will become a book on the topic. Part of that was going through each of the CSS properties involved and describing what they were for. While still a rough draft, it could act as a reference. This reference could include examples, link to relevant tutorials, and act as a launching point for exploring the topic.

Through this, the goal was to use Twitter, along with emails, to build up an audience and create some momentum around the project. Having a useful, visible side project has been helpful to me in many ways over the years. It's not only a great place to try and learn new skills, but can also result in creating more opportunities to collaborate or work with others.

There's no better way to work on what you like that to work on what you like first.

## Technology and hosting choices

With a url, a basic theme chosen, some images drawn up, and a goal in mind I set about building the site. This site runs on [Jekyll](http://hop.ie/blog/jekyll-github-pages/) and is hosted on Github, two services I was quite familiar with using and knew were reliable and secure.

Jekyll is a free open-source blogging platform that generates static HTML. This means that when it serves pages, it doesn't generate the content each time it's requested. Instead it runs once to generate a set of static HTML pages, and every time a request comes through, these are served. It means that there's no server-side code to maintain, nothing to update and page requests are very fast.

Github offers a service that runs Jekyll natively and also hosts static HTML pages at custom URLs. While these static HTML pages could also be deployed to a server or to a service such as Amazon Web Services.

### Adding in Sass, Autoprefixer

Over the past year I've set up a few Jekyll blogs, and I have wrangled a few Grunt and Gulp files to help take care of things like Sass. I can tell you it's not worth the hassle.

While Jekyll **does** support Sass now out of the box, it doesn't have any mechanism for Autoprefixer, Linters and other tools useful when building front-end code. After a bit of research I settled on setting up the site using [Yeoman](http://yeoman.io/), and specifically, the [Jekyllized](https://github.com/sondr3/generator-jekyllized) generator.

Yeoman's a handy tool for generating sites and cutting back on a lot of boring set up time. With the Jekyllized generator, I was able to set up the new site and run it locally using the `gulp` command.

This opens a browser window automatically, initialises Live Reload, and handles all the fancy Sass, etc.

### Skeleton grids and typography

... skeleton, jekyll, sass, gulp and github pages...

### Github Pages custom URL

### Deploying - not ideal but works

## Making content

## Publishing and spreading the word

## Maintaining momentum

## Future plans

