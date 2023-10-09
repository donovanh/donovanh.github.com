---
layout: post
title: "iOS Scenekit: Creating and applying model animations"
description: "How to keep file sizes under control by creating minimal animation files in Blender and applying them to a model displayed in a SwiftUI iOS application"
tags: [iOS, SwiftUI]
imageURL: todo.png
published: false
---

## Sections / topics

- Intro / outcome
- Setting up default 3D model
  -- Exporting as COLLADA format https://en.wikipedia.org/wiki/COLLADA (dae file)
- Creating animations
  -- Removing mesh before exporting as COLLADA
  -- File size comparisons

- Setting up Sceneview
- LoadScene function
- Loading the default pose
- Loading the animation scene
- Finding the scene's animation key
  -- A note about finding multiple animations and applying them one at a time

  /Users/donovanhutchinson/xcode-projects/Reps/3D Models/pushup-02.dae:164 Line 163: Element '{http://www.collada.org/2005/11/COLLADASchema}library_controllers': Missing child element(s). Expected is one of ( {http://www.collada.org/2005/11/COLLADASchema}asset, {http://www.collada.org/2005/11/COLLADASchema}controller ).



## Well that's enough about me. Your turn!

Have you build a cool Svelte app you'd like to tell me about? You can message me [on Mastodon](https://mastodon.ie/@donovanh), I'd love to hear from you.
