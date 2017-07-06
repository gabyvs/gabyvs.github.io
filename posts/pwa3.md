Writing a Progressive Web App from scratch (Part 3)
===================================================

This is the third post on the series of writing a PWA from scratch. The previous posts cover
 
* Intention and requirements - read it [here](/posts/pwa1.md)
* Research and a little of design - read it [here](/posts/pwa2.md)

## Wiring the idea with stubs

OK, now I'm going to start writing some code to verify that the idea will work and how the main parts will be connected. The objectives here will be:

* Run anionic app (any) locally     
* Add a single page with an input and two buttons: add and clear
* As crazy as it may sound, the Add button will add input data into a list, Clear button will clear everything from the list
* Access the page from my phone
* Check that works
* Configure Firebase to deploy my app
* Access it from my phone (not locally anymore, this is live!)
* Add storing capabilities for the list items using Firebase
* Try it again

### 1. Starting an Ionic/Angular 4 sample app

OK, first problem. Apparently Ionic only works by using the Ionic cli (which Angular now does the same too). I really don't like to install
packages globally when I'm just meeting them :) I do it only after I like and trust them, so I'm going to try to avoid that. 
Let's start by installing Ionic and start a new app with a tutorial template

    npm install ionic cordova  # I'm not sure I need Cordova...
    alias ionic='path/to/my/folder/node_modules/ionic/bin/ionic'  # alias to run ionic locally; don't forget to run unalias ionic at the end of this 
    ionic info  # this prints my system information related to ionic
    ionic start GOceries tutorial  # I used GOceries as the name of my app (local meaning) and tutorial as the Ionic template for my project 
    cd GOceries
    ionic serve # you can pass -l option if you want to see it in all platforms
    
Cool! That worked well and opened the sample app on the browser. To the second objective.
 
### 2. Add an input and two buttons

Now, taking a look at the generated code I'm going to start doing a few changes to it. I'm not going to be 
pasting here all the code changes since many of them are pretty much self descriptive (remove lines or files). 

*package.json*

I changed the author and removed the homepage entries here.

*config.xml*

According to the Ionic tutorial, this file contains configurations like the app name that will be used to install the app into an actual device. I don't
think I'm going to have an installable app, but I will change it anyway because MyApp is just way to general. I'm also changing the description and author.

*src/index.html*

I believe I'm not going to be using Cordova, so I removed the line that was going to be used to inject Cordova during Cordova build process. I also changed
 the title of the page.
 
*pages folder*

I removed everything inside this folder, since I'm not using any of those pages. 

OK, now I'm going to add my only page for now. According to Ionic documentation, I can run
    
    ionic g page todo

That generated 4 files: html template, typescript logic, sass styless and a module which I don't think I will be using so I'm going to delete that one.

OK. Probably my app is not in a working state anymore. I need to figure it our what code or components I need to display one page with a list, an input and two
buttons on it. I'm reading ionic documentation on [components](https://ionicframework.com/docs//components/#overview) for me to know what to do next.
 The page is great because it lets you play whit each of the components! It seems that some of the components that will be useful for my use case are:

* button
* cards
* grid
* input
* labels
* lists
* loading

Now, from the Ionic [API docs](https://ionicframework.com/docs/api/) page, I believe that some of the things I'm going to need are:

* col
* content
* IonicPage
* Item and ItemOptions sounds pretty cool for when I start whith the actual implementation of the PWA
* keyboard

OK, now, back to the changes.

*src/app/app.html*

I'm going to remove all the html here and will add just my todo page tag instead.

*src/app/app.component.ts*

Since I have removed all the pages and content of app.html, now this file is showing some red errors. I will remove the pages that are not
present anymore and add my todo page instead. I will also remove the menu logic since I don't have that for now.

*src/app/app.module.ts*

Remove old pages and adding mine.

## Sources

Here is the list of sources that I used to write the code for this part of the PWA

* [How to build a mobile app with Angular 2 and Ionic 2](https://scotch.io/tutorials/build-a-mobile-app-with-angular-2-and-ionic-2)
* [Ionic documentation](https://ionicframework.com/docs/)