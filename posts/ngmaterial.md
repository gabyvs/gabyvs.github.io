Trying out Angular Material for Angular 2.4.10
==============================================

For some random reasons I have to integrate Angular Material with an application built using Angular 2.4.10, which means that I have to use the Angular Material version compatible with that.
I decided to give it a try before actually having to do it, particularly because many of the existing documentation focus on Angular 4 and more recent versions of Angular Material. 

The objectives today will be simple: 

* Run an angular 2.4.10 project using angular material
* Display a simple layout where the next objectives can live
* Use a pre built theme to style the playground app
* Display an indeterminate progress bar with a color theme
* Display an input text with a set of requirements (explained below)
* Import only the Angular Material modules that I'm going to need

**Important Notes**
I'm using this post mainly to have a place where I can go back to remember how I did things, so I'm not going to deep dive into neither Angular 2 details nor Material Design principles. 
I assume you have some good understanding of those concepts. If you want to learn about those first, you can go read about [Material Design Principles](https://material.io/) and [Angular 4](https://angular.io/), which is the next version
of the Angular version that I'm going to be using today.

Also, I'm only trying out a few things to check how I can integrate Angular Material with Angular 2.4.10, so I'm writing everyting on `app.component.html` and `app.component.ts`.
You don't want to do that in a real world application! But since I mentioned that I assume that you already know Angular, I'm going to assume you already knew that as well.

I will be using a particular version of angular cli so it can create an Angular 2.4.10 app. And since I'm not a fan of `npm install -g`, I'll try to do it with a local copy of the cli. So, let's get started.

## Initializing the project

According to the [angular-cli changelog](https://github.com/angular/angular-cli/blob/master/CHANGELOG.md), they started defaulting to angular 4 applications on their version
1.0.0, so I'm going to try to install the version immediately before that one.

    npm install @angular/cli@1.0.0-rc.4
    ./node_modules/@angular/cli/bin/ng new playground
    cd playground
    
Now I need to install angular material, but the version compatible with angular 2.4.10. Taking a look at [angular material changelog](https://github.com/angular/material2/blob/master/CHANGELOG.md)
I can see that they depend on Angular 4 starting on their version 2.0.0-beta.3. So I'm going to install the immediately previous version, flannel-papaya

    npm install --save @angular/material@2.0.0-beta.2
    
Now let's include angular material in the module. Let's open the file `app.module.ts` inside `src/app/` folder and add the following lines to the existing module declaration.
Note that for now I will import the full module, but unless we are using everything, that is not what we should ideally do. So I will be changing that later.

```
import { MaterialModule } from '@angular/material';
...
@NgModule({
  ...
  imports: [
    ...
    MaterialModule
    ...
  ],
  ...
})
export class AppModule { }
```

Angular Material can support touch interactions through *hammer.js* but I'm not going to be using that one today. So back to the console let's run

    ../node_modules/@angular/cli/bin/ng serve
    
And open your favorite browser in port 4200. And cool! I can see that app works! :)  Now that we accomplish our first objective, hands on to the next tasks.

## Layout for playground

I just want to check that material cards, navbar, etc. can be used in this version. So, let's open our `app.component.html` and `app.component.ts` files inside `src/app/` folder, 
and replace the **App Works!** H1 and create a toolbar and a couple of cards instead.


```html
<md-toolbar color="primary">
    <span>{{ title }}</span>
</md-toolbar>
<md-card>
    <md-card-header>
        <md-card-title>Progress</md-card-title>
    </md-card-header>
    <md-card-content>
        <p>Add here a progress bar later</p>
    </md-card-content>
</md-card>
<md-card>
    <md-card-header>
        <md-card-title>Input</md-card-title>
    </md-card-header>
    <md-card-content>
        <p>Add here an input element later</p>
    </md-card-content>
</md-card>
```

And change the title

```typescript
export class AppComponent {
  title = 'My App';
}
```

## Themes

For our toolbar color to work, we need to provide a theme with our color palette. Angular Material provides the following prebuilt themes that are ready to use

* deeppurple-amber
* indigo-pink
* pink-bluegrey
* purple-green

I'll go with *indigo-pinkn*, but you can choose any other if you prefer, or try each one and see how they look!

So, for that I'm going to open `styles.css` file that is inside `src/` folder and import the theme by adding the following line to it

    @import '~@angular/material/core/theming/prebuilt/indigo-pink.css';
    
And now you can look at your browser again.

## Progress Bar

For the progress bar, I need it to

**Be displayed**

I can do that by adding `md-progress-bar` element

**Display on accent color**
 
`md-progress-bar` directive offers `color` property. I can use that and assign color `accent` to it. You can use `warn` or `primary` as well.

**Be indeterminate**

`md-progress-bar` directive offers `mode` property. I can use that and assign 'indeterminate' to it

Let's change our `app.component.html` file again and add the progress bar. Inside the card content intended for this, remove the paragraph element that we used as place holder and add

```html
 <md-progress-bar
      color="accent"
      mode="indeterminate">
</md-progress-bar>
```

Cool, everything works pretty easy as expected. Now, to the hardest task of today's session, the input.

## Input

For the input, I need it to

**Be displayed with an initial width**

I can do that by adding `md-input-container` with an `input` inside it. The important thing is to add `mdInput` directive to the input.
The width can be accomplish with a regular CSS class on the container.

**Do not have a place holder, instead have a prepopulated value**

Seems that I can accomplish that by not adding placeholder directive and by adding `value` property to the `mdInput` directive bound to a member of the class. 

**Show a static suffix**

I can do that by adding a span with `md-suffix` directive

**Show the text right aligned, close to the suffix**

Input container element offers an `align` property. We can assign it to `end` and that should work

This is how my html looks right now

```html
<md-input-container align="end" class="input-container" dividerColor="{{ color }}">
    <input mdInput type="text" value="inputValue">
    <span mdSuffix>-staticSuffix</span>
</md-input-container>
```

And I need the inputValue on the class as well

```
public inputValue: string = 'initialValue';
```

OK, looks good. Now, for the next requirements, I will start using Reactive Forms. If you don't know what they are, check [this](https://angular.io/docs/ts/latest/guide/reactive-forms.html#)

**Check for changes on the input value**

I will start using a Form Control instead of a string value as a member of the class. I will connect to the stream offered by it that listens to changes on the value,
use debounceTime method (from *rxjs*) to check it only every 500 ms, and only check when the values are actually different.

**Show that it is required**

I can add `Validators.required` to my FormControl and then I can change the color of the input line by using `dividerColor="{{ color }}"` property on the input container.
I can tie the color to the property `valid` of my form control.

I can't create an mdError directive since it is not available in this version :(  So Ill use an md-hint directive, and I will style it to an error hint.

**Show validation error**

I'll use basically the same than before, but will add Validators.pattern and will add a regular expression for the pattern that I need. 
I can add a new md-hint element and then add ngIf to both hints, and show them using `hasError` method on my form control. I would have to check for `hasError('required')`
and `hasError('pattern)`.

With all this information, this is how the html would look

```html
<md-input-container align="end" class="input-container" dividerColor="{{ color }}">
    <input mdInput type="text" [formControl]="myInput">
    <span mdSuffix>-staticSuffix</span>
    <md-hint *ngIf="myInput.hasError('required')" align="end" class="hint-error">This field is required</md-hint>
    <md-hint *ngIf="myInput.hasError('pattern')" align="end" class="hint-error">Spaces are not allowed</md-hint>
</md-input-container>
```

And in `app.component.ts`

```
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    public title: string = 'My App';

    public myInput = new FormControl('alohomora', [
        Validators.required,
        Validators.pattern(/^\S+$/)]
    );

    public get color (): string {
        return this.myInput.valid ? 'primary' : 'warn';
    }

    public ngOnInit () {
        this.myInput
            .valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe();
    }

    public ngOnDestroy () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

```

## Import only relevant material modules

This one is easy. Checking the Angular Material [site](https://material.angular.io/components/component/progress-bar), they mention exactly which module you need for each of the components that they have.
So, in the end this is how my AppModule looks like

```
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import {
    MdCardModule,
    MdInputModule,
    MdProgressBarModule,
    MdToolbarModule }           from '@angular/material';
import { ReactiveFormsModule }  from '@angular/forms';

import { AppComponent }         from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MdCardModule,
        MdInputModule,
        MdProgressBarModule,
        MdToolbarModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}

```
 
And we're done!

The current state of the code can be found [here](https://github.com/gabyvs/ng2mat-playground) in case you want to take a look.

Have fun!