---
layout: post
title: "Pricing the cloud"
description: "I've begun the move to cloud-based hosting. An adventure starts here. First up, how much will it cost?"
tags: [hosting]
published: true
---
A little while back, my hosting company [Slicehost][] was purchased by [Rackspace][]. While this didn't change much at first, they are now in the process of migrating accounts to Rackspace's cloud platform.

As someone who's hosting bill has been a steady and predictable bill for the past 6 years, moving to the cloud is a bit of a change. I tidied up the server last weekend and pushed through the migration to the cloud system, and now I have no idea how much it's going to cost by the end of the month.

##Nebulous billing

Cloud hosting has an interesting approach to billing. Rather than pay a fixed amount for a server with a certain amount of RAM and a maximum bandwidth allowance, you are charged for what you use. As someone who could use between 15GB and 100GB in a month but never gave it much thought, I imagine this billing style could result in surprising bills.

##Price comparison

Having been on the service for just a few days, it's looking like the cloud system will be a little cheaper. I did some quick calculations and found that rather than pay $20 / $38 per month for the basic 256MB / 512MB slices on Slicehost, it'll be somewhere between $13.65 and $28.95, depending on bandwidth.

##Investigating other options

Since I've gone to cloud with the existing server, I thought I'd look into some of the options. Aside from the ongoing cost, finding a service with a locations in Ireland was something that mattered to me. With this in mind, I set up an account with Amazon's AWS services to use their [Elastic Compute Cloud][] (EC2).

Activating virtual servers (instances) within Amazon is straightforward, but I'll get into some of the specifics of setting up a multi-domain server in another post. The interface is pretty good, with plenty of resources around to help understand the terminology.

##EC2 Pricing

This is where I'm less clear. The account I signed up for includes the use of a "Micro" instance, which is free for one year. After the year, it will be $15 per month. Bandwidth is a little cheaper than Rackspace. Rather than $0.18 per GB, Amazon charges $0.12 per GB. This would mean a total bill of between $16.80 and $27, assuming the "Micro" instance was enough to be going with.

Surprisingly, it turns out that if the Micro instance isn't enough and I need to upgrade to a "Small" instance, the instance cost increases to $60 per month (1.7GB server). An equivalent instance from Rackspace would be between $43.80 (1GB) and $87.60 (2GB). However, Rackspace offer smaller server size increases, with the next size up (512MB) costing $16 per month.

##Making the call

Thankfully Amazon allow the Micro instance to be run for a year before charging, so I plan to give it a reasonable go before making the call as to whether I'm going to need more than what the Micro can offer.

I'd love to hear your experiences if you've used similar services. I can be reached on [@donovanh][] on Twitter and [@donovan][] on app.net.

 [Slicehost]: http://slicehost.com
 [Rackspace]: http://www.rackspace.com/cloud/
 [Elastic Compute Cloud]: http://aws.amazon.com/ec2/
 [@donovanh]: http://twitter.com/donovanh
 [@donovan]: http://alpha.app.net/donovan
