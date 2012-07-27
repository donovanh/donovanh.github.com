---
layout: post
title: "Designing for speed"
description: "If your website was built this way, you'd be on the homepage by now."
tags: [websites]
newstylesheet: "stripes"
published: true
---
The speed of your website is a huge factor in how people perceive the quality of your content. By following some simple tips, you'll be able to ensure your site responds quickly enough to encourage visitors to stick around. 

##A timely issue

Jakob Nielsen [has been advocating since 1993][2] that loading times are the most valued aspect of a website. Even [in 2010][3] his research was showing the same desperate need for speed. Though our connectivity has improved dramatically since then, changes in the way we use the web has brought speed back into focus.

##<del>Smart</del>phones

Smartphone use might be reaching 4G speeds in some places, but for most people using mobile devices over the phone networks, the speed is much worse than landline connections. It's also a fact that a massive number of people, particularly in [Africa][5] and [much of Asia][4], are using their phones as a primary Internet connection.

You simply cannot assume that your users will be on fast connections. They could well be on a train or outside the cities, relying on an edge connection or satellite broadband.

##500% improvement

[ShopIreland.ie][1], a shopping comparison site launched in 2005, is a site I managed and put in place some of the following ideas to improve speed. 

As a result of some pretty straightforward client-side tweaks, I brought down the typical page load time from over 5 seconds to as low as 1 second. 

##Manage your graphics

Possibly the biggest improvement to Shop Ireland came about from putting the main colour scheme images into [one sprite file][6]. While the graphics in use could be redone using CSS now, at the time the CSS3 effects were not well supported. Instead, I combined the images into one PNG file, and used the background-position property in CSS to theme different sections of the site. While this didn't cut a huge amount off the initial page load, the cached image loads instantly on subsequent page loads.

Using up-to-date CSS is now a viable option, and if you can make use of gradients, border-radius, background sizes and the many CSS3 options, you should be able to get rid of most of your presentational images.

This blog also uses very few images. To try to ensure the important part of the blog, namely the content, got to the screen fastest, I even built the bouncy logo character using HTML & CSS. If you're browsing this on a recent browser (Chrome or Safari, for instance), the logo is described in just a bunch of CSS instead of an image. I've also tried where possible to make use of background colours and gradients to minimise the number of images.

##Use the clouds

Distributing your assets is a great way speed up sites. Popular javascript tools such as jQuery can be cached by the browser, so it's possible your visitors might not even need to download it again. You can even go further and host javascript template fragments or images on different content delivery networks. This allows your browser to make more simultaneous connections and make better use of your bandwidth.

##Combine & minify

Often the biggest overhead in page loading speed is when the browser is looking up the connection. If you open many connections, these lookups will stack up and cause a significant delay. Get around this by combining CSS files into one, and ensuring they are minified. Ensuring that your server serves these assets using GZIP will have help massively too. It's not uncommon for CSS files over 30 or 40KB to end up less than 5KB after compression.

The same goes for Javascript files. The fewer connections the browser needs to make, the faster things will arrive.

##Load order

Put your CSS in the head, and your Javascript before the closing *body* tag.

##Go static & caching

While it doesn't count as a "client-side" tweak, this is something I've put into practice here on this blog and I felt it worth mentioning. Making static versions of your pages or site content will cut out a decent chunk of server-side processing time. In the case of this blog, I was able to eliminate my old Wordpress installation and publish directly using HTML pages. A busy server trying to serve up a Wordpress blog can easily add a second or two to the page load time, if not more in some cases.

##Helpful tools

Last year Google introduced Page Speed as a metric for all Analytics accounts. They also offer some great [browser plugins and services][7] to help speed up sites. 

Yahoo's [YSlow][8] is another great tool to help identify the weak points in your page loading times.

If you need assistance setting up image sprites, [Sprite Pad][9] is an interesting tool. Alternately, [SpriteCow][10] seems pretty cool.

 [1]: http://shopireland.ie
 [2]: http://www.useit.com/alertbox/9703a.html
 [3]: http://www.useit.com/alertbox/response-times.html
 [4]: http://www.engadget.com/2012/07/19/smartphone-internet-china/
 [5]: http://afrinnovator.com/blog/2012/02/02/why-you-must-never-forget-about-the-humble-feature-phone-in-africa/
 [6]: http://www.shopireland.ie/images/all.png
 [7]: https://developers.google.com/speed/pagespeed/
 [8]: http://developer.yahoo.com/yslow/
 [9]: http://spritepad.wearekiss.com/
 [10]: http://www.spritecow.com/