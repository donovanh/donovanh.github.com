---
layout: post
title: "Your own blog - Part one"
description: "Design, build and deploy your own blog."
tags: [development]
imageURL: blog_part1.jpg
published: true
---

There are many services that provide you with a blog. However, they get to store and make use of your content. For those of us that prefer to run our own sites and keep the content under our own control, setting up our own is a better option.

There's also a lot to be learned from the DIY approach. In this series I'll cover setting up, customising your layout and publishing your own blog using Jekyll.

## Case study

One of my side projects is the Irish shopping website [Shop Ireland](http://www.shopireland.ie). It's been a little neglected lately so I thought I'd add something new to the site, and give it more of a voice. The result is the [Shop Ireland News](http://blog.shopireland.ie).

It will be acting as a case study, and you can [download the blog's source code](https://github.com/donovanh/shopblog) from Github. Feel free to use it as a basis for your own work if you wish. A link back is always appreciated but not required.

## Table of Contents

- [Planning](#planning)
- [Choosing a platform](#choosing-a-platform)
- [Introducing Jekyll](#introducing-jekyll)
- [Setting up your development environment](#setting-up-your-development-environment)
- [Creating layouts](#creating-layouts)
- [Creating a blog post](#creating-a-blog-post)
- [Creating standalone pages](#creating-standalone-pages)
- [CSS using SASS](#css-using-sass)
- [Building on a framework](#building-on-a-framework)

## Planning

What I wanted from the blog was quite simple, and would be something I hope to expand upon as time goes on. The basic blog would need to have a list of posts, individual posts pages, comments, and a way for people to share the posts.

At the same time I didn't want to spend a lot of time setting up or managing the blog, so it needed to be low maintenance.

## Choosing a platform

With my requirements in mind I looked through some of the usual options. [Wordpress](http://wordpress.org), a favourite for many, is a strong platform with loads of great plugins. However it was a bit much to consider designing and building a theme in the limited time I had. I could have gone with a pre-built theme, but when I've done that in the past I usually spend longer taking the theme apart to make it how I'd like.

Another prospect was [Jekyll](http://jekyllrb.com/). I have [blogged about using Jekyll](/blog/jekyll-github-pages/) before (this site runs it too) and am familiar with how it works.

An interesting Jekyll-based alternative is [Octopress](http://octopress.org/). It extends Jekyll to include more plugins and has a nice deploy mechanism for Github. Though with the limited time I had available I decided to stick to the simpler Jekyll framework.

## Introducing Jekyll

Jekyll is a Ruby gem that acts as a local web server on your computer. It's "blog aware", meaning it is by default set up to help generate a blog, and it works by generating a set of static HTML files which can then be hosted anywhere.

It's also supported [by Github](https://help.github.com/articles/using-jekyll-with-pages). If you can push code to Github, you can push your Jekyll site and have it hosted there.

## Setting up your development environment

The first step is to install Jekyll. Full [install instructions](http://jekyllrb.com/docs/installation/) cover the basics, and if you're using Windows, you can [do it this way](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html).

With Jekyll in place, you need some starting template to run Jekyll against. I'm a fan of [Necolas's Jekyll boilerplate](https://github.com/necolas/jekyll-boilerplate) but you can also download [my Shop Ireland blog source code](https://github.com/donovanh/shopblog) if you prefer. Download it by running this in a terminal:

    git clone git@github.com:donovanh/shopblog.git YourFolderName

Note: If this doesn't work, make sure you have [git](http://git-scm.com/) installed.

Replace "YourFolderName" with your choice of folder name, and this should copy the source code into the folder. Then run each of the following:

    cd YourFolderName
    jekyll serve --watch

This will navigate into your folder and tell Jekyll to run a server. Go to [localhost:4000](http://localhost:4000) and you should see your local copy of the blog!

## Creating layouts

Within your blog directory you should find a "\_layouts" folder. Within it should be `default.html` and `post.html` files. These are the layout files that are used to contain the content of your site.

### Liquid markup

Jekyll makes use of [Liquid markup](http://liquidmarkup.org/) for templates. This is a basic but handy way of adding some logic to the layout files, and allows us to create loops that generate the static HTML files.

When setting up a layout, I would usually start by setting up the containing HTML and styling the layout after. The first step is to create the general page layout, and for this you use the `default.html` file.

The `default.html` acts as a container for your page content. It can include anything that will be on every page, such as the header, sidebar and footer content. It also contains the HTML's `head`, with its meta tags and CSS files.

Within it, you should find a `{% raw  %}{{ content }}{% endraw %}` marker. This is where individual page content goes. Variables can also be passed in to the layout, and checked like so:

    <title>{% raw  %}{% if page.title %} {{ page.title }} - {% endif %}{% endraw %} blog.shopireland.ie</title>

In this case, a page can set it's own `title` value, and it can be accessed within the template within the `page` object.

### Posts template

With a content container in place, the nest step is to set up the blog post template. The `post.html` file contains the HTML used by the individual blog post pages. The content from this file is automatically inserted into the `{% raw  %}{{ content }}{% endraw %}` part of the `default.html` layout file.

At the top of this `post.html` file you'll find some text:

    ---
    layout: default
    ---

This part of the file is used by Jekyll, and is called [frontmatter](http://jekyllrb.com/docs/variables/). It's where you can set any values to be used in the templates. In this case, it's defining the "layout" to be "default". This tells Jekyll to process the file using the `default.html` layout file. If you have other layout files, changing the name here will direct Jekyll to use that file.

## Creating a blog post

Jekyll's blog posts are all stored in the `_posts` folder. Creating a new blog post means creating a new markdown file within this folder, and the name of the file dictates both when it will be published as well as the URL (slug) of the post.

One advantage of this is that all your blog posts are stored in text files in one place, and not in a database somewhere. They can be easy to back up, and some interesting workflows can be set up including publishing via Dropbox.

To see how the posts are created, start by making a new file in the `_posts` folder:

    2013-08-27-my-great-post.markdown

This post is consider to have been published on 27th August, 2013, and the URL is be something like `yourblog.com/my-great-post` (depending on the `permalink` value in your \_config.yml file).

With this set up, you can add in some more information by setting some YAML frontmatter at the top of your blog post:

    ---
    layout: post
    title: "Your blog post title"
    description: "A description of your post"
    tags: [multiple,tags]
    published: true
    ---

This tells Jekyll to use the `post.html` layout template and sets some useful meta-data for your blog post. With that in place you can begin writing your post.

### Markdown

Markdown is a neat [text-to-HTML conversion tool](http://daringfireball.net/projects/markdown/), and is a popular way to write content without all the usual tags and HTML cruft. The result is quite readible and a lot faster to write than writing straight HTML. Lots of examples can be found on the documentation, and you can see it in action by browsing the [hop.ie posts](https://github.com/donovanh/donovanh.github.com/tree/master/_posts) directory of this very blog.

## Creating standalone pages

You can create standalone pages for your site by creating HTML files. If you include the settings text at the top, Jekyll will automatically take the contents of your HTML file and insert into the right template. To show this, open the `index.html` file.

This file is the home page for the blog, so contains a loop of all the site's posts. It could be any HTML content we wish. Note the frontmatter at the top:

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

## Building on a framework

When building the blog, I needed to get a layout together that would be responsive and easy to extend. With a limited amount of time available, the best course was to use a CSS framework.

There are [loads of CSS frameworks](http://mashable.com/2013/04/26/css-boilerplates-frameworks/) to choose from. I briefly tried a few but ended up settling on [Bootstrap](http://getbootstrap.com). It's a popular framework built by Twitter, and very popular. Since I'm using SASS to manage my CSS, I chose to use a [Bootstrap SASS](https://github.com/thomas-mcdonald/bootstrap-sass).

Looking in the `sass/vendor` folder, you'll find the `bootstrap.scss` file. This file is imported by the `_base.sass` file to bring in the various Bootstrap tools.

Along with defining sensible default styling, Bootstrap brings a grid-based layout system that is also responsive. When setting up the blg, I made use of this grid structure to define the columns:

    <div class="container">
      <section class="row">
        <section class="col-md-8">
          ...
        </section>
        <aside class="col-md-4">
          ...
        </aside>
      </section>
    </div>

Bootstrap's column system provides 12 "columns". In this example, I'm setting up a `section` that is 8 columns wide, and followed by a 4-column wide `aside`. The `row` container ensures that the two elements sit side by side and any further content is placed beneath.

The [Getting Started](http://getbootstrap.com/getting-started/) guide is a great place to learn more about what Bootstrap provides.

## Coming up in Part two

If you've been following along, you should have a locally running basic blog. It should have a home page showing a list of blog posts which can be selected and read.

In part two I will cover setting up pagination on the home page, how to create custom icons, adding some discussion options and social sharing, and finally deploy the finished blog.

You should follow me on Mastodon [here](http://mastodon.ie/@donovanh) for an alert on the next part!
