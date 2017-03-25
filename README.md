# Base HTML5 Bootstrap template
Starting from scratch template on steroids.

## How to using?
* clone repo: `git clone https://github.com/itcrab/base-html-bootstrap-template.git`
* execute script: `exec/starting_from_scratch.{bat,sh}`
* enjoy!

## Structure
```
[bower_components] - Bower components
[css]              - CSS styles and supported preprocessors (Stylus, LESS, SASS)
[dist]             - Generated resources (compressed CSS&JS, optimized images and screenshots)
[exec]             - Execute scripts (first run and GulpJS tasks)
[fonts]            - Fonts
[img]              - Images (original images)
[js]               - JS sources and supported preprocessors (CoffeeScript)
[node_components]  - NodeJS components
[views]            - HTML template engines files (Pug)
...
index.html         - Base template
```

## GulpJS tasks
* **compile**: generating resources (CSS&JS) for base template
* **deploy**: image optimization and creating screenshots for main page (using when you ready to production)
* **default**: automatic updating resources and live updating page in browser

Notice: you may use your IDE/Editor (WebStorm or another) or executing scripts in `exec` directory

## Steroids (THANKS!):
* Bower: http://bower.io
	* jQuery: https://jquery.com
	* Bootstrap: http://getbootstrap.com 
	* html5shiv: https://github.com/afarkas/html5shiv
	* Respond: https://github.com/scottjehl/Respond
* CSS
	* LESS: http://lesscss.org
	* SASS: http://sass-lang.com
	* Stylus: https://learnboost.github.io/stylus/
* JS
	* CoffeeScript: http://coffeescript.org
* NodeJS: https://nodejs.org
	* GulpJS: http://gulpjs.com
* HTML
	* HTML5 Boilerplate: https://github.com/h5bp/html5-boilerplate
	* Pug: https://pugjs.org/
