---
layout: post
title: "ShopIreland.ie: Site speed"
description: "Where we're going, we don't need roads."
tags: [development]
published: true
---
As part of my great [website revamp][1], I'm starting off by looking at the site speed and finding ways to improve it.

## Close to home

The first thing to decide was where the site is hosted. Previously it had been hosted with Slicehost on the east coast of USA. The target market for this site was in Ireland, so my plan was to find a host that was located closer.

I tried [a few options][2], including setting up a server on Amazon's EC2. While Amazon had the potential to be the fastest with their Dublin location, I found their entry-level server too slow for my needs and the upgrades too expensive. After that I looked at a [Linode][3] virtual dedicated server option based in London.

While not quite as close as being hosted in Dublin, the delay sending data between the London and Dublin was tiny. Moving from a server in the USA to the UK shaved off a couple of hundred milliseconds from the response time. This was a noticeable difference and achieved by simply moving some files to another server.

## Cache Rules Everything Around Me

Having moved to a closer server, I decided to revamp my old caching system. I spent the best part of 4 evenings over the course of a week hacking a way at it. While I learned many things about managing cache files before finding a much better solution that in the end took less than an hour to set up.

### It's all going to have to come out

As part of moving to a new server, I took the opportunity to install and set up [nginx][4]. Nginx (Engine X) is a very light and fast web server optimised for serving up static assets (CSS, Images, JS) with very little overhead. It also includes a very nifty built-in caching engine.

My existing cache system involved PHP generating static files on each page request. The wasted time above was from setting up rules for nginx to check for the existence of static cache files, and serve them. The plan being that it would avoid having to go through Apache. 

This idea of having the PHP generate the static pages and then serve them through nginx worked well, but created a bit of maintenance problem. I had to set up cron jobs to clear out the cache, and look at each file to see how old if was. Thankfully nginx offers a much easier alternative: proxy_cache.

## Proper caching

[This example nginx config][5] helped me realise how nginx could solve the caching issue. What it does is cache a version of the requested page and then serve that cached file in future. It makes use of page's own cache control header, so all I do was ensure the pages I wanted cached had the right headers, and it takes care of the rest.

## Some numbers

I hit the site with some tests from [blitz.io](http://blitz.io) before and after the server move. In both cases I used an Ireland-based source and hit it with 250 connections over 60 seconds.

The difference is best seen in these two graphs. The first is on the old server, and shows the response times as the connections hit the site over the course of one minute, resulting in a couple of thousand hits:

### Old site

<img src="/images/posts/old-site.png" alt="Er me gerd" width="100%" />

The site gets slow and unresponsive as the hits add up. While it does at least manage to serve most of the requests, it quickly slows to the point of taking over 2 seconds each time. To make it worse, there's a baseline response time of around 500ms. That's half a second before the site has even begun to download assets.

### New site

<img src="/images/posts/nginx-caching.png" alt="Er me gerd!!!" width="100%" />

The average response time is 37ms, and this held up consistently across the test with no dropped requests.

## Result

In the end, the page response time was improved from over 500ms to 37ms. It is also much more stable and the server is better able to serve a range of requests as much of the load is taken away from Apache and handled by nginx.

[1]: http://hop.ie/blog/fix-shopireland
[2]: http://hop.ie/blog/head-in-the-clouds
[3]: http://linode.com
[4]: http://nginx.org
[5]: http://serverfault.com/a/68160


