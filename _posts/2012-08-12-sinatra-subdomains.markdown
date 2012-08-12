---
layout: post
title: "Testing subdomains in Sinatra"
description: "If you're setting up a site with multiple subdomains, your 4,5,6,7 might need a little 1,2,3."
tags: [development]
published: true
---
A side project I'm currently working on requires the setting up and testing of many subdomains. Since the project itself is quite light, I've chosen to build it in the superb [Sinatra][1]. When testing Sinatra apps locally, the usual address to test in browser is <code>0.0.0.0:4567</code>. While this is good enough for single domain projects, it's a problem when you need to set up and test a project across multiple subdomains.

##Using hosts file

If you have a small number of URLs to test, adding them to your hosts file might be an option. The following format can be used in your hosts file:

	127.0.0.1	one.yourapp.dev
	127.0.0.1	two.yourapp.dev
	127.0.0.1	three.yourapp.dev

You can then access these (assuming your app is running on port 4567) by visiting <code>one.yourapp.dev:4567</code> and see it running locally.

Alternatively, if you want to be able to test against a large range of subdomains, a fun alternative is to use [POW!!][4]

##POW!!

[Pow!!][4] is a handy wrapper for running and testing multiple apps on local ".dev" URLs. It's trivial to set up and fires up a server for you to save a few seconds each time. Installing is as easy as:

	curl get.pow.cx | sh

Then setting up a symlink to your project:

	cd ~/.pow
    ln -s /path/to/myapp myapp

*\*Note: The docs seem to leave out the second "myapp" above when creating the symlink. This worked for me.

Restarting the server involves creating a text file in a <code>tmp</code> directory in your project, called *restart.txt*:

	touch tmp/restart.txt

If you want the application to restart every time you refresh, create a text file called *always_restart.txt*:

	touch tmp/always_restart.txt

Pow!! has [more documentation here][5] should you need it, but you should now be able to visit <code>anything.myapp.dev</code> and access your app.

Now that you have the app running at subdomains, it's time get Sinatra to sing along.

##Sinatra Subdomain

Enter [Sinatra Subdomain][2], a handy gem from Brazil's [@fnando][3]. The gem is [well documented][2] and easy to set up. 

Installing the Sinatra Subdomain gem:

	sudo gem install sinatra-subdomain

You'll then want to require the gem in your app:

	require "sinatra/subdomain"

The gem can then be used to target specific subdomains, or take a wildcard approach. If you're specifying your subdomains, the following will respond to the subdomain <code>foo</code>:

	subdomain :foo do
	  get '/' do
	    "What does #{subdomain} rhyme with? Oh, you!"
	  end
	end

In my case, I found it more useful to allow any subdomains and set up routes for them as a group:

	subdomain do
	  # Route for the root
	  get '/' do
	    "You're on the #{subdomain} home page! Good job!"
	  end
	  # Route for a different page
	  get '/bananas'
	    "You're #{subdomain} for bananas! Good job!"
	  end
	end

While this works well for <code>crazy.myapp.dev</code> and <code>mad.myapp.dev/bananas</code>, the above won't work for <code>myapp.dev</code> without the subdomain. To catch this, add the following after the subdomain section:

	get '/' do
	  "Now that's more like it."
	end

You'll now be set up to start putting together the logic for handling one, two or many subdomains. Good luck!

 [1]: http://www.sinatrarb.com/
 [2]: http://rubydoc.info/gems/sinatra-subdomain/0.1.2/frames
 [3]: https://twitter.com/fnando
 [4]: http://pow.cx
 [5]: http://pow.cx/manual.html
