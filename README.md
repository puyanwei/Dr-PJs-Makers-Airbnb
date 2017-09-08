# DrPJsMakersBnB
This web application allows users to list rooms they have available, and to book rooms.
### Features
- Any signed-up user can list a new space. 
 
Once signed in:  
- Users can list multiple spaces with a name, a short description of the space, a location and a price per night.  
- Users can book a room. Once a room has been booked, it can't be booked again.  

How to Install
-----
Clone this repository by typing 'git clone https://github.com/stephengeller/DrPJsMakersBnB' into your command line.  
To set up mongo database, type the following into your command line:  
````
  'brew install mongodb'  
  'sudo mkdir -p /data/db'  
  'sudo chown -R `id -un` /data/db'  
````
In your command line, 'npm install' to install all the relevant packages.


How to Run
-----
In your command line:  
  'mongod' to connect to the mongo database.  
  'nodemon' to connect to the server and run the app.  
  
How to Test
-----
Run all feature tests and unit tests by typing 'mocha' into your command line when you are in in the DrPJsMakersBnB directory.  
Tests are available to view in DrPJsMakersBnB/test directory.  

Comments
-----
We used an MVC model with app.rb as the controller in the root directory.  
We refactored the controller into separate js files in the routes folder.  
All our pages are rendered using ejs files in the views folder, splitting up the header and footer into separate ejs files in the partials folder.