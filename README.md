# react-tutorial
This repository contains the material for the react tutorial at EBU DevCon 2015

## About
The main.js file will generate for you an object containing ten lines, chosen randomly from the data you will give in argument.

The data used in that usecase can be found here: ftp://ita.ee.lbl.gov/traces/NASA_access_log_Jul95.gz

It is provided by the NASA Kennedy Space Center WWW server in Florida.

The lines obtained will be presented as following:

   "ip":"199.120.110.21",

   "city":"Iowa",
   
   "country":"US",
   
   "latitude":"41.5839",
   
   "longitude":"-93.6289",
   
   "date":"[01/Jul/1995:00:00:09 -0400]",
   
   "request":""GET /shuttle/missions/sts-73/mission-sts-73.html HTTP/1.0"",
   
   "status_code":"200",
   
   "content_size":"4085"
   

The convert.py script will process line by line the log information and give you the location from where requests are done (State, Country, Latitude and Longitude).

Once converted, the returned file will have the name of your file followed by the .converted extension.

convert.py use the freegeoip database, that provides a public HTTP API for software developers to search the geolocation of IP addresses.

You will use vagrant in order to run the main file. For now, it is configured so you can access from your browser at localhost:300/data.

You need then to install vagrant: https://www.vagrantup.com/

We provide you already with a vagrant file running "ubuntu/trusty64" and prepared to use npm, node, express and readline modules.

### Usage:

1. Convert with the use of convert.py your data: `python convert.py dataFileName`
2. In the directory where your vagrantfile is place, run: `vagrant up`
3. Run main.js: `node main.js dataFileName.converted`
4. Launch localhost:300/data

## Contributors
Solène Buet (EBU)
Mathieu Habegger (EBU)

## Copyright & license
Copyright (c) 2014, EBU-UER Technology & Innovation
The code is under BSD (3-Clause) License. (see LICENSE)
