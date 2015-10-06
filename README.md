# react-tutorial
This repository contains the material for the react tutorial at [EBU DevCon 2015](https://tech.ebu.ch/devcon15)

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
    - using Python: run: `cd server && python -m SimpleHTTPServer 8888`
    - using node: run: `cd server && node node_modules/http-server/bin/http-server -p 8888 --cors`
- Open http://localhost:8888/web_advanced/index.html in the browser, verify that you have a web page. This is an 
example page of what we can do with the data. During the workshop you'll build your own! 

The web server accessed will be located at: http://react-tutorial.ebu.io/ 

## Web server API
For the purpose of the tutorial, the webserver installation is optional.
The example web server is using react-tutorial.ebu.io by default.
The API returns yearly European Immigration information by country of previous residence and gender.

Two endpoints are available:
* /data/summary
* /data/country/:countryName:
* /web

### GET /data/summary
Get a summary of all countries. Returns a two dimensional json object. (Dimensions: Country, Year)


**application/json reply:**

    {
      "Belgium": {
        "1960":"42 248",
        "1961":"36 088",
        "1962":"52 834",
        ...
        "2012":"266",
        "2013":"68 636"
      },
      ...
      "Bulgaria": {
        "2005":"2 013",
        "2007":"1 954"
      }
    }


Example : `curl http://react-tutorial.ebu.io/data/summary`


### GET /data/country/:countryName:
Get gender breakdown of a country by year. Returns a two dimensional json object. (Dimensions: Year, Gender)


**application/json reply:**

    {
      "1980": {
        "Males":"28 644",
        "Females":"26 050"
      },
      "1981": {
        "Males":"25 336",
        "Females":"23 962"
      },
      ...
      "2013": {
        "Males":"36 697",
        "Females":"31 939"
      }
    }

Example : `curl http://react-tutorial.ebu.io/data/country/belgium`


### /web 
Get the example of web page. 

### Running the web server locally

You need to install nodejs and npm on your computer.

```
npm install
npm start
```


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
