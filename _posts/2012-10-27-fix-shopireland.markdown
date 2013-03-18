---
layout: post
title: "Time to fix ShopIreland.ie"
description: "Sometimes an old project is worth giving an overhaul. This is my plan for ShopIreland.ie."
tags: [development]
published: true
---
For the majority of the last decade I've run a reasonably popular [irish shopping website][1]. It started as a project where I would have a go learning some web service stuff, and try my hand at some SEO. Over the years I've revamped and adjusted how it works, but on the surface, it's the same site that launched [in August 2004][2].

Over the years it went through some major ups and downs. At it's busiest it was serving 1.5 million unique visitors per month, and killing the dedicated server every day. At the moment it's down to a more modest 8 thousand or so visitors per month. Not a bad figure, but I'm keen to improve the experience.

##Why now?

A couple of things have happened at once that have spurred me into action on this project. A new child arrives at the end of November, plus the site's host recently made the move to the cloud. The site seems to have reached the bottom of it's gradual decline in the search engines and be on the way back up.

##Main areas to improve

The following list is far from exhaustive, but covers the main areas I'd like to start on and might be able to achieve in the next few weeks before I'm distracted by the arrival of child:

- Site speed
- Modern HTML/CSS
- Information structure
- Improved content
- More shiny

## Site speed

<em><strong>Note:</strong> Server speed improvements done! <a href="http://hop.ie/blog/shopireland-speed">This post</a> goes into greater detail.</em>

The site has had some attention in this area but is still in need of improvement. As it makes heavy use of Amazon's product API, it is important that pages be cached and generated from the API only when needed. The original site had no caching and also did a lot of heavy database work on each view. Some patchy fixes to this have brought average page speeds down from 5 seconds to around 1.5 seconds, but I'd like it to be [under 1 second][5].

Website loading speed is important for creating trust but also brings benefits from the search engines. Google lists speed as one of its metrics by which it judges the site's quality.

Front end improvements can also massively impact the perceived speed of a site. While the number of requests to CSS and JS files is quite low, the files could benefit from compression and good caching headers.

## Modern HTML/CSS

While the site's use of CSS was great back in 2004, its age is showing. The site relies on graphics for the rounded corners and gradients in the layout, and does not include any semantic HTML5 content. A revamp of this could have the benefit of improving page speed (removing graphics) while making it easier for browsers to understand the data.

While improving the HTML I will take steps to adjust and improve the way the site is presented, with the focus being on making it more readible and easy to find information.

## Information structure

<em><strong>Note:</strong> Information structure added! <a href="/blog/structured-data/">This post</a> goes into greater detail.</em>

A side effect of the HTML being non-semantic is that the data has no meaning to search engines. [Schema.org][3] provides an interesting way of describing the content within the HTML using microdata. I'd like to implement this across the product pages.

## Improved content

The site needs more content. While Amazon's API provides basic information on the products, they don't provide much raw data. Aside from the product title, price, creator (actor, director, writer) and manufacturer, there's not a lot else. I'd like to look into means of hooking in data from other sources that might help people make better informed decisions.

## MOAR shiny

While the above seem a little dry, they all add up to creating a solid structure on which a pleasant layer of shiny can be applied. Mobile responsiveness, retina graphics, carefully chosen fonts and colours are all part of this. The site's very plain and dated. While it doesn't need to be a graphical showcase, I would like it to look better.

## Updates

The plan is to update this page as I make my way through the above list, noting what I did or decided not to do, along with any related blog posts. If you have any suggestions, please send me an email at [d@hop.ie][4] or message me on the details below. I'd love to hear your thoughts!

 [1]: http://www.shopireland.ie
 [2]: http://web.archive.org/web/20040805022210/http://www.shopireland.ie/
 [3]: http://schema.org/
 [4]: mailto:d@hop.ie
 [5]: http://www.useit.com/papers/responsetime.html

