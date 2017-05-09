Writing a Gulp starter project
==============================

I've been trying out different small things and frameworks for front end development. From playing around with styles or
  trying different variations of HTML templating. Small and quick things that last one afternoon at most. I found out that sometimes even for
  small things having the ability to write *less* over *css* or have a task that reloads your changes in the browser before
  you have to manually do so is a great help. So I decided to create a base project that uses gulp and it's ready for me to 
  start typing code for small web apps. 
  
I decided to write this as a post so I have a place to come back once I forget why or how I did some things.
If you want to see the end result of this post the source code is [here](https://github.com/gabyvs/gulp-starter).

The project will be using *Gulp* and *BrowserSync* to automate the following tasks:

* Minify images (with *gulp-imagemin*)
* Preprocess Less files, compile them into CSS (with *gulp-less*)
* Minify CSS and adding sourcemaps (with *gulp-minify-css* and *gulp-sourcemaps*)
* Uglify javascript and adding sourcemaps (with *gulp-uglify* and *gulp-sourcemaps*)
* Observing changes in files and making them available immediately in the browser (with *browser-sync*)

OK, so hands on to the task. 

## Initializing the project

On your terminal, run

    npm init  
    
Give some sensitive inputs for the questions that npm will ask. Then run

    npm install --save-dev gulp browser-sync gulp-compile-handlebars gulp-imagemin gulp-less gulp-minify-css gulp-rename gulp-sourcemaps gulp-uglify
    

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
const browserSync   = require('browser-sync').create();
const gulp          = require('gulp');
const imageMin      = require('gulp-imagemin');
const less          = require('gulp-less');
const minifyCss     = require('gulp-minify-css');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');

```

All our gulp tasks will be using `gulp.src`, which will return a node stream of [vinyl](https://github.com/gulpjs/vinyl-fs) files that we will pipe
into our node plugins that will help us accomplish the tasks mentioned. 

### Image minification

Let's start with the most simple one, the image minification task. We want our task to
 * Read original image files from src/img folder and its subfolders
 * Pass them trough imageMin
 * Save the minified images into dist/img subfolder
 * Continue with browserSync logic only after all previous things have finished
 
```javascript1.6
gulp.task('images', () => {
    gulp.src(['src/img/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});
```

### Javascript uglification, minification and sourcemaps

Next, to the following task in complexity. JS Scripts. We want our task to
 * Read original scripts from /src/scripts/ folder
 * Create sourcemaps with the original content
 * Uglify/minify the scripts
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/scripts/folder
 * Continue with browserSync logic only after all previous things have finished
 
 ```javascript1.6

gulp.task('scripts', () => {
    gulp.src(['src/scripts/main.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream())
});
```

### Less styles compilation to CSS, minification and sourcemaps

We will have a single main.less entry file. In it we will import other files that we need. We want our task to
 * Read main.less file from /src/styles folder
 * Create sourcemaps with the original content
 * Compile Less and generate CSS content instead
 * Minify the new CSS generated styles
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/styles/folder
 * Continue with browserSync logic only after all previous things have finished
 
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

And now we are good to go and start typing some web application code!

The github repository with things as they are now is [here](https://github.com/gabyvs/gulp-starter). 
Feel free to pull it and use it if it helps you. You would need to:

* Clone this repo and save it in a folder named as your project

```
git clone https://github.com/gabyvs/gulp-starter your-project-name && cd $_
```
    
* Remove all the history of the current project (this project will be used as starting point)
    
```
rm -rf .git
```

* Start a new repository for your project

```
git init
```
    
* Install all the dependencies
    
```
yarn
``` 

If you don't use yarn, you can also run `npm install` instead

Enjoy!
