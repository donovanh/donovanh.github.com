---
layout: post
title: Hosting your own Svelte / Sapper app 
description: "How to set up a Digital Ocean droplet for your Sapper app, and host it along with your API on the same server"
tags: [web development, devops]
imageURL: server.jpg
published: false
---

You've build an amazing app using Sapper and Svelte, but now what? Where do we host it to make it available to the world? This article will set out the steps involved in one possible approach, self-hosting your own Sapper application using [DigitalOcean](https://m.do.co/c/cfc7d387f018).

I recently went through this process having build an application and hosting it using Vercel. They have a slick deployment process, but as they better suit serverless applications I quickly realised I needed more than what they offered. So I rented a virtual server and moved the app there.

If you like you can see my [Amazon Ireland](https://www.shopireland.ie) Sapper / Svelte project in action. It's running on a [DigitalOcean](https://m.do.co/c/cfc7d387f018) droplet as a Node app, with an Nginx reverse proxy. I also have a second app running alongside that acts as an API layer to get product information from Amazon.

## What we cover in this article 

In this article I'll walk through the steps I took to set up a server to run Node projects such as Sapper applications. I hope this can act as a good starting point for you if you're interested in running your own Svelte / Sapper app.

Note: this is written based on Ubuntu version *18.04*. Some specifics might have changed with newer versions.

## Topics

* [Setting up your Digital Ocean droplet](#setting-up-your-digital-ocean-droplet)
* [Node and Nginx proxy server](#node-and-nginx-proxy-server)
* [Pushing your app code using Git](#pushing-your-app-code-using-git)
* [Running your app using PM2](#running-your-apps-using-pm2)
* [Setting up Nginx server block with caching](#setting-up-nginx-server-block-with-caching)
* [Adding a domain name](#adding-a-domain-name)
* [Testing your site](#testing-your-site)

## Setting up your Digital Ocean droplet

My site only serves around 500 page views per day, so it's not in need of a powerful hosting plan. I'm also familiar with Ubuntu so went with that.

For the plan I chose a tiny $5-per-month virtual server. It's easy to upgrade if needed and not much of an outlay to get started.

Digital Ocean lets you chose a data centre location. Since my site targets Ireland primarily I chose London. This will hopefully result in better performance for my audience.

Under additional options you might want to enable monitoring. However, it can be [easily added later](https://www.digitalocean.com/docs/monitoring/).

For authentication, I recommend setting up SSH key access rather than root password. This means your server is not vulnerable to possible password-based hacking attempts. We will add a firewall later.

Make sure and add the content of your public SSH key. This can be found with (Mac/Linux):

```
cat ~/.ssh/id_rsa.pub
```

If not, [the Create RSA Key Pair step in this guide should help](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804#step-1-—-create-the-rsa-key-pair).

Finally give your droplet a name, and we're off!

### Log in and set up SSH, sudo and firewall

We need to get some initial setup out of the way. Begin by logging in using ssh (`YOUR-IP` is the IP address given during setup):

```
ssh root@YOUR_IP_ADDRESS
```

Once logged in, set up a user by [following this short guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04). This should give you your own login using the same SSH key. You will then be able to log in to your server using (`username` is whatever name you chose during the above steps):

```
ssh USER_NAME@YOUR_IP_ADDRESS
```

You'll only be able to access the server via SSH as the firwall blocks other ports, but we will fix that when installing Nginx. You'll also be able to use `sudo`!

Next we set up Node and the Nginx reverse proxy.

## Node and Nginx proxy server

Since I'm setting up a Sapper application which uses [Express](https://expressjs.com) we need Node. Begin by adding some repository information to our system. The following downloads and runs a script that adds the necessary repo URLs.

You can find [the scripts here](https://github.com/nodesource/distributions/tree/master/deb), if you want to see what they do.

```
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
```

With that set up, install Node:

```
sudo apt install nodejs
```

Once finished you should be able to see your Node version with `nodejs -v`.

One last thing, be sure to add the `build-essential` package also as some packages will need it.

```
sudo apt install build-essential
```

### Nginx

Nginx (pronounced Engine-X) is a lightweight, fast web server well suited to acting as a gateway to our Node application. It's very powerful and can do a lot but we'll mostly be leaning on it for our caching.

We begin by updating and then installing the package.

```
sudo apt update
sudo apt install nginx
```

Before we can run it, we need to let the firewall know. For this guide I'm not going to install SSL directly on Nginx, but if you want to do so [this guide has more in-depth information](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04).

Let's add Nginx HTTP access to the firewall:

```
sudo ufw allow 'Nginx HTTP'
```

We can check the status of Nginx by running `systemctl status nginx`. If it says `Active`, you should be able to navigate to your IP address and see the success page.

Next, we'll leave the Nginx configuration aside for a moment and set up our Sapper application and API code.

## Pushing your app code using Git

There are many ways of building, testing and deploying projects. For this project I wanted something quite simple. I knew there would only be one person working on it at a time and I didn't want to introduce lots of layers of complexity.

Back in the day I'd have turned to a tool such as FTP to push files up to the server. Thankfully we have better means of deploying these days, and one such approach is to use a Git hook.

With a Git hook we can have our code copy automatically from our `master` branch to the server. In the following steps I am reusing some of the code from [this overview](https://macarthur.me/posts/deploying-code-with-a-git-hook).

We get started by creating our directories to store the code. You can call them anything you like but I'm going to go with `repo` and `www` in this case. The `repo` represents the Git repository that we push our code to, and the `www` directory contains our live code.

```
cd ~/
mkdir -p repo/YOUR_APP
mkdir -p www/YOUR_APP
```

The `YOUR_APP` part is your app name. Call it what you like but be sure to replace further references to `YOUR_APP` with the same name.

We navigate to our repo folder, and set up a bare Git repo.

```
cd ~/repo/YOUR_APP
git init --bare
```

Now we set up a [Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to carry out the commands we want to run after we push to this repo.

Now we create `post-receive` hook. I'm using `nano` to edit files on the server, but replace the command as needed. I will create and save the hook using:

```
cd hooks
nano post-receive
```

And adding the following:

```
#!/bin/bash

GIT_DIR="/home/don/repo/YOUR_APP"
TARGET="/home/don/www/YOUR_APP"

while read oldrev newrev ref
do
    BRANCH=$(git rev-parse --symbolic --abbrev-ref $ref)

    if [[ $BRANCH == "master" ]];
    then
        # Send a nice message to the machine pushing to this remote repository.
        echo "Push received! Deploying branch: ${BRANCH}..."

        # "Deploy" the branch we just pushed to a specific directory.
        git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH
    else
        echo "Not master branch. Skipping."
    fi

  # We will add other steps here

done
```

And save the file with `Control+X` then `y`.

Before we continue we need to make this file executable:

```
chmod +x post-receive
```

The above code sets up some variables (adjust the `YOUR_APP` part as needed!) and then within the `do` and `done` lines it runs code to apply our hook.

Currently all it's set up to do is copy our code, but only if we've pushed the `master` branch.

Let's try it. To use this we need to add a `remote` to our project. In our project folder on our *local* machine, add the following remote:

```
git remote add origin USER_NAME@YOUR_IP_ADDRESS:/home/USER_NAME/repo/YOUR_APP
```

All the shouty bits above, be sure to replace them with the relevant username, IP address and the name of your app directory.

Now when you push to master (you may need to make a change first) you should see something like:

```
remote: Push received! Deploying branch: master...
```

Along with some other Git noises. If you then return to your server, and check in the `www/YOUR_APP` directory, you should see your app files!

Before we move on, let's make the Git deploy process easier by adding multiple origins. Adjust the following commands to include your Git repo location.

```
git remote set-url origin git@github.com:username/your-app.git
git remote set-url --add --push origin USER_NAME@YOUR_IP_ADDRESS:/home/USER_NAME/repo/YOUR_APP
git remote set-url --add --push origin git@github.com:username/your-app.git
```

Many thanks to Alex for [his helpful article on this](https://macarthur.me/posts/deploying-code-with-a-git-hook).

Now that we can deploy code, let's run our application.

## Running your app using PM2

I usually run my Node applications using `npm start` (or sometimes `npm run dev` when working locaslly). On the server we could certainly do the same, but unless we use some kind of service to monitor our application, it could crash and become unresponsive.

It's good to have some kind of tool to automatically restart our app, as well as starting up any apps when our server restarts. [PM2](https://github.com/Unitech/pm2) is a useful tool that manages our applications and ensures they stay up.

Begin by installing it globally so that it can be used wherever.

```
sudo npm install pm2 -g
```

### Running a Sapper app

Let's get the app running. First we need to install dependencies.

```
cd ~/www/YOUR_APP
npm install
```

Before we run our Sapper app we need to build it. While working in a `dev` environment we don't need the build step as it compiles for it, we do need this step when running in production. So before we start running our app, build it with:

```
npm run build
```

This should output a lot of lines of content as it builds all the scoped JavaScript fragments of your app. We can then run the app using PM2.

While we can set up PM2 for most Node apps with a simple `pm2 start app.js --name App`, we need to use our `npm start` command. We can do it like so:

```
pm2 start npm --name "AppName" -- start
```

With that running, we save the current state of the PM2 system with:

```
pm2 save
```

You can also check the status of your running apps any time with `pm2 list`. See `pm2 examples` for more.

Lastly we want to make sure the app loads when the server restarts. Set this up with:

```
sudo env PATH=$PATH:/usr/local/bin pm2 startup -u USER_NAME
```

Be sure to replace `USER_NAME` with your actual chosen username as before.

You can now test your app. If all went to plan, it should be running on port `3000`.

```
curl http://localhost:3000
```

If you get an error here, check your code is all in place and run `pm2 restart AppName` to restart it.

### Improving the Git hook

With the app running, we can now improve our Git hook to have it handle the build step, run npm install, and restart PM2 on ever deploy. Update our hook by adding the following before the `done` line:


```
cd /home/don/www/YOUR_APP
npm install --production
npm run build
pm2 restart AppName
```

Again be careful to replace `YOUR_APP` and `AppName` with your values.

Now when you push to master, it should install dependencies, build the app, and restart the app using PM2.

## Setting up Nginx server block with caching

We have our app running and we get the expected output at `localhost:3000` so the next step is to let Nginx act as a reverse proxy. This will catch any web requests to port 80, and direct them to our app (or a cached version).

### Caching

Before we set up our server block to tell Nginx where to find our app, we will quickly set up caching. Nginx has a cache option that looks at the headers sent back from our app and saves a copy of the request to disk. It then returns this saved version to each new request until the cache expires.

Begin by creating a directory for our cache to be stored:

```
sudo mkdir /var/cache/nginx
```

We will then configure the cache settings in our server block.

### Adding the server block

We begin by setting up an entry in our `sites-available` directory.

```
sudo nano /etc/nginx/sites-available/YOUR_SITE.vhost
```

In this file we add some directives to tell Nginx how to serve up our app.

```
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=480m use_temp_path=off;

server {
       listen 80;
       listen [::]:80;

       server_name example.com;

       location / {
          proxy_cache my_cache;
          proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
          proxy_cache_revalidate on;
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
       }
}
```

Exit and save using `Control + X, y`.

At the start, the `proxy_cache_path` sets a location for the cache along with how many `levels` to store (this can be tweaked if you think you'll be storing millions of requests). The `keys_zone` part sets a named zone and how big it is, in memory, for storing metadata about the cached content. 

We set `max_size` as the maximum amount of space the cache can take up. In this case it's a generous `10g`.

We set an optional `inactive` value to 8 hours in this case, and set `use_temp_path` to `off` as this saves a little bit of performance as it no longer writes content twice.

Next up is the `server` block itself. In this we set the port, set up a `location` and tell the `proxy_pass` to pass requests through to our app on `http://localhost:3000`.

We also tell the server where to find the `proxy_cache` that we defined above, and we use a very interesting optional setting `proxy_cache_use_stale`. This tells the server to use old cached entries if for some reason the file returns an error.

There are lots more settings available, and you can find out more [in this article containing the full Nginx caching options](https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/).

### Activating the server block

We now have a file in `sites-available` but we need to activate it by creating a link to it from `sites-enabled`. 

```
sudo ln -s /etc/nginx/sites-available/YOUR_SITE.vhost /etc/nginx/sites-enabled/
```

There could be a "default" file or similar alread in the `sites-enabled` directory. We don't need that so can delete it.

Now that we have the file linked from `sites-enabled` we can test to check our config is ok using:

```
sudo nginx -t
```

If all is not well, check for typos or missing semi-colons! If it is, restart Nginx to activate the changes:

```
sudo service nginx restart
```

We should now be able to access our content on port `80` via this Nginx reverse proxy.

```
curl http://localhost:80
```

If all is well, let's move on to setting up our public URL and HTTPS.

## Adding a domain name

With an app running on port 80 and an IP address, it's time to give this app a home in the form of a URL.

There are many ways to handle domain names but something I like to do is use [CloudFlare](https://www.cloudflare.com) and make use of their free "flexible" SSL service. It's not 100% secure, but can be upgraded to provide end to end encryption for sites or apps that deal in sensitive data.

In this case my app has no log in component and doesn't send any sensitive data to or from the browser so I'm content with their most simple SSL setting. If you want to add more you can [set up your own SSL](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04) or use another service.

So if we're using CloudFlare, head over and register. Then add a new site and select the Flexible SSL option.

If you have a domain already, it will prompt you to move the records. You might not want to keep the old records but instead take this opportunity to add in an `A` record pointing to your server's IP address, and a CNAME for `www` pointing to `YOUR_DOMAIN.rocks`. 

Once set up you will be prompted to add two name servers to your domain. Take note of these.

### Setting up your nameservers 

Log in to your registrar and navigate to the section where you set the name servers. Update the list to contain just the two given by CloudFlare.

Then, return to CloudFlare and press the button to continue. It may take a few hours for the updated nameservers to be detected. Once it detects the changes it will email you, and your site is live!

## Testing your site

You should now be able to access your app at your own domain name, using `https://YOUR_DOMAIN.rocks`.

### Troubleshooting

So what should you do if you see the dreaded `520` error? A few things to try:

* Check your app has been built with `npm run build` and that it is successful
* Check `pm2 list` to see the app is running
* Look for `Actice` in `sudo service nginx status`
* Double-check the location server block to ensure it's looking for `localhost:3000`

Lastly, you can also check logs for both at their default locations using:

```
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

I hope this article is useful and helps you get your awesome Sapper projects onto the web!

## Well that's enough about me. Your turn!

Have you build a cool Svelte app you'd like to tell me about? You can message me [on twitter](https://twitter.com/donovanh), I'd love to hear from you.


