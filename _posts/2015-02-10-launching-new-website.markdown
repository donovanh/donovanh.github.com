---
layout: post
title: "Launching a new site"
description: "Things I learned while creating CSS Animation"
tags: [css animation]
imageURL: rocks.png
published: true
---

There's a lot that goes into creating and launching a new website. In this post I'll discuss the steps involved in planning, building and launching [CSSAnimation.rocks](https://cssanimation.rocks).

## Initial idea

At the beginning of 2015, I began to write a book. I had been thinking of topics and brainstorming ideas for a few weeks, and when January arrived I'd decided to focus on CSS animation as my topic.

My initial plan was to focus on writing the book while building a basic landing page with signup form. Once I began, it became clear I had a lot of work to do. A simple landing page wasn't going to be enough, I needed to work on expanding my knowledge of the topic and building an audience along the way.

After taking some advice from the wonderful Paul Boag, I'd decided to create a website specifically about CSS animation. So I got to work building it.

## Choosing a name

Some people can start working on a project without a name. I'm not so great at that. I also tend to get unhealthily excited about choosing domain names. The effort required to resist registering all the names is unbearable.

I settled on the domain [cssanimation.rocks](https://cssanimation.rocks). It's a simple, straightforward name that is obvious, and the "rocks" domain name is fun. CSS animation absolutely does rock.

## Creating the story

It's one thing having a domain name, but a website needs a bit of narrative, or something more to act as a hook. Considering this in the shower, the crazy idea occurred to me that I should go for the literal meaning of rocks. As in stone.

Rock's aren't exactly known for being **animated**. All the more reason to play on the theme, as far as I'm concerned. It would certainly be more memorable than a fist in the air.

With a name and a bit of a theme, I opened Illustrator and drew some ideas for how some rocks might look. I put together the initial draft of the logo, and drew a smiling rock that would act as a mascot.

<img src="/images/posts/cssanimation/rocky.svg" style="max-width:300px" alt="Smiling rock image used as a mascot">

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

This opens a browser window automatically, initialises Live Reload, and handles all the CSS preprocessing.

### Skeleton grids and typography

There are a lot of frameworks designed to help designers and developers scaffold a web page quickly. [Bootstrap](http://getbootstrap.com/) is one, [Zurb Foundation](http://foundation.zurb.com/) is another.

I didn't need many of the advanced tools these provided, so decided to go with a simpler option, [Skeleton](http://getskeleton.com/). Skeleton provides a light grid framework, nicely proportioned fonts, and some helpful utilities, including styles for buttons and form elements.

Since I was using Sass, the Sass option was a handy way to bring the framework into my CSS and use it as a starting point.

### Github Pages custom URL

I use Github to manage the code. This means it's in a safe place should I lose my work locally. It also means I can host the pages as raw HTML files using Github Pages. You can use a custom URL with Github Pages by telling it your URL in a `CNAME` file.

The content of the `CNAME` was simply: `cssanimation.rocks`

The next step was to add an `A` record to my DNS to point to Github's IP address. This then points the browser to Github, and they connect up the request to the right files. More instructions on setting up custom URLs is [available here](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/).

### Deploying - not ideal but works

While it's possible to deploy Jekyll sites directly to master (if you name your repo `username.github.io`), I wasn't able to get it to work with the Jekyllized set up. Because I had a non-standard Jekyll setup, it didn't run as expected. Instead I found I could push the contents of the `serve` directory directly to a `gh-pages` branch.

It's an extra step but works for now. I don't doubt there's a better way but my goal was to get up and running quickly, and it's enough.

## Making content

With the site in place the next step is to create content. It's easy to spend a lot of time bike-shedding, looking at design details, font choices, colours etc, but at some point you need to take the step of writing something people might want to read.

Before starting to write, I created a spreadsheet for potential topics, along with other content I might want to create at some stage. This list gives me a decent set of ideas should I be stuck, and acts as a record of topics covered.

From this I picked the first topic, [Twitter's "fave" animation](https://cssanimation.rocks/twitter-fave/). A couple of hours creating the demo and code, then another few hours writing up the description of the process involved, and I had my first post.

Before publishing I was starting the second post, [Animating pseudo-elements](https://cssanimation.rocks/pseudo-elements/). As I write this, I have two more posts in the pipeline almost ready to publish. This gives me time to polish them and update them for a while before they go live.

## Publishing and spreading the word

Often I publish articles a little earlier than I'm comfortable. There may be the occasional typo, or even small issues with the demo code, but I find it helps to get feedback as soon as possible, and budget time to fix up the article over the first few days.

Your milage may vary but I find that if I sit on an article for too long, it feels stale and I struggle to give it as much attention. If it's live, and I hear of a typo, I act immediately.

With the article published, I put out word. Twitter's a good place to start. There are some people that have followed me over the last couple of years that would often retweet or mention articles if I let them know.

A second option is a mailing list. Email is far from dead, and is still a good way to reach people when you want to let them know about new content. It's a bit more work setting up a message but worth it.

The next step is to contact relevant newsletters. I follow some great newsletters and they're often happy to receive submissions for inclusion. As long as your content matches the audience for the news letter, it's a good way to quickly reach a larger number of people.

## Maintaining momentum

Over the next week after the initial article went live, I continued to mention it to people that might like it, and it was featured in three newsletters. It also made the first page of [Designer News](http://news.layervault.com). Between these, it received over 10 thousand visits.

This was a great start. Better than I'd hoped, and it brought with it quite a few email sign ups and Twitter followers. The next week, I did the same but also sent a newsletter update to the new sign ups, and again received over 10 thousand visits that week.

While it's very exciting to get a bunch of visitors, it's better to maintain momentum. Something I found when blogging here over the years was that the visitors can drop off very quickly. Spending months making a single blog post is great and produces interesting results, but a more consistent result comes from frequent, smaller posts.

I'm aiming to post on the [CSS Animation Rocks](https://cssanimation.rocks) site at least twice per month. I feel a weekly update would be good but until I can set aside more time, a little less often will do.

## Future plans

I'd like to also build out the site as a reference for [CSS animation properties](https://cssanimation.rocks) and how to use them. This will be quite a lot of work so I may put this back a while until the book is further along.

Beyond this, I'd like to keep on enjoying making content more than anything else. I have no doubt there will be more ideas, and I'll keep open to them as they come along.

## Get in touch

If you find this or [CSS Animation](https://cssanimation.rocks) useful, please consider giving it a mention on Twitter, [or following along](https://twitter.com/cssanimation). For any thoughts, tips, questions (or typos), you can also [email me](mailto:d@hop.ie).
