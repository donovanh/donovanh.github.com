---
layout: default
title: Tito Animations
bodyTag: internal
---

# Tito animations

The following is a list of some of the animations and transitions on the Tito administration area.

### Page: Sign-in

Animation: Spinner style 1

<img src="/images/tito/animations/01.gif" />

A spinner shows after submit pressed before the server responds and loads the interface. The animation covers the change of state between the logging page and the full admin view.

### Page: Create new event modal

Animation: Modal (type 1) (slide in from right)

<img src="/images/tito/animations/02.gif" />

The screen is covered with an opaque grey layer and the modal containing instructions slides in quickly from the right. Animation is a little big when on full screen as the modal has to move from off-screen. No fading is used.

The modals progress by sliding one out of the way and sliding in another.

### Page: Create new event modal

Animation: Spinner

<img src="/images/tito/animations/03.gif" />

When creating a new eveng on the final modal, the submit button is replaced with a spinner (same design as used on the log in screen)
I think the purpose is to let the server update the menu and admin layout.

### Page: Dashboard

Animation: Spinner style 2 (Tito logo with border changing colour)

<img src="/images/tito/animations/04.gif" />

While loading the dashboard, this spinner is used but acts more like a progress meter (circular)

### Page: Tickets

Animation: Full-page loaders (second style)

<img src="/images/tito/animations/05.gif" />

Content is overlaid with a grey opaque layer while the content loads

### Page: Tickets (saving)

Animation: Large spinner (style 3)

<img src="/images/tito/animations/06.gif" />

While saving the tickets, a new spinner is introduced. A semi-opaque layer is added to the UI on one half of the screen, and a fully opaque grey layer over the ticket detail fields shows while the ticket information is sent and the new UI loaded.

### Page: Tickets (created)

Animation: Modal (type 2)

<img src="/images/tito/animations/07.gif" />

A modal appears - this time from the top of the screen - to confirm that the tickets were created and offers several options including adding more tickets (primary), going live, and continuing editing (both secondary in colour).

### Page: Go live checklist

Animation: Spinner style 2

<img src="/images/tito/animations/08.gif" />

A full-page overlay is used to transition away from the edit mode, to present a check-list confirmation page (maybe this would be better presented as a modal to allow users to return to editing tickets?)

### Page: Event live

Animation: Spinner style 2 (as above)

A full-page overlay is used to transition between the transition view and the "event is live" view. A loading step might not be required if we know the url in advance as it's pretty much instant - but this might be an opportunity to show an animation to celebrate the importance.

## Opportunities for adding animation

### Event added

The tick icon when adding an event could be an opportunity to combine an animated icon, which could then double as a loader by letting the UI load while it plays.

A second confirmation animation might be useful once events are made live. Microcopy might be helpful at this point also (similar to Mailchimp's high five text perhaps).

It might be worth establishing a more consistent set of microanimations first, making sure that the movement between views is both on-brand and consistent, then look to add more flourishes once the baseline set of animations have been completed.

### Style

The admin is on the whole very clear and easy to understand, and manages to bring in a little humour at times. This can be a tricky thing to pull off but it's worth keeping in mind when building animations. The character of the way modals move, for example, could incorporate a little bounciness to lighten them a little while also giving them a more physical presence.

## Types of animations

### Transitions

There are many opportunities for movement, whether that be polishing the existing transitions or adding new decoration. It could be worth taking stock of all the animations, grouping them (loading animations, modal transitions, etc). With this in place we can create a kind of animation vocabulary that acts as a basis for new animations. The goal here being to help smooth the flow of moving around the interface and helping keep users informed as to what's going on. A simple starting point might be to create a new version of the standard "spinner" and ensure it's used consistently.

It might also be worth considering bringing movement to the ticket listing pages, such as by [animating the background image](http://codepen.io/donovanh/pen/aNzxNM/).

### Modals

There's a lot we could do with the modal transitions, as it's an opportunity to bring in some character while also helping the user understand the context.

Announcements can be fun and bouncy:

<img src="/images/tito/animations/09.gif" />

While series of interactions can flow:

<img src="/images/tito/animations/10.gif" />

### Special animations

The next step could be to create one or two "special" animations, such as when loading the dashboard (building a set of "placeholder" boxes), when a new ticket has been created, or when an event has gone live. There's plenty of opportunity to add a bit of delight during these key moments.





