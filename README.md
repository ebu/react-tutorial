# react-tutorial
This repository contains the material for the react tutorial at EBU DevCon 2015

An example of the app that we intend to create can be found here: http://react-tutorial.ebu.io/web/

## Setup 
### For the workshop
During the workshop, the web server is not supposed to be edited. 

In order to edit the JavaScript and HTML code, you should: 

- Install Git (and the github desktop app if you are not very confortable with the command line)
- Clone this project on your laptop (fork it before if you want to put your code on github later).
- Install a recent browser (Chrome would be best)
- To Run a webserver from a terminal: 
  1. cd to the root of the react-tutorial directory you cloned from github. For example: `cd Desktop/react-tutorial`
  2. You can run the server using either python or nodejs. 
    - using Python: run: `python -m SimpleHTTPServer 8888`
    - using node: run: ` node node_modules/http-server/bin/http-server -p 8888 --cors`
- Open http://localhost:8888/web/index.html in the browser, verify that you have a web page. This is an 
example page of what we can do with the data. During the workshop you'll build your own! 

The web server accessed will be located at: http://react-tutorial.ebu.io/ 

## Web server API

### /data/summary
Get a summary of all countries.  

### /data/country/<countryName>
Get additional data for the country.

## /web 
Get the example of web page. 

## About
## Contributors
- Solène Buet (EBU)
- Mathieu Habegger (EBU)
- Michael Barroco (EBU)
- Christopher Chiche (www.christopherchiche.com)

Pull requests are welcome! 

## Copyright & license
Copyright (c) 2015, EBU-UER Technology & Innovation
The code is under BSD (3-Clause) License. (see LICENSE)
