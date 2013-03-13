---
layout: post
title: "The Holy Grail"
description: "Build, deploy and host a website capable of receiving 40 million+ hits per day. For free."
tags: [development, static, github]
published: true
---

What if I told you there's a way to build websites using all the latest fun tools that can be generated, deployed and hosted on a bulletproof server, all for free? Well, check this out.

## The Problem

During the day, we work with several Rails-based applications. It's a great platform for building apps, and when we were setting up our company website, it offered us a way to develop the site using some great tools (HAML, SASS, etc) and deploy it easily to Heroku.

This is a decent setup and easy to manage. However, it does have a few weaknesses. Should the site become suddenly popular, it would be necessary to ramp up the hosting (and associated charges). Also, it was an ongoing maintenance concern as more and more Rails-related security issues crop up, resulting in more testing and server maintenance.

We needed to extract what was essentially an information-based website from this dynamic server code, and the best way to do so was by making it a static website.

## Static websites

One of the latest hot topics is that of static website generators. Static websites are simply a bunch of html files with the associated assets. They don't have any server-side logic.

This may limit the functionality of the site, but on the other side, having zero server-side logic means zero security holes, zero maintenance, and blazing fast server speeds. It also opens up a load more options for hosting.

This blog is an example of one. I use [Jekyll](http://jekyllrb.com/) to create this blog out of a bunch of files and write the posts in [Markdown](http://daringfireball.net/projects/markdown/). When I want to deploy the site, I use [Git](http://git-scm.com/) to push it up. If you want to do the same, I also [blogged about Jekyll here](/blog/jekyll-github-pages/).

Jekyll's great and well suited to creating a blog. For full-on websites though it's not as well suited. Thankfully though, there are a load of other ways to build static websites. Here's the one I went for.

## Middleman

I work a bit with Ruby in the form of Rails apps and Sinatra apps, so my interest was piqued I heard that [Middleman](http://middlemanapp.com/) worked as a local Sinatra app that generates static websites.

Middleman is installed [as a Ruby gem](https://rubygems.org/gems/middleman), and allows you to build websites using templates, includes, helper functions and the like. When you're ready to deploy the site, it's build command generates the set of HTML files that you can then deploy where you want them to be hosted.

## Installing

Before starting, you'll need to have [Ruby installed](http://ruby.about.com/od/tutorials/a/installruby.htm). Then, get into Middleman by grabbing the gem:

    $ gem install middleman

Once installed, you can initialise a new Middleman project:

    $ middleman init my_new_project

## Creating a page

Creating pages within Middleman is done in the "source" folder. When you create a new project, some example files are created for you. They should look something like this:

    index.html.erb

Where "erb" above refers to the type of content in use. For example, if I was using HAML to write the pages, they could be named:

    index.html.haml

Middleman will then process the HAML content into HTML while building the static pages.

## Front Matters

Each of the HTML files in the source can include a bit of Yaml at the top of the file. It should look like this:

    ---
    title: Welcome to Middleman
    ---

This is where you can put any metadata you like. Use this for page titles, descriptions, and any variables you'd like to be made available in your templates.

The title metadata above can be seen in the "layouts/layout.erb" file:

    <title><%= data.page.title || "The Middleman" %></title>

The template files and source files don't have to be limited to erb files. Since we use HAML mostly, I wanted to continue using it. Thankfully Middleman supports all manner of cool stuff, but what got me started was when I installed and used a "skeleton" project structure.

## Local testing

You can run your site locally prior to building the static files by running:

    $ middleman server

## Skeletons

The "init" command can be used to generate a project based on various skeleton file structures. These you can either make yourself, of choose from [one of the many available](http://middlemanapp.com/community/3rd-party-project-templates/).

I started with dannyprose's [HTML5 Boilerplate based ](https://github.com/dannyprose/Middleman-HTML5BP-HAML) skeleton. Instructions on how to get it going are included on their github repo there.

It's worth taking a look at the "helpers/site_helpers.rb" file to see how the front matter data can be used in the templates. This can allow for all sorts of dynamic stuff.

## Extensions

Once you get the hang of creating pages and sites locally, you can level up by making use of Middleman's [extensions](http://middlemanapp.com/advanced/custom/). The Middleman [community](http://middlemanapp.com/community/3rd-party-extensions/) has put together a bunch of great extensions to get started, my personal favourite being [Middleman deploy](http://tvaughan.github.com/middleman-deploy/).

## Push it good

Middleman deploy allows you to deploy your "/build" folder contents using several means. I chose to use the Git option, as my source code is already managed with Git. The [setup instructions](http://tvaughan.github.com/middleman-deploy/) for this are easy to follow. One tip though, ensure your "build" folder is ignored in your main source code repository, as the deploy extension will automatically create a git repo in this folder for deployment.

## Hosting

Static websites can be hosted pretty much anywhere. This can include [deploying to S3](http://www.yearofmoo.com/2012/10/launch-a-static-website-with-simple-s3.html), Github, Heroku, and many others. In this case I chose to go with [Github pages](http://pages.github.com/).

Using the Middleman deploy extension, which I set up to use Git, I can deploy the static website as easily as this:

    $ middleman build --clean
    $ middleman deploy

Running the deploy command will kick of a process that goes into the "build" folder, switches to a "gh-pages" branch of that repo, make a local commit and then push it to Github. A few seconds later, the website is updated.

## Using your own URL

A quick tip if you want to use your own URL, rather than the "username.github.com/repo-name", is to add a CNAME file to your source folder. This CNAME file need only contain your domain name.

The next step is to set up an A record in your domain's DNS settings, pointing to the Github IP address (204.232.175.78).

## That Speed

The performance available from having static pages hosted on Github is impressive. We went from having pages that took between 150ms and 500ms to respond down to as low as 11ms. While not a huge amount of time in isolation, it really does result in a snappier feel to the site. If combined with [good front-end optimisation](/blog/designing-for-speed/), your site will really fly.

Middleman brings some great features, such as code minification, image compression and cache-busting. By bringing it all into the local development environment, it takes away some of the headaches of managing a dynamic site on the server, and opens up many more options for hosting.

I find that quite exciting and the icing on the cake is that every part of this is entirely free.

If you've had success in creating static websites, or have tips to share, hit me up [on twitter](http://twitter.com/donovanh)! I'd love to hear your experiences.


