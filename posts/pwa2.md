Writing a Progressive Web App from scratch (Part 2)
===================================================

This is the second post on the series of writing a PWA from scratch. The first post on the series is [here](/posts/pwa1.md)

## The Research

Today I started doing some research about PWAs. I really don't want to repeat what is out there already, but I do want to have some sources here so I can come back
to them once I forgot where I read all those interesting things :)

I used these main sources

* A page on PWAs written by Google on their [developers page](https://developers.google.com/web/progressive-web-apps/)
* This cool [article](http://blog.ionic.io/what-is-a-progressive-web-app/) by Ionic about what is a PWA
* A little outdated but very interesting [article](https://developers.google.com/web/updates/2015/12/getting-started-pwa) written by Addy Osmani on how to get started with PWAs
* And finally a [sampler](https://pwa.rocks/) of some very cool PWAs 

The next question I need to answer is: which technologies, frameworks and tools I am going to use to build this?

I have already decided to try out Angular 4 and Angular Material 2. I'm not entirely sure if I would need Ionic on top of that, but they integrate
with Angular 4 out of the box, so I will probably try it out.

Regarding the backend, simple database for storage and deployment of my files, I think I will try Firebase because I want to try it out some Google products.
But, apparently there are some cool alternatives out there, although some of them I would need to combine with my own database or other things... Here
are some of the alternatives that I checked out (very briefly)

* [Deployd](http://deployd.com/)
* [Deepstream](https://deepstream.io/)
* [Meteor](https://www.meteor.com/)
* [Backendless](https://backendless.com/)


Once I had read (more like skimmed) all those sources, I started with the design of my very own PWA.

## The Design

For the design I was looking around for other similar applications, like to do lists, and seeing how [material design](https://material.io/) principles
are being applied to this kind of applications. 

I also used this super cool [page](https://www.materialpalette.com/) to compare different color palettes. This will be useful
once I introduce the ability to select themes on the PWA.

Well, in the end, this is how I think my app will look like.

![Groceries App Mock](/img/groceries-mock.jpg)