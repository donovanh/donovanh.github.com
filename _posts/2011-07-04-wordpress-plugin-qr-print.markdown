---
layout: post
title: 'Wordpress plugin: QR Print'
description: "I made a Wordpress plugin. Probably won't happen again, I swear."
tags: [wordpress]
---
Introducing a neat little plugin I'm working on, <a href="http://wordpress.org/extend/plugins/qr-print/">QR Print</a>. It simply adds a QR code that contains the current page URL to the bottom of your page. It also hides it so that it only shows on the printed version of your page.

It works by making use of the Google Chart API. Google has a range of image-generating stuff that includes pretty pie charts and graphs, and also includes a handy QR code generator.

By creating a URL like the following, you can generate a QR code on the fly:

    http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=|0&chl=YOUR+TEXT+HERE
    
In this case, the text "Your Text Here" would be encoded into the image.

The only additional functionality I added was some code to determine what the current page URL was, and then passed that into the above Google URL. Simple as. If you enjoy the plugin, feel free to leave a rating at the <a href="http://wordpress.org/extend/plugins/qr-print/">Wordpress listing page</a> for QR Print. Thank you!
