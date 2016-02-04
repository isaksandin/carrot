# Carrot

Replace the boring "New Tab"-page of your web browser with something cool! Carrot is a client-side productivity web app for making your everyday surfin' faster and more efficient.

## Features

+ Shortcut keywords for opening one or a group of pages
+ Search keywords for quick searching without a middle step
+ Function keywords for doing simple, useful tasks
+ Multi-language support
+ Customizability

## Setup

Clone this repository and then install its dependencies with `npm install`.

Run `npm start` to open the page.

Copy the url and set it as the start page for "New Tab" and "New Window".

## Usage

A word or a sentence that isn't a keyword will result in an ordinary web search with your selected search engine. A url will simply open the url.

> Example #1: `dog` will, with the default settings, do a Google search with 'dog'.

> Example #2: `https://www.wikipedia.org` opens the url.

### Search keyword

If the first word is one of the _search keywords_, Carrot will use the rest of the sentence as a query on the designated web page.

> Example: `images cute kittens` will, with the default settings, do an image search on Google with 'cute kittens'.

### Shortcut keyword

If the first word is a _shortcut keyword_, Carrot will open the page(s) associated with it.

> No shortcuts come by default. However, let's say you assign `social` to https://www.facebook.com and https://www.twitter.com. It will then open both websites in separate tabs.

### Function keyword

If the first word is a _function keyword_, Carrot will pass the rest of words in the sentence as arguments to the assign function. Read more in the [Plugin files](#plugin-files) section.

## Settings

Click the cog in the bottom right corner (or open pref.html) to go to the settings. Most of the things are self-explanatory.

### Add a search keyword

To add a search keyword simply modify the search word in a url to `{{query}}`. For example, to make a search keyword for YouTube you could make search as you normally would and copy the url (https://www.youtube.com/results?search_query=mysearchword). Then turn it into https://www.youtube.com/results?search_query={{query}}. Enter the new url in the link box and choose a keyword to go with it.

### Add a plugin file

To be able to use a plugin file it has to be located in `/js/plugins` and added, without the .js extension, in the settings.

> Move mypluginfile.js to `/js/plugins`. In the settings, go to the Add plugin file section. Type in the filename, but leave out the .js extension (mypluginfile). Press 'Add'. Next time, the script will be loaded.


## Plugin files

The possibilities with plugins are basically endless. Every plugin script is loaded individually and automatically at startup. (Therefor it's probably wise to combine multiple files unless you want to end up with a ton of them.)

To make a function keyword use `Carrot.addFuncKeyword()`.

```javascript
Carrot.addFuncKeyword({
    sayHelloWorld: function () {
        alert('Hello World!');
    }
});
```

The above code alerts 'Hello World!' when entering `sayHelloWorld`.


Words following the keyword will be passed in an array:

```javascript
Carrot.addFuncKeyword({
    alert: function (args) {
        var SentenceToAlert = args.join(' ');
        alert(SentenceToAlert);
    }
});
```

With the command `alert This is cool!`, the above code would result in an alert saying 'This is cool!'.


Multiple function keywords can be added by adding more methods to the object:

```javascript
Carrot.addFuncKeyword({
    sayHelloWorld: function () {
        alert('Hello World!');
    },
    alert: function (args) {
        var SentenceToAlert = args.join(' ');
        alert(SentenceToAlert);
    }
});
```


## License

[MIT](http://opensource.org/licenses/MIT) © Isak Sandin