---
layout: post
title: "A blog in a day"
description: "Design, build and deploy your own blog in less than a day's work."
tags: [development]
imageURL: shopirelandnews.jpg
published: true
---

There are many services that provide you with your own blog, there's a lot to be learned from designing and building your own. In this post I show you how to create your own self-hosted blog.

One of my side projects is the Irish shopping website [Shop Ireland](http://www.shopireland.ie). It's been a little neglected lately so I thought I'd add something new to the site, and give it more of a voice.

The result is the [Shop Ireland News](http://blog.shopireland.ie).

## Table of Contents

- [Choosing a platform](#choosing_a_platform)
- [Introducing Jekyll](#introducing_jekyll)
- [Setting up your development environment](#setting_up_your_development_environment)
- [Creating layouts](#creating_layouts)
- [CSS using SASS](#css_using_sass)
- [Responsiveness](#responsiveness)
- [Pagination](#pagination)
- [Icons](#icons)
- [404 Page](#404_page)
- [Creating a blog post](#creating_a_blog_post)
- [Social media & sharing](#social_media_&_sharing)
- [Going live](#going_live)

## Planning

I'm not one for intricate plans. In this case I made a list of what I'd need in a blog. I'll not enumerate everything but basically it had to have a list of posts, individual posts pages, comments and a way for people to share the posts.

At the same time I didn't want to spend a lot of time setting up or managing the blog, so it needed to be low maintenance. 

## Choosing a platform

With my requirements in mind I looked through some of the usual options. [Wordpress](http://wordpress.org), a favourite for many, is a strong platform with loads of great plugins. However it was a bit much to consider designing and building a theme in the limited time I had. I could have gone with a pre-built theme, but when I've done that in the past I usually spend longer taking the theme apart to make it how I'd like.

Another prospect was [Jekyll](http://jekyllrb.com/). I have [blogged about using Jekyll](/blog/jekyll-github-pages/) before (this site runs it too) and am familiar with how it works.

An interesting Jekyll-based alternative is [Octopress](http://octopress.org/). It extends Jekyll to include more plugins and has a nice deploy mechanism for Github. Though with the limited time I had available I decided to stick to the simpler Jekyll framework.

## Introducing Jekyll

Jekyll is a Ruby gem that acts as a local web server on your computer. It's "blog aware", meaning it is by default set up to help generate a blog, and it works by generating a set of static HTML files which can then be hosted anywhere.

It's also supported [by Github](https://help.github.com/articles/using-jekyll-with-pages), meaning that if you're familiar with pushing code to Github, you can push your Jekyll site and have it hosted there.

## Setting up your development environment

Before starting working on the blog, some setup is needed. First, install Jekyll. Full [install instructions](http://jekyllrb.com/docs/installation/) cover the basics, and if you're using Windows, you can [do it this way](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html).

With Jekyll in place, you need some starting template to run Jekyll against. I'm a fan of [Necolas's Jekyll boilerplate](https://github.com/necolas/jekyll-boilerplate) but you can also download [my Shop Ireland blog source code](https://github.com/donovanh/shopblog) if you prefer. Download it by running this in a terminal:

    git clone git@github.com:donovanh/shopblog.git YourFolderName

Note: If this doesn't work, make sure you have [git](http://git-scm.com/) installed.

Replace "YourFolderName" with your choice of folder name, and this should copy the source code into the folder. Then run each of the following:

    cd YourFolderName
    jekyll serve --watch

This will navigate into your folder and tell Jekyll to run a server. Go to [localhost:4000](http://localhost:4000) and you should see your local copy of the blog!

## Creating layouts

Within your blog directory you should find a "_layouts" folder. Within it should be `default.html` and `post.html` files. These are the layout files that are used to contain the content of your site.

### Liquid templating

Jekyll makes use of [Liquid markup](http://liquidmarkup.org/) for templates. This is a basic but handy way of adding some logic to the layout files, and allows us to create loops that generate the static HTML files.

When setting up a layout, I would usually start by setting up the containing HTML and styling the layout after. The first step is to create the general page layout, and for this you use the `default.html` file.

The `default.html` acts as a container for your page content. It can include anything that will be on every page, such as the header, sidebar and footer content. It also contains the HTML's `head`, with its meta tags and CSS files.

Within it, you should find a `{% raw  %}{{ content }}{% endraw %}` marker. This is where individual page content goes. Variables can also be passed in to the layout, and checked like so:

    <title>{% raw  %}{% if page.title %} {{ page.title }} - {% endif %}{% endraw %} blog.shopireland.ie</title>

In this case, a page can set it's own `title` value, and it can be accessed within the template within the `page` object.

### Posts layout

When you're happy with the general overall layout, the `post.html` file contains the HTML used by the individual blog post pages. The content from this file is automatically inserted into the `{% raw  %}{{ content }}{% endraw %}` part of the `default.html` layout file.

At the top of this `post.html` file you'll find some text:

    ---
    layout: default
    ---

This part of the file is used by Jekyll, and it's where you can set any values to be used in the templates. In this case, it's defining the "layout" to be "default". This tells Jekyll to process the file using the `default.html` layout file. If you have other layout files, changing the name here will direct Jekyll to use that file.

### Standalone pages

You can create standalone pages for your site by creating HTML files. If you include the settings text at the top, Jekyll will automatically take the contents of your HTML file and insert into the right template. To show this, open the `index.html` file. 

This file is the home page for the blog, so contains a loop of all the site's posts. It could be any HTML content we wish. Note the settings at the top:

    ---
    layout: default
    title: Shop Ireland News
    bodyTag: home
    ---

This tells Jekyll to use the default.html file for layout, and show the title as [Shop Ireland News](http://blog.shopireland.ie).

You can create pages without the ".html" extension. To do so, make a folder and place an `index.html` file into the folder. For example you could create an `about` folder with an index.html file, and it would be found at `yoursite.com/about`.

## CSS using SASS

With the layout in place, your blog will need CSS to style it and make it look better. When writing CSS my preference is to use [SASS](http://sass-lang.com/), along with [Compass](http://compass-style.org/).

SASS is an alternative way of writing CSS that makes use of variables, predefined functions (or mixins) and allows you to write CSS without things like curly braces and semi-colons. Compass is a framework that brings lots of useful mixins to make writing CSS easier, and can monitor your SASS files automatically.

When Compass runs, it monitors your project and will generate CSS based on your SASS files. To do this, Compass looks for a ruby file, `config.rb` that tells it which directories to look for your SASS in, and where to put the CSS.

If using SASS with Compass, you will need to first install [Compass](http://compass-style.org/), then you can have it monitor your project for changes to the SASS files.

Running Compass is then as simple as running a command on your project folder:

    compass watch

There are lots of ways of handling CSS pre-processing, so do feel free to try others and find what suits you best.

## Responsiveness

## Pagination

## Icons

## 404 page

## Creating a blog post§

## Social media & sharing (setting up twitter, facebook, etc)

## Analytics

## Going live (inc alternatives to Github)




