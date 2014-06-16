#Live-monitor
============

Small nodejs live monitor


## Requirements
================

nginx-full (I know, this is the debian name, in any other distro is just nginx with all the stuff that you can put in it, just for the sake of having it with all the stuff)
redis-server
nodejs (>=v0.10.25)

For node dependencies, I'm following this guide, and I'm using the latest ppa
https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

## Installation
===============

After you do a clone and you have npm installed, go to the project directory and type
npm install

That will install the requirements that are detailed on package.json and you will notice a node_modules folder

Inside that folder you will have all the nodejs dependencies.

Now, go to the folder client and type the following

jvazquez@aldebaran:~/workspace/live-monitor/client$ ../node_modules/bower/bin/bower install

That will install all the "client" side javascript dependencies, stuff like jquery, backbone, underscore, requirejs, backbone, etc.

## Boring part
==============

This step is a bit boring, but is something that you need do, at least read until the _config._ stuff

cp config.development.js.dist config.development.js

Open up your favourite editor and edit the file with this

config.host = 'live-monitor-node.aldebaran';
config.redis\_channel = 'php\_feed';
config.ui\_channel = 'ui\_live_feed';

You can use any url, but the important part is the domain (aldebaran in this case).

Now, copy all in build/*.conf to /etc/nginx/sites-available/ as root (or use sudo)

And replace with the proper addreses.

live-monitor-client.conf is used for the "client" application that you see on your browser
live-monitor.conf is used to act as a proxy infront of nodejs

The whole reason behind these thing with the domains, is that I want to avoid CORS issues, so due to the fact that
we are on the same domain (aldebaran) we won't face cors issues, but we are prepared for that too, if we need to deploy on a host like
http://i-really-like-cors-problems.com/ we have the use_cors directive on the configuration files and we will need to alter the nodejs configuration
and the nginx configuration.

## How to skip the boring part
==============================

If you like the hostname aldebaran and don't want to alter much of this, just open up the conf files
and change the root directive on both projects to the place you did the clone and that's pretty much it
Also, keep in mind that you will need to put on your /etc/hosts 

127.0.0.1       live-monitor-client.aldebaran live-monitor.aldebaran live-monitor-node.aldebaran


## How to send notifications
=============================

We are using redis, I used this prototype for optimus using a redis client for php 5.3 that I have on my windows machine
On laravel, more or less, we will dom something like this

$message = sprintf("The complex result is %s", json_encode((array)$complex\_stuff));
$redis = Redis::Connection();
$redis->publish('', $message);

## How do I run it?
===================

This is not complete, but since we use this just for development, we will do this
nodejs index.js

If nginx is running and your browser can resolve http://live-monitor-client.aldebaran/, just click on the Perseus button and you will see your notifications when they happen


## How do I test it if I don't have a client to log
===================================================

jvazquez@aldebaran:~$ redis-cli
127.0.0.1:6379> publish php_feed '{"msg": [{"x":1, "y":2}]}'
(integer) 1


## How does the cycle works?
============================

Let's say that I'm working on a project and I want to use this app.
This application will send message to redis

On our installation we have nodejs running and is waiting for redis messages on a particular channel (the one you configured on the config.development.js file)

app\_I\_want\_to\_log =====> REDIS-BOX <====== nodejs ====> Your browser


## Why aren't you using memcached?
==================================

So far I don't see any way on how I can make nodejs have an on event for a key on memcache, 
so I have to click on something to view changes, and that doesnt' seems what I want to do
on a live version of a log without coding a loop.
 
 ## Disclaimer
 ==============

It may not work, so just im me and I will see it.

So far, it has been working in Optimus and I'm setting it up for perseus, on two different hosts
FreeBSD with a jail (where it started) and a regular ubuntu box

The steps for freebsd are a tad different, mostly due to tiny things like the real name for node is node, not "nodejs"

## About Cors
=============

If you are having CORS issues, I've enabled the code to support cors issues, but you will need to configure the
config.development.js 

config.use\_origins = false;
config.node\_origins = 'live-monitor-client.pollux.box';

You will likely set the use\_origins to true and the node\_origins to the domain
__npm__: Npm is used to install nodejs dependencies
__bower__: Bower is used with grunt if you want for client side javascript depedencies

