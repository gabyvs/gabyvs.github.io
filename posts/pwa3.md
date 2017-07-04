Writing a Progressive Web App from scratch (Part 3)
===================================================

This is the third post on the series of writing a PWA from scratch. The previous posts cover
 
* Intention and requirements - read it [here](/posts/pwa1.md)
* Research and a little of design - read it [here](/posts/pwa2.md)

## Wiring the idea with stubs

OK, now I'm going to start writing some code to verify that the idea will work and how the main parts will be connected. 

### Starting an Ionic/Angular 2 simple app

OK, first problem. Apparently Ionic only works by using the Ionic cli (which Angular now does the same too). I really don't like to install
packages globally when I'm just meeting them :) I do it only after I like and trust them, so I'm going to try to avoid that. 
Let's start by installing Ionic and Cordova, which Ionic builds on top of.

    npm install ionic cordova  # I'm not sure I need Cordova...
    alias ionic='path/to/my/folder/node_modules/ionic/bin/ionic'  # alias to run ionic locally; don't forget to run unalias ionic at the end of this 
    ionic info  # this prints my system information related to ionic
    ionic start GOceries tutorial  # I used GOceries as the name of my app (local meaning) and tutorial as the Ionic template for my project 
    cd GOceries
    ionic serve

## Sources

Here is the list of sources that I used to write the code for this part of the PWA

* [How to build a mobile app with Angular 2 and Ionic 2](https://scotch.io/tutorials/build-a-mobile-app-with-angular-2-and-ionic-2)
* [Ionic documentation](https://ionicframework.com/docs/)