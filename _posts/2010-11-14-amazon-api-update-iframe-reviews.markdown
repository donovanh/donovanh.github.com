---
layout: post
title: "Amazon API Update: iframe reviews"
description: "Amazon have made one of their bigger changes to the Product API. Time to adjust your pages to display an iFrame version of the reviews. In this post, I show you how to integrate it with your site."
category: 
tags: [amazon, php]
---
Something we make extensive use of on our shopping site, [ShopIreland.ie][1], is [Amazon’s product API][2]. Last week there was a change in how they present their reviews, and this article aims to cover how to make use of the new iframe method.

If you’re reading this, it’s assumed that you are already using Amazon’s API and have access to the XML data being returned. They way we handle the data is by using PHP’s SimpleXML extension.

## What’s Changed?

Until recently, Amazon provided reviews in the product feed, along with an average rating and the total number of reviews. These are no longer provided. In their place, Amazon supply an iframe URL. In the feed data being returned, this URL is found here:

    Items->Item->CustomerReviews->IFrameURL

The URL provided looks something like this:

    http://www.amazon.co.uk/reviews/iframe?akid=doodlydoo&alinkCode=xm2&asin=0718154770&atag=your-associate-tag
    

## How to use the iframe URL

While we would never claim that this is the only way to handle an iframe, we have found this way looks good on our site. You will want to experiment with your own page layout to make the most of this new content. We display the iframe using the following:

## Height of 1280?

As we are using an iframe, it will often have scrollbars to scroll through the supplied content. In the majority of cases, we found that setting the review iframe height at 1280 was just enough to display all the returned content without the need for scrollbars. One downside of this is that if there are no reviews, there will be a tall gap in your page. Your site’s design may allow for this, but if not, try different heights to find what works best for you.

## Editorial Reviews

Please note that the EditorialReviews data is still provided. Thankfully!

 [1]: http://www.shopireland.ie
 [2]: https://affiliate-program.amazon.co.uk/gp/advertising/api/detail/main.html