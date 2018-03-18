# Base HTML5 Bootstrap template on steroids

## How to using?
* clone repo: `git clone https://github.com/itcrab/base-html-bootstrap-template.git`
* install node.js modules: `npm install`
* run sync mode: `npm run sync`
* enjoy!

## Structure
```
[bower_components] - Bower components
[css]              - CSS styles and supported preprocessors (Stylus, LESS, SASS)
[dist]             - Generated resources (compressed CSS&JS, optimized images and screenshots)
[fonts]            - Fonts
[img]              - Images (original images)
[js]               - JS sources and supported preprocessors (CoffeeScript)
[node_components]  - NodeJS components
[views]            - template engines files (Nunjucks, Pug)
...
index.html         - Base template
```

## GulpJS tasks
* `npm run compile`: generating resources (CSS&JS) for base template
* `npm run deploy`: image optimization and creating screenshots for main page (using when you ready to production)
* `npm run sync`: automatic updating resources and live updating page in browser

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
	* Nunjucks: https://mozilla.github.io/nunjucks/
	* Pug: https://pugjs.org/
