try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');  
} catch (e) {}

window.onload = event => console.log('Theme initialised!:', { event });