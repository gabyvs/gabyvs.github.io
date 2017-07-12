Writing a Progressive Web App from scratch (Part 3)
===================================================

This is the third post on the series of writing a PWA from scratch. The previous posts cover
 
* Intention and requirements - read it [here](/posts/pwa1.md)
* Research and a little of design - read it [here](/posts/pwa2.md)

## Wiring the main parts of the PWA

OK, now I'm going to start writing some code to verify that the idea will work and how the main parts will be connected. The objectives here will be:

* Run anionic app (any) locally     
* Add a single page with an input and two buttons: add an item and clear all
* Items are stored so they are displayed offline
* Prepare my project to be a PWA
* Add storing capabilities for the items using Firebase
* Configure Firebase to deploy my app
* Try it on my phone

### 1. Starting an Ionic/Angular 4 sample app

OK, apparently Ionic only works by using the Ionic cli. Let's start by installing Ionic and start a new app with a tutorial template

    npm install -g ionic
    ionic info  # this prints my system information related to ionic, just to verify installation went ok
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
    
    ionic g page list

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

```
<list></list>
```

*src/app/app.component.ts*

Since I have removed all the pages and content of app.html, now this file is showing some red errors. I will remove the pages that are not
present anymore and add my todo page instead. I will also remove the menu logic since I don't have that for now.

```
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { List } from '../pages/list/list';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    public rootPage = List;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen
    ) {
        this.initializeApp();
    }

    public initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

}
```

*src/app/app.module.ts*

Remove old pages and adding mine.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { List } from '../pages/list/list';

@NgModule({
    declarations: [
        MyApp,
        List
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [
        MyApp,
        List
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
```

*src/pages/list/list.html*

I'm going to use some of the ionic components that I mentioned before to create:

* a header with my app title
* a grid and list representing the items
* an input to create a new item
* a couple of buttons, to add an item and to clear them all

This is clearly not the complete functionality of the app nor the most beautiful way to add an item, but I only want to try to see if these all will work, so this is a good starting point, I think.

```
<ion-header>
    <ion-navbar>
        <ion-title>GOceries</ion-title>
    </ion-navbar>
</ion-header>

<ion-content padding>
    <ion-grid class="todo-list">
        <ion-list>
            <ion-row *ngFor="let item of items">
                <ion-col>
                    <ion-item>
                        {{ item }}
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-list>
        <ion-row>
            <ion-col>
                <ion-item>
                    <ion-input #newItem type="text"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row justify-content-around>
            <ion-col col-auto>
                <button ion-button (click)="add(newItem.value); newItem.value = ''">Add</button>
                <button ion-button color="light" (click)="clear()">Clear</button>
            </ion-col>
        </ion-row>
    </ion-grid>
</ion-content>

```

*src/pages/list/list.ts*

I will add here the logic that supports what I'm doing in the template. For now, the list of shopping items is hardcoded.

```
import { Component } from '@angular/core';

@Component({
    selector: 'list',
    templateUrl: 'list.html',
})
export class List {

    public items: Array<string> = ['avocado', 'cheese'];

    public clear () {
        this.items = [];
    }

    public add (item: string) {
        if (!!item) {
            this.items.push(item);
        }
    }

}
```

### 3. Offline storage

For this, I'm going to use Ionic [storage module](https://ionicframework.com/docs/storage/). It's use seem pretty basic, so let's try it. 
 
*src/app/app.module.ts*

Add storage module and use it for the project's module configuration

```
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  ...
  imports: [      
    ...
    IonicStorageModule.forRoot()
  ],
  ...
})
export class AppModule {}
```

*src/pages/list/list.ts*

I'm changing the code of this component, so instead of displaying hardcoded shopping list, it will read the storage contents.

So, basically what I'm going to do is
* on initialization of my component, load the list from the storage
* on add of a new item, update the list
* on clear, reset the list

The way I'm doing it now is probably not the best way to do it, I would like to add a service instead, for example, but again, I'm just trying the concepts now. 

```
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'list',
    templateUrl: 'list.html',
})
export class List implements OnInit {

    constructor (private storage: Storage) {}

    public items: Array<string>;

    public clear () {
        this.storage.set('items', []).then(() => {
            this.items = [];
        });
    }

    public add (item: string) {
        const strItem = item && item.trim();
        if (!!strItem) {
            this.storage.get('items').then((items) => {
                let updated = items || [];
                updated.push(strItem);
                this.storage.set('items', updated).then(() => {
                    this.items.push(strItem);
                });
            });
        }
    }

    public ngOnInit () {
        this.getItems();
    }

    private getItems () {
        this.storage.get('items').then((items) => {
            this.items = items || [];
        })
    }

}
```

### 4. Prepare my PWA



### 5. Deploy it using Firebase

First, I need to add it to the Firebase console as a new project. 

* Go to [Firebase console](https://console.firebase.google.com/)
* Click on create new project, give it a name. I used Goceries1 for my project

Then, I'm going to use Firebase cli to deploy my project. From my project's root folder

    npm install -g firebase-tools
    firebase login
    firebase init # I chose hosting, goceries1 as default, www as public folder, no single page, no rewrite of index.html
    firebase deploy

## Sources

Here is the list of sources that I used to write the code for this part of the PWA

* [How to build a mobile app with Angular 2 and Ionic 2](https://scotch.io/tutorials/build-a-mobile-app-with-angular-2-and-ionic-2)
* [Ionic documentation](https://ionicframework.com/docs/)
* [How to build your first PWA](https://codelabs.developers.google.com/codelabs/your-first-pwapp) 