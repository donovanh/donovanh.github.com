---
layout: post
title: "Design study: Quickcast"
description: "As a break from the usual technical writing, I thought I'd take a moment to discuss the design of a product I've started using recently, and why I think the design works."
tags: [design, products]
imageURL: quickcast.jpg
published: true
---

As a break from the usual technical writing, I thought I'd take a moment to discuss the design of a product I've started using recently, and why I think the design works.

A product I have been trying, and liking, recently is [Quickcast](http://quickcast.io/). A side project hacked together by Pete Nelson, Neil Kinnish & Dom Murphy, Quickcast is a simple free service that does one thing well.

Quickcast is an OSX application that allows the creation of short screencasts. It aims to make the creation and sharing of short screencasts easy, and presents a simple interface that helps ensure this goal is met.

Being an early version of the product, there's always going to be some danger of [experience rot](http://www.uie.com/articles/experience_rot/) as it matures, but for now it's design seems well focused on a small set of goals.

## User goals

A key rule when creating an application is to place the goals of the people using it at the centre of every design decision.

When people want to make a screencast, I would suggest they have one main goal:

* to create quality screencasts that people will want to watch

Quickcast helps users achieve this by limiting the length of screencasts to 3 minutes. While most screencast software imposes no such limit, the 3 minute limit in this case seems to be a deliberate decision that pushes the user to make the most of the limited time. In this way it becomes a design decision that aligns itself with this main goal.

Other goals the users might have include:

* the ability to begin recording as soon as they want to
* seeing how long they have have left while recording
* reviewing their screencast after recording
* uploading and sharing a screencast

I will stepping through the application and see how Quickcast has catered for each of these goals.

## Recording Quickcasts

Once installed, the app icon lives on the menu bar, making it easy to find. When selected, the primary function, "Record", shows first. This makes beginning recording easy, allowing the user to record with little effort. Secondary functionality is still easy to reach.

![](http://i.imgur.com/wqDeBpU.png)

Selecting "Record" shows options for recording size, sound input and camera. It has options to cover the majority of use cases, without feeling complex. Default options are pre-selected, minimising the effort the user needs make. A clear "Record Quickcast" button begins the recording.

![](http://i.imgur.com/SFtMgWq.jpg)

A countdown timer - positioned on the Menu bar - shows how many minutes and seconds remain. This solves the problem of the screencaster knowing how long to keep going for.

![](http://i.imgur.com/oPKvhuf.png)

After finishing a recording, the first thing a user will wonder is how well it went. Quickcast provides a Preview function immediately after recording has finished. Once viewed, the user can then choose to throw away the recording, make another one, or save it.

![](http://i.imgur.com/wev6cDU.png)

## Saving to web

The next screen is a form containing fields for description and other details. Placing the form after the recording finishes means that the primary function of the app (making recordings) is not slowed by unneeded steps.

![](http://i.imgur.com/Qtqxj0U.png)

The form contains a small number of fields, encouraging the user to add just enough information and get their video online.

A nice touch is that the app begins uploading the video before showing this dialogue. On a fast connection, the video will have finished uploading before the user submits the completed form. The process feels faster, with notification that the upload has completed appears immediately.

## Sharing

Having made and published a video, the final step is sharing. The app provides a notification containing a short link. [Here's an example](http://quick.as/pmljfj6m).

[![An example of an uploaded video](http://i.imgur.com/JMYzt2v.png)](http://quick.as/j2dacrrp)

## Website

A user experience is not just limited to the app itself. A well-designed website helps support the app by communicating what the application does and how it works. A clear call to action makes downloading easy. The rest of the page provides just enough information to help a visitor decide whether they need it. A nice touch is that logo animates through 3 steps (Make / Publish / Share), illustrating the way the app works. This sort of detail indicates the company values good design.

The result of these interactions is a light, well designed app that makes it easy for users to create and share screencasts.

## Alternatives

### More complex

The Quickcast app succeeds by providing a limited set of functions that all aim to help the user succeed in their goals. This differs from more complex apps such as [Screenflow](http://www.telestream.net/Screenflow/). The Screenflow app handles recording, editing, and video production for more advanced use.

While Screenflow is more useful when producing complex video tutorials, setting up projects within it would be a barrier to creating short, informal videos. Quickcast is better suited to this use case.

### Even simpler

On the other hand, there's another app that provides a more streamlined way to create videos, [RecordIt](http://recordit.co).

As their website illustrates, RecordIt is an even simpler app than Quickcast. Recording a video is results in a URL being copied to the clipboard as soon as recording finishes. It then [uploads the result](http://recordit.co/qsYu6N) without needing any further interaction.

While this does mean the video won't have a title or description, it makes creating short videos to share with others easier.

## What do you think?

I'd love to hear what you think of this or other products. Have you used something recently you liked? [Send me a tweet](http://twitter.com/donovanh) or [email](mailto:d@hop.ie).
