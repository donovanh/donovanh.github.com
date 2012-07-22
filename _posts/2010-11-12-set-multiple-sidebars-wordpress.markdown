---
layout: post
title: "Multiple sidebars in Wordpress"
description: "A few tips for setting up more than one sidebar in a Wordpress theme. Multiple sidebars can be used for footers, internal page areas, etc."
category: 
tags: [wordpress]
---
While <a href="http://www.wordpress.org">Wordpress</a> was originally developed for use as a blogging tool, it is frequently used to control entire websites. By default, most themes will have the same sidebar on each page. This guide will show how to set up multiple named sidebars and control the content of each individually. This guide assumes you have access to the theme files.

## Step 1: Define your sidebars

Either in a text editor, or under <em>Themes-&gt;Editor</em>, open the file "functions.php". This is the file that tells your theme that it is going to have multiple sidebars. For the purposes of this example, we will be setting up custom sidebars for each of the "home", "about us", "blog" and "contact us" pages. You may wish to edit this to fit your needs.

The following text might already be in your functions.php file:
    
    if ( function_exists('register_sidebar') )
    
You'll want to replace it with something like this:

{% highlight php %}
<?php
if ( function_exists('register_sidebar') ) {
  register_sidebar(array(
    'name' => 'Home',
    'description' => 'Your homepage sidebar.',
    'before_title' => '<h2>',
    'after_title' => '</h2>'
  ));

  register_sidebar(array(
    'name' => 'About',
    'description' => 'Your about us sidebar.',
    'before_title' => '<h2>',
    'after_title' => '</h2>'
  ));

  register_sidebar(array(
    'name' => 'Blog',
    'description' => 'Blog, and default fallback sidebar.',
    'before_title' => '<h2>',
    'after_title' => '</h2>'
  ));

  register_sidebar(array(
    'name' => 'Contact',
    'description' => 'Contact us sidebar.',
    'before_title' => '<h2>',
    'after_title' => '</h2>'
  ));
}
?>
{% endhighlight %}
      
Save the functions file and if necessary, upload it to your theme folder.
<h3>What is this code doing?</h3>
The <a href="http://codex.wordpress.org/Function_Reference/register_sidebar">register_sidebar</a> function is being called here to define each of the sidebars. The <a href="http://codex.wordpress.org/Function_Reference/register_sidebar">reference</a> explains the various options you can use when setting up these sidebars. In this case, we have defined 4 different sidebars and given them names that correspond to where they will be used.
<h2>Step 2: Connecting the sidebars to their pages</h2>
Now that we're told Wordpress that we will need 4 sidebars, we not need to connect them to existing pages. For this you need to take note of the page IDs of each page we will be working with.
<h3>Page IDs</h3>
The easiest way to obtain the page ID is to browse to your <em>Pages</em> menu in the admin area. Hover your cursor over the title of each page, and you should see the page ID in the address that appears in the bottom of the browser window. It should read something like <em>...post.php?post=5</em>, where 5 is the page's ID.

Go through each of your pages and take note of each ID, as they will be needed next.
<h3>Sidebar.php</h3>
Open the file sidebar.php. In this file we will add the code that connects your page IDs to their named sidebars. The code looks like this:
{% highlight php %}
<?php
  // dynamic_sidebar()
  if (is_page(2)) dynamic_sidebar('Home');
  elseif (is_page(4)) dynamic_sidebar('About');
  elseif (is_page(6)) dynamic_sidebar('Contact');
  else dynamic_sidebar('Blog');
?>
{% endhighlight %}
    
You will need to replace the numbers (2,4,6) in this code with the corresponding IDs from earlier. Place this code into your sidebar.php file where you would like your sidebar html to appear. This is usually within a sidebar div or similar.

Upload or save sidebar.php when you're finished editing.
<h3>What is this code doing?</h3>
This code looks at the current page ID, and chooses the right sidebar to show. If none is found, it falls back to using the "Blog" sidebar by default. If you want to adapt the code, you could set up more sidebars for other instances.
<h2>Step 3: Customise your sidebar content</h2>
Now that the code is in place, navigate to <em>Appearance-&gt;Widgets</em>. You should see your newly created sidebars on the right side of the screen. You can now place whatever individual content you need in each sidebar.