Writing a Gulp starter project
==============================

I've been trying out different small things and frameworks for front end development. From playing around with styles or
  trying different variations of HTML templating. Small and quick things that last one afternoon at most. I found out that sometimes even for
  small things having the ability to write *less* over *css* or have a task that reloads your changes in the browser before
  you have to manually do so is a great help. So I decided to create a base project that uses gulp and it's ready for me to 
  start typing code for small web apps. 
  
I decided to write this as a post so I have a place to come back once I forget why or how I did some things.
If you want to see the end result of this post the source code is [here](https://github.com/gabyvs/gulp-starter).

The project will be using *Gulp, Browserify* and *BrowserSync* to automate the following tasks:

* Minify images (with *gulp-imagemin*)
* Preprocess Less files, compile them into CSS (with *gulp-less*)
* Minify CSS and adding sourcemaps (with *gulp-minify-css* and *gulp-sourcemaps*)
* Build a single bundled javascript file while allowing us to write modular applications (with *browserify,* *vinyl-buffer* and *vinyl-source-stream*) 
* Uglify final javascript and adding sourcemaps (with *gulp-uglify* and *gulp-sourcemaps*)
* Observing changes in files and making them available immediately in the browser (with *browser-sync*)

OK, so hands on to the task. 

## Initializing the project

On your terminal, run

    npm init  
    npm install --save-dev gulp browser-sync gulp-compile-handlebars gulp-imagemin gulp-less gulp-minify-css gulp-rename gulp-sourcemaps gulp-uglify browserify vinyl-source-stream vinyl-buffer

We want our project structure to look like this (go ahead and create the empty files and folders on your project folder)

```
my-project-root-folder
|   gulpfile.js
|   index.html
|__ dist
|__ src
    |   images
    |   scripts
    |   styles
```

## Gulp tasks

With that in mind, we have to write our gulpfile.js file to read source files from src subfolders
and generate minified, uglified and compiled versions of those files into dist folder. Let's open our gulpfile.js file 
and start by importing all the helper plugins.

```javascript
const buffer        = require('vinyl-buffer');
const browserSync   = require('browser-sync').create();
const browserify    = require('browserify');
const gulp          = require('gulp');
const imageMin      = require('gulp-imagemin');
const less          = require('gulp-less');
const minifyCss     = require('gulp-minify-css');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');
const source        = require('vinyl-source-stream');

```

Almost all of our gulp tasks will be using `gulp.src`, which will return a node stream of [vinyl](https://github.com/gulpjs/vinyl-fs) files that we will pipe
into our node plugins that will help us accomplish the tasks mentioned. The only task that won't use `gulp.src` will need to take a text input and create
a vinyl-file instance to pass down the stream. 

### Image minification

Let's start with the most simple one, the image minification task. We want our task to
 * Read original image files from src/img folder and its subfolders
 * Pass them trough imageMin
 * Save the minified images into dist/img subfolder
 * Tell browserSync to reload the browser only after all previous things have finished
 
```javascript1.6
gulp.task('images', () => {
    gulp.src(['src/img/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});
```

### Less styles compilation to CSS, minification and sourcemaps

Next, to the following task in complexity. Styles.

We will have a single main.less entry file. In it we will import other files that we need. We want our task to
 * Read main.less file from /src/styles folder
 * Create sourcemaps with the original content
 * Compile Less and generate CSS content instead
 * Minify the new CSS generated styles
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/styles/folder
 * Tell browserSync to reload the browser only after all previous things have finished
 
 ```javascript1.6
 gulp.task('styles', () => {
     gulp.src(['src/styles/main.less'])
         .pipe(sourcemaps.init())
         .pipe(less())
         .pipe(minifyCss())
         .pipe(sourcemaps.write())
         .pipe(gulp.dest('dist/styles'))
         .pipe(browserSync.stream());
 });
```

### Javascript uglification, minification and sourcemaps

 For our JavaScript files. We would like to have the ability to write modular applications, separate our
 logic into different files, maybe import dependencies. Pretty much the things that you can do when you write node applications.
 However, browsers don't have the `require` method defined. So we will use *browserify* to help us bundle up all our dependencies.
 
 Since *browserify* is not a gulp plugin, we are going to use also *vinyl-buffer* and *vinyl-source-stream*
 
 So, we want our task to
 * Setup browserify using `/src/scripts/main.js` as entry point
 * Create a single bundle letting *browserify* resolve all the required dependencies
 * Use the output to create a single bundled `main.js` file
 * Convert it into a vinyl file instance 
 * Use the vinyl file instance to create a stream that we can pipe to so it can be used in our node streams
 * Use that output to create sourcemaps
 * Uglify/minify the output
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/scripts/folder
 * Tell browserSync to reload the browser
 
 ```javascript1.6
gulp.task('scripts', () => {
    const b = browserify({
        entries: './src/scripts/main',
        debug: true
    });

    b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});
```

### Sync files with browser
Finally we want our browser to reload when changes in some of our files occur during development time.
We also want our assets to be compiled, minified and ready since the first we load our browser, without having
to wait for changes to those file to occur. So we want our default gulp task to
 * Run all tasks for the first load 
 * Init browserSync server
 * Run styles task on changes to less files on /src/styles/ folder and subfolders
 * Run images task on changes to images on /src/img/ folder and subfolders
 * Run scripts task on changes to JS scripts on /src/scripts/ folder and subfolders
 * Run templates task on changes to handlebars files on /src/templates/ folder and subfolders
 * Reload browser on changes to html files on root folder
 
```javascript1.6
gulp.task('default', ['styles', 'images', 'scripts'], () => {
    browserSync.init({
        server: './'
    });
    gulp.watch('src/styles/**/*.less', ['styles']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('*.html', browserSync.reload);
});
```  

## Start the project

The last thing to do is to create an npm task to start our project. 
We will be running gulp locally in order to avoid forcing users to install gulp globally.
Open your `package.json` file and add the following script inside the `scripts` section

    "scripts": {
        "start": "./node_modules/gulp/bin/gulp.js"
    }

For demo purposes, you can go ahead and create a simple `index.html` file on the root application folder so you can see your application running.
Something like this should be enough

    <!DOCTYPE html>
    <html>
    <head>
        <title>My Project</title>
        <link rel="stylesheet" href="dist/styles/main.css">
    </head>
    <body>
        <h1>Hi there!</h1>
    </body>
    </html>
 
Create a simple *main.less* file inside `src/styles` folder so we can see if our gulp logic is working. 
Something like this should be enough

    h1 {
        color: pink;
    }

Now you can go to your terminal and from the application root folder run
    
    npm start
    
After this, you can check out your browser at [localhost:3000](http://localhost:3000) and see that everything is working 
(it will be just a blank page for now). 

And now we are good to go and start typing some web application code!

The github repository with things as they are now is [here](https://github.com/gabyvs/gulp-starter). 
Feel free to pull it and use it if it helps you. You would need to:

* Clone this repo and save it in a folder named as your project


    git clone https://github.com/gabyvs/gulp-starter your-project-name && cd $_
    
* Remove all the history of the current project (this project will be used as starting point)
    
    
    rm -rf .git

* Start a new repository for your project


    git init
    
* Install all the dependencies
    
    
    npm install
     
* Start the application (a blank page until you write some application code)


    npm start

Enjoy!
