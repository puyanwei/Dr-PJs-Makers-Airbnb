# Dr PJ's Makers Air Bnb
This web application allows users to list rooms they have available, and to book rooms. This was an one week group project of which we named it using acronyms of our names;
[**d**avid-div](https://github.com/david-div), [**r**olandosorbelli](https://github.com/rolandosorbelli), [**p**yan83](https://www.github.com/pyan83)
[**j**enniferbacon01](https://github.com/jenniferbacon01), and
[**s**tephengeller](https://github.com/stephengeller).

I have written a blog [post](https://thep-log.blogspot.co.uk/2017/09/makers-week-six-grouping-up-for-makers.html) about my experience in this project.

Tech Stack
-----
* Javascript
* Mongo DB
* Node JS
* Express
* Mocha Chai
* Zombie JS

Features
-----
- Any signed-up user can list a new space.
- Users cannot access extra features unless they are signed in.

Once signed in:  
- Users can list multiple spaces with a name, a short description of the space, a location and a price per night.  
- Users can book a room. Once a room has been booked, it can't be booked again.
- Users can unlist their own rooms but not other user's rooms.

Installation
-----
Clone this repository by typing 'git clone git@github.com:pyan83/DrPJsMakersBnB.git'

To set up mongo database, type the following into your command line:  
````
  'brew install mongodb'  
  'sudo mkdir -p /data/db'  
  'sudo chown -R `id -un` /data/db'  
````
Run 'npm install' to install all the relevant packages.
Type 'mongod' to connect to the mongo database, and then
'nodemon' to connect to the server to run the app.  

Testing
-----
Run all feature tests and unit tests by typing 'mocha' into your command line when you are in in the DrPJsMakersBnB directory.  
Tests are available to view in DrPJsMakersBnB/test directory.  
