---
layout: post
title: "Using Jekyll &amp; GitHub Pages"
description: "How I built this blog. (Hint: By using Jekyll and GitHub Pages)"
category: 
tags: [jekyl, GitHub pages]
---
Hop.ie needed a new look, and what better opportunity to learn a new approach.

I decided to try out [Jekyll][1], a "blog aware, static site generator", as well as [GitHub Pages][2]. GitHub pages allows you to serve static websites for free. It's extremely fast and easy to deploy if you're used to Git.

##Getting started with Jekyll

Jekyll is [easy to install][3]. Once installed, there are loads of examples available online to learn from. One of the most feature-rich is [jekyll-bootstrap][4]. It includes handy rake tasks for setting up pages and posts, configuration for multiple comment systems and RSS distributors, and even a templating system.

I prefer to start with something simpler (that I can understand) and add things on as needed. With that in mind, I found a great simple starter layout [from Lukasz Maciak][5]. I was able to refer to the features in jekyll-bootstap and grab various bits as I learned how it worked.

##Gotta have the SASS

While building the HTML templates without using HAML was *ok*, I couldn't stick to plain old CSS. I [installed Compass][8] and set up a sass directory within my stylesheets directory. Compass is a fantastic way to quickly produce efficient and powerful CSS effects, and includes a range of amazing plugins. One of which I got to try out was [Vertical Rhythm][10] (thanks to [@irishstu][9] for the tip).

A [decent tutorial video][11] helped explain just what it was about, and it was a great help getting the text to behave.

##Migrating from Wordpress

There are a million plugins and ways to convert Wordpress posts into other formats, but I found [this simple script][12] most handy in quickly converting a bunch of posts at once. It took very little time to then tidy up the meta data in each and remove some of the Wordpress-specific resources.

##Speaking of Markdown

Markdown is just lovely, compared to the bloated Wordpress WYSIWYG I escaped. I did need a quick introduction to some of the syntax, and [this one from Slekz][13] was handy. More info is available from [Daring Fireball][14]. (You can also see the source of [this post][15].)

##Deploying to GitHub Pages

Pages hosted on GitHub are generated through their own version of Jekyll. Because of this, no custom plugins will work. However if you wanted to pre-process your site locally and publish the static result, that would work too.

Setting up and deploying this site was straightforward. I set up a new repo called [donovanh.github.com][6] (Note: You'll want to add **\_site/\*** to your *.gitignore* file), then applied the following to my local Jekyll version of the site.

    $ git init
    $ git add .
    $ git commit -a -m "First commit"
    $ git remote add origin git@github.com:donovanh/donovanh.github.com.git
    $ git push -u origin master
    
After waiting a few minutes for the site to be created, the site was available at [donovanh.github.com][7].

##See under the hood on GitHub

I'm sure there are a few more blogposts in the process used to create this site, and as I learn more I'll continue to update.

In the meantime if you'd like to poke at the code behind this site, it's [on GitHub right now][6]. Have fun, and if you feel like suggesting improvements I'd appreciate it.

 [1]: http://jekyllrb.com/
 [2]: http://pages.github.com
 [3]: https://github.com/mojombo/jekyll/wiki/install
 [4]: https://github.com/plusjade/jekyll-bootstrap
 [5]: https://github.com/maciakl/Sample-Jekyll-Site
 [6]: https://github.com/donovanh/donovanh.github.com
 [7]: http://donovanh.github.com
 [8]: http://compass-style.org/install/
 [9]: https://twitter.com/irishstu
 [10]: http://compass-style.org/reference/compass/typography/vertical_rhythm/
 [11]: http://www.youtube.com/watch?v=ls3Clk-kz3s
 [12]: https://github.com/davidwinter/wordpress-to-jekyll
 [13]: http://old-wp.slekx.com/the-markdown-tutorial/
 [14]: http://daringfireball.net/projects/markdown/basics/
 [15]: https://raw.github.com/donovanh/donovanh.github.com/master/_posts/2012-07-22-jekyll-github-pages.markdown