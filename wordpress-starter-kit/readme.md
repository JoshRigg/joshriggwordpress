# WordPress Starter Kit
Dockerized WordPress starter kit for custom theme and plugin development.

## Features
* Dockerized WordPress environment
* Compile source code on-the-fly using Gulp
* Live Reloading and cross-device testing while you work thanks to BrowserSync
* Unopinionated - only the minimum required files are included
* Create a .zip file of your production-ready theme and plugin with a single command!

## Requirements
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* [Node](https://nodejs.org/)

## Getting started
* Clone the repo
* Run ``npm install`` to install the necessary NPM packages
* That's it! You're ready to rock, just check the commands section below

## Commands
| Command  | Description
|---|-
| ``docker-compose up -d`` | Start the WordPress and database containers
| ``docker-compose down`` | Stop the Wordpress and database containers
| ``npm run build`` | Build the theme and plugin **once** and output the results to the ``'./dist`` directory
| ``npm run release`` | Build the theme and plugin, create .zip files for them both and output the results to the ``'./dist`` directory
| ``npm run clean`` | Purges the ``'./dist`` directory

## Configuration
Configure your build by updating the included ``config.json`` file. 
The options and their descriptions are below;

| Option | Description
|---|-
| ``outputDir`` | Set the name of the output directories used when building the theme and plugin (remove to use ``./theme`` and ``./plugin`` instead)
| ``buildTheme`` | Enable/disable generation of the theme
| ``buildPlugin`` | Enable/disable generation of the plugin

## Contributors
[Donny Burnside](http://donnyburnside.com/)

## License
Licensed under [GPLv2](http://www.gnu.org/licenses/gpl-2.0.html).