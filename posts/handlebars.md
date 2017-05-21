Trying out Handlebars with Gulp
===============================

I've been watching a series of O'Reilly videos by Adam Scott. 
In them, Adam gives an introduction on front-end development tools and as part of that he uses a framework
called Handlebars to show HTML templating.

I decided to give it a try and build a small application, just to get a sense on how to use it. 
**Note** that this post is not meant to be a detailed demo or tutorial of Handlebars. Some understanding of html templating in general is required.
If you want more detailed information, check out Handlebars [documentation](http://handlebarsjs.com/).

The application will be a simple vacation planner (maybe planner is a big word). It will allow you to see
the date of your next vacation, will show you a countdown for the event, will let you see the places that you would like to visit 
and finally it will let you vote on your favorite places to go. Here is a mock of how it should look.

![Vacation Planner Mock](/img/vacation-mock.jpg)

I made the mock myself, but the
[logo](https://thenounproject.com/search/?q=vacation&i=1033902) 
is by [Gan Khoon Lay](https://thenounproject.com/leremy/) 
/ [CC](https://creativecommons.org/licenses/by/3.0/us/)

Since the project will be using *Gulp* and *BrowserSync* I will use my gulp base project that I created in [this other post](/posts/gulp.md). 
The source code for that is [here](https://github.com/gabyvs/gulp-starter). 
The only addition will be that I am going to be using Gulp to compile handlebars templates into html as well.

If you want to take a look of the end state of the code, you can check it out [here](https://github.com/gabyvs/handlebars-vacation-planner). 
If you prefer to build it from scratch and learn how to do it, let's get our hands on to the task. 

## Initializing the project

On your terminal, run

    git clone https://github.com/gabyvs/gulp-starter vacation-planner && cd $_
    rm -rf .git
    npm install
    
**Optional:** If you want to create your own repo, you can run
    
    git init
    git add .
    
If you created your own repo, maybe at some point you also want to edit the `README.md` file on the root folder, 
since for now it reflects the readme of the base gulp starter project.

If you want, you can run `npm start` see that the initial gulp process runs, although it will show a blank page for now. 
Exit the process after you have verified it.

Now, let's install the gulp tool to compile handlebars templates, as well as a rename tool.

    npm install --save-dev gulp-compile-handlebars gulp-rename

At this point, our project structure should look like this

```
vacation-planner
|   gulpfile.js
|   index.html
|   package.json
|   README.md
|__ src
    |   images
    |   scripts
    |   styles
```

Our gulpfile.js file already takes care of styles, scripts and images tasks. We are only missing the handlebars part.

## Handlebars compilation with Gulp
 
We will be writing our templates and partials inside `/src/templates` folder, so we want our gulp task to 
 
 * Import the main template from /src/templates folder
 * Compile this into html
 * Rename the compiled template to the main html file
 * Save it into the application root folder
 * We don't want browserSync to reload the browser after this task (the default task is taking care of that particular part)

So, open your `gulpfile.js` file that is located in the root folder and add the following lines
 
```javascript1.6
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

gulp.task('templates', () => {
    return gulp.src(['src/templates/*.hbs'])
        .pipe(handlebars())
        .pipe(rename((path) => {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./'));
});
```

Also, change the default task so it includes the call to template task in both start and changes to templates
 
```javascript1.6
gulp.task('default', ['styles', 'images', 'scripts', 'templates'], () => {
    browserSync.init({
        server: './'
    });
    gulp.watch('src/styles/**/*.less', ['styles']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/templates/**/*.hbs', ['templates']);
    gulp.watch('*.html', browserSync.reload);
});
```

Create a `templates` folder in the application root folder and move the index.html file from the application root folder to
our new `src/templates` folder and rename it to index.hbs
Now you can run `npm start` again and see that our gulp process still runs (still a blank page). Exit the process after you have verified it.

And now we are good to go and start typing some of our application code!

## Handlebars Templates

Handlebars templates look like regular HTML, with embedded handlebars expressions. 
A handlebars expression is ```{{``` , some contents, followed by ```}}```
Handlebars partials allow for code reuse by creating shared templates. You can also use this to break your application logic into smaller pieces. To use
 that you need to include ```{{>templateName}}``` in your handlebars files.

With these facts and the mock in mind, we can break our main html file into three main sections

* Header: includes the title, the logo and some text
* Countdown: includes months and days missing to the so expected day
* Choices: includes all the vacation choices that we have so far

So let's create a `partials` folder inside `src/templates` and inside it 3 partial templates: `header.hbs`, `countdown.hbs` and `choices.hbs`

Each of the handlebars templates are partial HTML templates, so apart from the fact that they don't need the `<html>`, `<head>` and `<body>` tags,
you can write regular well-known HTML on them. 

Let's fill them with some static HTML that puts us closer to our web page.

For the `header.hbs` partial

```html
<header class="header-container">
    <div class="wrap">
        <h1>GO on Vacation!</h1>
        <img src="dist/images/go.png" alt="vacation-icon">
        <p>Let's plan our next amazing vacation on</p>
        <p>July 20th, 2017</p>
    </div>
</header>
```

For the `countdown.hbs` partial

```html
<section id="countdown" class="countdown-container">
    <div class="wrap">
        <ul class="countdown-list">
            <li><span id="months">3</span>Months</li>
            <li><span id="days">2</span>Days</li>
            <li><span id="hours">1</span>Hours</li>
        </ul>
    </div>
</section>
```
For the `choices.hbs` partial

```html
<section id="choices" class="choices-container">
    <div class="wrap">
        <h2>Vacation Choices</h2>
        <p>Please vote for your favorite places</p>
        <ul class="choices-list">
            <li class="choice">
                <span class="choice-title">Inverness</span><span class="choice-count">3</span>
            </li>
            <li class="choice">
                <span class="choice-title">Vancouver</span><span class="choice-count">2</span>
            </li>
            <li class="choice">
                <span class="choice-title">Chicago</span><span class="choice-count">1</span>
            </li>
        </ul>
    </div>
</section>
```

Now let's use our partials inside the `index.hbs` file so they are used and compiled by gulp.

```html
<body>
{{> header }}
{{> countdown }}
{{> choices }}
</body>
```
We also need to change our `gulpfile.js` so it compiles the partials before generating the main html file. For that to happen, we need to make sure
that all the data that handlebars templates are expecting as part of handlebars expressions is available at the time that the templates are compiled.

Take a look at our partials. Since we don't have any handlebars expressions there we can pass an empty template data object for now. 
So, change the `templates` task to look like this
 
```javascript1.6
gulp.task('templates', () => {
    const templateData = {};

    const options = {
        batch: ['src/templates/partials']
    };
    gulp.src(['src/templates/*.hbs'])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./'));
});
```

**Note:** I'm not adding in this post the styles to save space and because it is not the main topic of it. But you can check out the final state of the styles 
[here](https://github.com/gabyvs/handlebars-vacation-planner/tree/master/src/styles)


I also added an amazing [icon](https://thenounproject.com/search/?q=vacation&i=1033902) 
made by [Gan Khoon Lay](https://thenounproject.com/leremy/) 
/ [CC](https://creativecommons.org/licenses/by/3.0/us/) into the `src/images` folder.

Now you can run `npm start` again and see that the page starts looking like our mock. You can leave it running this time.

## Templates Data

You can notice that so far all the data that we are displaying is static. For example, the choices list and the countdown area have hardcoded values.
Let's see now how can we inject data into our handlebars templates.

Let's create a file `data.json` in our application root folder and write the following information that will be used to populate the vacation choices area.
 
```json
{
    "choices": [
        {
            "place": "Inverness",
            "count": 3,
            "id": 1
        },
        {
            "place": "Vancouver",
            "count": 2,
            "id": 2
        },{
            "place": "Chicago",
            "count": 1,
            "id": 3
        }
    ]
}
```

And let's change our section-list area inside `choices.hbs` to read from a handlebars expression

```handlebars
 <ul class="section-list">
    {{#each choices}}
        <li class="choice link" data-id="{{id}}">
            <span class="choice-title">{{place}}</span><span class="choice-count">{{count}}</span>
        </li>
    {{/each}}
</ul>
```

And as mentioned before, now that we have partials that are expecting handlebars expressions to be evaluated at compilation time, 
we need to make sure that this information is available, otherwise our gulp task would fail. So open your `gulpfile.js` file and add
at the beginning of the file

```javascript
const data = require('./data');
```

Also, change the `templates` task to use this data as templateData, instead of the empty object that we passed on the previous section.

```javascript
const templateData = data;
```

And that's it! We have successfully used handlebars templates in this project. The next section will show how to add some logic to the page to 
allow users to vote for their favorite places and to calculate the values on the countdown. That is more focused on JavaScript logic than in handlebars really, so feel free to skip it. 
I'm just adding it for completeness of the page.

## JavaScript Logic

Our `gulpfile.js` file already includes a task for browserify to handle `require` on our scripts. 
So let's create a `modules` folder inside `src/scripts` and inside it 3 JavaScript files: `controller.js`, `model.js` and `service.js`.

### Model

Let's start with our model. Seeing our page, for displaying the data we want to display seems that we will need:

* the current date to calculate countdown
* the date of our vacation for the same reason
* the list of choices so we can change the number of votes
* when voting, the choice that is currently being voted

```javascript
var data = require('../../../data.json');

var model = {

    currentDate: new Date(),

    vacationDate: new Date(2017, 9, 13),

    choices: data.choices,

    choice: {
        place: undefined,
        count: undefined,
        id: undefined
    }

};

module.exports = model;
```

### Service

The service will help us doing calculations or processing our data. Seems that we will need

* A way to calculate countdown values, the time between now and our vacation date
* A way to increment the number of votes for a choice that is being voted, and because of this
* A way to set and get the choice that is being voted

For simplicity of the code, I'm using a dependency called `countdown`. You can check it out [here](https://www.npmjs.com/package/countdown).
Also, even though I will calculate the countdown when the page loads, I'm not recalculating the time after that, but feel free to add that on your code. 
So now stop your application if you had it running and run 

```
npm install --save countdown
```

Then add the following code to the `service.js` file 

```javascript
var countdown   = require('countdown');
var model       = require('./model');

var service = {

    dateDiff: function () {
        return countdown(model.currentDate, model.vacationDate);
    },

    setCurrent: function (id) {
        model.choice = model.choices.find(function (choice) {
            return choice.id == id;
        });
    },

    increment: function () {
        model.choice.count += 1;
    },

    getCurrent: function () {
        return model.choice;
    }

};

module.exports = service;
```

### Controller

The controller will have the logic that the templates require for us to be able to interact with them. Seems that we need

* A way to know when a choice is being clicked
* When a choice is being clicked, increment the number of votes for that item in our model
* After writing in our model the new value, reflect the new value in our page
* A way to show the countdown values that we calculated in our service


```javascript
var service = require('./service');

function registerClick () {
    var id;
    var listItems = document.querySelectorAll('#choices li');

    listItems.forEach(function (item) {
        item.addEventListener('click', function () {
            id = this.getAttribute('data-id');
            service.setCurrent(id);
            service.increment();
            updateCount();
        });
    });
}

function updateCount () {
    var choice = service.getCurrent();
    var li = document.querySelector('[data-id="' + choice.id + '"]');
    var count = li.querySelector('.choice-count');
    count.innerHTML = choice.count;
}

function showCountdown () {

    var diff = service.dateDiff();

    document.querySelector('#months').innerHTML = diff.months;
    document.querySelector('#days').innerHTML = diff.days;
    document.querySelector('#hours').innerHTML = diff.hours;

}

var view = {

    init: function () {
        showCountdown();
        registerClick();
    }

};

module.exports = view;
```

Finally, open your `main.js` file and add the following code, so it loads our controller as soon as the page is loaded.

```javascript
var controller = require('./modules/controller');

var app = {

    init: function () {
        controller.init();
    }

};

app.init();
```

Now you can run `npm start` again and see that we finally have our page finished! Click a few times in the choices
and you will see how the votes are increased every time.

Enjoy!