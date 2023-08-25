---
layout: post
title: Lazy loading images in Svelte
description: "Speed up your website render time by only loading the images you want to show"
tags: [web development, Svelte]
imageURL: shopireland_list.jpg
published: true
---

When we build websites and apps we want them to load quickly and feel quick when navigating. One easy way to improve the speed is to only download visible images.

In this article I'll show how can make use of the Intersection Observer alongside the `onLoad` event to load only the necessary images as our visitors load and then scroll within our Svelte websites and apps.

_This article was [originally published on CSS Tricks](https://css-tricks.com/lazy-loading-images-in-svelte/)._

## Real-life example

I put this approach together while testing the speed on [Shop Ireland](https://www.shopireland.ie). It is a Svelte and Sapper application designed to be as fast-loading as I can make it.

During performance testing, the biggest issue was the home page loading many images at once, most of which were not even visible until the visitor scrolled.

## Download the finished code

If you'd like to save some time you can download the [final code for this demo from Github](https://github.com/donovanh/svelte-image-loading) and read along for an explanation of how it works.

## What we will build

Here's the result we will be aiming for today.

<p class="codepen" data-height="300" data-theme-id="12592" data-default-tab="js,result" data-user="donovanh" data-slug-hash="abdLERL" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Lazy Loading Images in Svelte">
  <span>See the Pen <a href="https://codepen.io/donovanh/pen/abdLERL">
  Lazy Loading Images in Svelte</a> by Donovan Hutchinson (<a href="https://codepen.io/donovanh">@donovanh</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Starting app

You might have an app in place where you'd like to apply these ideas, but if not you can start a new Svelte project and work on it locally. Start by initiating a new Svelte project and running it locally:

```
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

You should now have a beginner app running on `http://localhost:5000`.

## Adding the components folder

The initial Svelte demo has an `App.svelte` file but no components yet. Let's set up the components we need for this demo. First, create a `components` folder in your `src` folder.

Within this create an `Image` folder, which will hold our components.

We're going to have our components do two things. First we'll want to check when our image is visible on the screen, and then if it is, we want to wait until the image file has loaded before then showing it.

To do this we'll wrap an `Intersection Observer` around an `Image Loader`. This will allow both components to do one thing and create the effect we want. We'll begin by setting up a wrapper to tell us when the component enters the viewport.

## Intersection Observing

To avoid getting to deep into how [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) works, we'll make use of a [handy Svelte component](https://github.com/sveltejs/svelte/blob/master/site/src/components/IntersectionObserver.svelte) that Rich Harris put together for the [Svelte](https://svelte.dev) website.

We'll set up this as a useful component first then look at what it does. Save the following into `components/Image/IntersectionObserver.svelte`:

```
<script>
	import { onMount } from 'svelte';

	export let once = false;
	export let top = 0;
	export let bottom = 0;
	export let left = 0;
	export let right = 0;

	let intersecting = false;
	let container;

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

			const observer = new IntersectionObserver(entries => {
				intersecting = entries[0].isIntersecting;
				if (intersecting && once) {
					observer.unobserve(container);
				}
			}, {
				rootMargin
			});

			observer.observe(container);
			return () => observer.unobserve(container);
		}

		function handler() {
			const bcr = container.getBoundingClientRect();

			intersecting = (
				(bcr.bottom + bottom) > 0 &&
				(bcr.right + right) > 0 &&
				(bcr.top - top) < window.innerHeight &&
				(bcr.left - left) < window.innerWidth
			);

			if (intersecting && once) {
				window.removeEventListener('scroll', handler);
			}
		}

		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div bind:this={container}>
	<slot {intersecting}></slot>
</div>
```

This component will give us an ability to wrap other components, and it will determine for us whether the wrapped component is visible (intersecting) within the viewport.

If you're familiar with the structure of Svelte components, you'll see it follows the `script / style / markdown` pattern. To begin with, it sets some options that we can pass in. These are a `once` property, along with numeric values for the top, right, bottom and left distances from the edge of the screen.

We'll ignore the distances but instead make use of the `once` property. This will ensure the images only load once, as they enter the viewport.

The main logic of the component is within the `onMount` section. This sets up our observer, which is used to check our element to determine if it's "intersecting" with the visible area of the screen.

It also attached a scroll event to check whether the element is visible as we scroll, and then it'll also remove this listener if we've determined that it is viable and `once` is true.

## Loading the images

Let's use our `IntersectionObserver.svelte` component to conditionally load our images by wrapping it around an `Image Loader` component. Within `components/Image` create a new file called `ImageLoader` containing:

```
<script>
  export let src
  export let alt

  import IntersectionObserver from './IntersectionObserver.svelte'
  import Image from './Image.svelte'

</script>

<IntersectionObserver once={true} let:intersecting={intersecting}>
  {#if intersecting}
    <Image {alt} {src} />
  {/if}
</IntersectionObserver>
```

This component takes some image-related props (`src`, `alt`) which we will use to create our image tag. It them imports two other components, the `IntersectionObserver` which we created already, and a new component we'll create in a moment called `Image`.

We then make use of the `IntersectionObserver` component. This has a couple of interesting things going on. First we are setting `once` to true, so the image only loads the first time we see it.

Then we make use of Svelte's slot props.

## Slot Props

When we make use of a wrapping component we sometimes want to pass properties to the childen of the wrapper. Svelte gives us a way to do this called `slot props`.

In our `IntersectionObserver` component you may have noticed this line:

```
<slot {intersecting}></slot>
```

This is passing the `intersecting` prop into whatever component we give it. In this case, our `ImageLoader` component will receive this when it uses the wrapper.

We access this prop using `let:intersecting={intersecting}` like so:

```
<IntersectionObserver once={true} let:intersecting={intersecting}>
```

We can then use the `intersecting` value to determine whether to show the `Image` component. In this case we're using an `if` condition to decide whether the show the image:

```
<IntersectionObserver once={true} let:intersecting={intersecting}>
  {#if intersecting}
    <Image {alt} {src} />
  {/if}
</IntersectionObserver>
```

If we do, we show the `Image` component and pass in the `alt` and `src` props.

You can learn a bit more about slot props in [this tutorial](https://svelte.dev/tutorial/slot-props).

We now have the code in place to show an `Image` component when it is scrolled onto the screen. Let's build the component itself.

## Showing image on load

In the `components/Image` folder make a new file called `Image.svelte`. This component will receive our `alt` and `src` props, it'll then set up an `img` tag, listen for when it loads and then fade it in.

Set up the component like so:

```
<script>
  export let src
  export let alt

  import { onMount } from 'svelte'

  let loaded = false
  let thisImage

  onMount(() => {
    thisImage.onload = () => {
      loaded = true
    }
  })

</script>

<style>
  img {
    height: 200px;
    opacity: 0;
    transition: opacity 1200ms ease-out;
  }
  img.loaded {
    opacity: 1;
  }
</style>

<img {src} {alt} class:loaded bind:this={thisImage} />
```

Here we are getting the `alt` and `src` props. We also set up a couple of other variables, `loaded` to store whether it's loaded yet, and `thisImage` to store a reference to the `img` DOM element itself.

We also make use of a helpful Svelte method, `onMount`. This gives us a way to call functions when our components have been mounted in the browser. In this case we'll set up a callback for `thisImage.onload`. This will be executed when the image has finished loading, and it will set `loaded` to `true`.

To actually show the loaded image we'll use CSS. The initial state of the image will be to have `opacity` of 0. Then when loaded, we'll set `opacity` to 1. A `transition` takes care of animating this from transparent to visible. We're using a very slow transition time of `1200ms` in this demo, but you might want to set it to something like `200ms` to make it more subtle.

With all that set up, we apply our image tag like so:

```
<img {src} {alt} class:loaded bind:this={thisImage} />
```

This uses `class:loaded` to conditionally apply a `loaded` class if the `loaded` variable is true.

It lastly uses the `bind:this` method to associate this DOM element with the `thisImage` variable.

## Using our `ImageLoader`

Let's actually use our component. Back in the `App.svelte` file we can import out component and use it like so:

```
<script>
  import ImageLoader from './components/Image/ImageLoader.svelte';
</script>

<ImageLoader src="OUR_IMAGE_URL" alt="Our image"></ImageLoader>
```

## Working demo

You can download the [complete code for this demo on Github](https://github.com/donovanh/svelte-image-loading). Here's a live example:

<p class="codepen" data-height="300" data-theme-id="12592" data-default-tab="js,result" data-user="donovanh" data-slug-hash="abdLERL" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Lazy Loading Images in Svelte">
  <span>See the Pen <a href="https://codepen.io/donovanh/pen/abdLERL">
  Lazy Loading Images in Svelte</a> by Donovan Hutchinson (<a href="https://codepen.io/donovanh">@donovanh</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## See it in the wild

This approach is being used on my [Amazon Ireland](https://www.shopireland.ie) project on the home page, category pages and search pages to help make every page view faster. I hope you find it useful!

## Well that's enough about me. Your turn!

Have you build a cool Svelte app you'd like to tell me about? You can message me [on Mastodon](https://mastodon.ie/@donovanh), I'd love to hear from you.
