---
layout: post
title: "Structured data"
description: "I, for one, welcome our robot overlords."
tags: [content]
published: true
---
In June, 2011, Google, Bing and Yahoo! [unveiled][1] the website [schema.org][2]. The intent was to introduce "a common set of schemas for structured data markup on web pages". After leaving it for a year to see if it was going to stick around, it was time to add it to my [irish shopping website][3].

## Microdata

Schema.org brings a set of recommendations for adding extra descriptive data to your website. This takes the form of [microdata][4]. This microdata takes the form of attributes in your HTML, and is used to allow search engines to better understand what the data is.

An example of how this works is in describing the name of a movie. You might have the following heading in your HTML:

    <h1>Plan 9 from Outer Space</h1>

This might be useful to humans, who would see it in context of a web page describing a movie and know what that implied, but a search engine would not. Instead you would add microdata to tell the search engine that it is in fact a name:

    <h1 itemprop="name">Plan 9 from Outer Space</h1>

The search engine would be able to evaluate this as the name of the item described, and not just a page section or title.

## Uses

While there might be many potential uses for this info, the most common is its use by Google and other search engines in creating richer search results. You can describe items such as a product's name, author, director, or price, and the search engine would then be able to display this in a more rich search result. Google also uses this data when generating it's [Google Shopping][5] service.

Potential uses could go much further with any online catalogue being able to use spiders to go out and collect descriptive, useful data from across the web and collate it in one place.

##  Real-world example

To make use of this, I decided to put some of the microdata into place on my shop. The schema.org website provides a great [introduction here][6]. The first step was to begin with a block of markup describing a product. Here's the data that I need to describe from the classic movie [Plan 9 From Outer Space][7]

    
    Plan 9 From Outer Space [DVD]
    starring:
      Bela Lugosi,
      Tom Keene,
      Mona McKinnon,
      Duke Moore,
      Vampira
    Image: http://ecx.images-amazon.com/images/I/51iqYZ3qQaL._SL160_.jpg
    Our Price: €15.95
    Availability: Usually dispatched within 24 hours
    Publisher: MPIC Video
    Release date:11th April, 2009

To describe the above data, I would usually wrap it in plain HTML. The above if described in HTML might look something like this:

    <h2>Plan 9 From Outer Space [DVD]
      starring:
      <a href="/search/Bela+Lugosi/">Bela Lugosi</a>,
      <a href="/search/Tom+Keene/">Tom Keene</a>,
      <a href="/search/Mona+McKinnon/">Mona McKinnon</a>,
      <a href="/search/Duke+Moore/">Duke Moore</a>,
      <a href="/search/Vampira/">Vampira</a>
    </h2>
    <img src="http://ecx.images-amazon.com/images/I/51iqYZ3qQaL._SL160_.jpg" />
    <p>Our Price: &euro;15.95</p>
    <p>Availability: Usually dispatched within 24 hours</p>
    <p>Publisher: MPIC Video</p>
    <p>Release date: 11th April, 2009</p>

Using titles and paragraphs would be fine for humans to understand, but search engines won't know that one paragraph describes the price, and another the availability.

We can use microdata to label the movie name and other meta data such as the item's URL, the price's currency, and even whether it's in stock.

The first step is to wrap the item in a container that defined its scope. Scheme has a [long list][8] of schemes that can apply, but for this one I'll be using "[Movie][9]".

    <div itemscope itemscheme="http://schema.org/Movie">
      ... content here
    </div>

This tells the search engine that everything contained within will match the scheme provided at `http://schema.org/Movie`. Next, I add in some meta data and describe the name of the movie.

    
    <div itemscope itemscheme="http://schema.org/Movie">
      <link itemprop="url" href="full_url" />
      <h2><span itemprop="name">Plan 9 From Outer Space [DVD]</span></h2>
    </div>

The "itemprop" attribute is used to label the contents as being certain properties of the item. In this case, the "link" tag is used to describe the URL. The movie name is described using "itemprop=name". Next I add in the actors, image and other data.

    <div itemscope itemscheme="http://schema.org/Movie">
      <link itemprop="url" href="full_url" />
      <h2><span itemprop="name">Plan 9 From Outer Space [DVD]</span>
          starring:
          <a href="/search/Bela+Lugosi/"><span itemprop="actor">Bela Lugosi</span></a>,
          <a href="/search/Tom+Keene/"><span itemprop="actor">Tom Keene</span></a>,
          <a href="/search/Mona+McKinnon/"><span itemprop="actor">Mona McKinnon</span></a>,
          <a href="/search/Duke+Moore/"><span itemprop="actor">Duke Moore</span></a>,
          <a href="/search/Vampira/"><span itemprop="actor">Vampira</span></a>
      </h2>

      <img itemprop="image" src="http://ecx.images-amazon.com/images/I/51iqYZ3qQaL._SL160_.jpg" />
      <p><strong>Our Price:</strong> <span itemprop="price">&euro;15.95</span></p>
      <p>Availability: <span itemprop="availability" href="http://schema.org/InStock">Usually dispatched within 24 hours</span></p>
      
      <p>Publisher: <span itemprop="publisher">MPIC Video</span></p>
      <p>Release date: <span itemprop="datePublished" content="2009-04-11">11th April, 2009</span>
    </div>

The pattern is the same as above. Each actor is wrapped in a span containing the "itemprop" attribute. The image tag itself contains the attribute so that the image source can be recognised by the search engines as the movie's cover art.

It's worth noting the availability and release date data. The availability property has an associated href, to tell the search engine that it is in stock. The release data microdata includes the "content" attribute with the release data formatted in a way the search engines would better understand.

## Testing the result

Google provides a handy tool within [Google Webmasters][10] imaginatively titled "Rich Data Testing Tool". It can be found under "Other Resources". Putting the data above into the "[Plan 9 from Outer Space][11]" product listing and testing it resulted in the following:

<img src="/images/posts/movie-schema.png" style="max-width: 100%;" alt="I schema for ice schema!" />

## Future improvement

As this is part of an ongoing improvement to the shop website, I will continue to add more microdata-labelled content as it is obtained. Scheme.org contains ways of labelling product descriptions, reviews, movie trailers and much more. It's not just limited to products but can be used to describe people, authors and a range of creative works.

[1]: http://googlewebmastercentral.blogspot.ie/2011/06/introducing-schemaorg-search-engines.html
[2]: http://schema.org
[3]: http://www.shopireland.ie
[4]: http://en.wikipedia.org/wiki/Microdata_(HTML)
[5]: http://www.google.com/shopping
[6]: http://schema.org/docs/gs.html
[7]: /B00005KH0Y/
[8]: http://schema.org/docs/full.html
[9]: http://schema.org/Movie
[10]: http://www.google.com/webmasters
[11]: http://www.shopireland.ie/dvd/B00005KH0Y/

