# WDI-Project3
# General Assembly Project 3 : ArtMapper

## Goal - to build a full-stack RESTful MERN application. A group project.

## Technologies used

* React.js
* Node.js
* HTML5 / SCSS / Javascript (ES6)
* Git / GitHub
* MongoDB & Mongoose
* BCrypt & Session Auth
* Bulma CSS Framework

#### APIs:
* FileStack.js
* Mapbox
* MapQuest
* Artsy.net
* Google Cloud Vision

## Contributors

This was a group project with 3 members. The project was managed using Trello and daily stand-ups.

## Our Application - 'ArtMapper'
< INSERT LOGO >
ArtMapper allows users to see where paintings are geographically located. Users can select a specific artist and see where his or her works are on display. Signed-in users can also add new artists to the database, and add new works of art. The 'Journey' element of the application encourages users to visit galleries. To complete a 'Journey', users must find specified paintings and upload photos of each painting.

##### Users and sessions
Users can register accounts on ArtMapper through the Register Page. Users can sign in through the Login Page. Users must be logged in to add new paintings or new artists to the database. Users must also be signed in to complete a 'Journey'.

Signed in users can access their Profile page. From here users can see the number of paintings they have uploaded and edit their user information. User profile images are uploaded using FileStack.

< INSERT USER PROFILE PAGE >  

##### Artists
All paintings on ArtMapper are linked to a specific artist. All artists can be found from the Artists index page. Clicking on a specific artist will take you to the Artist Show page, which shows more information about the artist and all the paintings that have been uploaded to that artists.

< INSERT ARTIST INDEX PAGE >

The location of each painting is shown on the map, with the paintings also displayed below this.  Clicking on a specific painting will take you to the painting show page with more information about the painting and its location shown on a map. We used the Mapbox API to render the maps shown on the artists page and paintings page.

< INSERT ARTIST SHOW PAGE >

New artists can be added to the database on Add Artist Page. When users type in the name of an artist they wish to add, a request is made to the Artsy API in order to find more information about the artist and a wikipedia is automatically generated.

< INSERT NEW ARTIST PAGE >

##### Uploading a new painting

Signed in users can upload new locations of where to find an artists work from the Add Painting Page. An image of the painting can be uploaded using FileStack. The location of the painting can either be adding with 'Use my location' or by entering an address. The 'Use my location' button uses the location of the browser to determine the address of the painting. If you manually enter an address, the MapQuest api is used to geocode the address into latitude and longitude.

< INSERT PAINTING UPLOAD >

##### Journey



## Development process
### Design (mobile first)
### Individual inputs
### Wins
### Challenges
### Future Features
