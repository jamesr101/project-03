# WDI-Project3
# General Assembly Project 3 : ArtMapper

## Goal - to build a full-stack RESTful MERN application. A group project.

## Technologies used

* React.js
* Node.js
* HTML5 / SCSS / JavaScript (ES6)
* Git / GitHub
* MongoDB & Mongoose
* BCrypt & Session Auth
* Bulma CSS Framework & SCSS
* Chai

#### APIs:
* FileStack.js
* Mapbox
* MapQuest
* Artsy.net
* Google Cloud Vision

## Contributors

This was a group project with 3 members. The project was managed using Trello and daily stand-ups.

## Our Application - 'ArtMapper'
![artmapper logo](https://user-images.githubusercontent.com/40343797/48482269-27357f80-e808-11e8-84de-39bad79fbf73.png)

ArtMapper allows users to see where paintings are geographically located. Users can select a specific artist and see where his or her works are on display. Signed-in users can also add new artists to the database, and add new works of art. The 'Journey' element of the application encourages users to visit galleries. To complete a 'Journey', users must find specified paintings and upload photos of each painting.

##### Users and sessions
Users can register accounts on ArtMapper through the Register Page. Users can sign in through the Login Page. Users must be logged in to add new paintings or new artists to the database. Users must also be signed in to complete a 'Journey'.

Signed in users can access their Profile page. From here they can see the number of paintings they have uploaded and edit their user information. User profile images are uploaded using FileStack.

![artmapper profile page](https://user-images.githubusercontent.com/40343797/48482315-42a08a80-e808-11e8-94fc-6a6d1c57e7f8.png)

##### Artists
All paintings on ArtMapper are linked to a specific artist. All artists can be found from the Artists index page. Clicking on a specific artist will take you to the Artist Show page, which shows more information about the artist and all the paintings that have been uploaded to that artists.

![artist showpage with map and paintings](https://user-images.githubusercontent.com/40343797/48482809-95c70d00-e809-11e8-8fcb-17e1cf0c7ccf.png)

The location of each painting is shown on the map, with the paintings also displayed in a grid below this. Clicking on a specific painting will take you to the Painting Show page with more information about the painting and its location shown on a map. We used the Mapbox API to render the maps shown on the Artist Show pages and Painting Show pages. Paintings on the Artist Show pages can be filtered by a time period or searched for by name.

![artmapper painting show page](https://user-images.githubusercontent.com/40343797/48482657-30731c00-e809-11e8-9ad8-4ca74896e7fd.png)


New artists can be added to the database on the Add Artist Page. When users type in the name of an artist they wish to add, a request is made to the Artsy API in order to find more information about the artist and a wikipedia link is automatically generated.

<img width="248" alt="New Artist Page" src="https://user-images.githubusercontent.com/40343797/48483267-dbd0a080-e80a-11e8-9e4c-f88f0594d019.png">

##### Uploading a new painting

Signed in users can upload new locations of where to find an artists work from the Add Painting Page. An image of the painting can be uploaded using FileStack. The location of the painting can either be adding with 'Use my location' or by entering an address. The 'Use my location' button uses the location of the browser to determine the address of the painting. If you manually enter an address, the MapQuest api is used to geocode the address into latitude and longitude. If the MapQuest api can not locate the address, an error is shown.

<img width="249" alt="New Painting Page" src="https://user-images.githubusercontent.com/40343797/48483572-b4c69e80-e80b-11e8-9784-3b9ae3f4f29b.png">

##### Journey

The Journey section encourages users to explore galleries to locate paintings. Signed-in users can select a Journey to complete. A journey is comprised of a list of paintings by an artist. Users must locate the paintings in the real world to complete the journey. When a user has found the painting, they must take a photo of the painting (using FileStack). This image is then sent to the Google Cloud Vision api in order to verify that the photo is of the correct painting. If the photo is correct, the painting will be ticked off the journey.

![artmapper journey page](https://user-images.githubusercontent.com/40343797/48482712-5993ac80-e809-11e8-8018-3c6d68143498.png)

## Development process

The development process started with simple wireframes to workout the basic functionality of the site. We then decided what database models and routes would be needed. We started working on the backend api of the site by each making models and controllers for every route. Once the api routes had been made, this was tested by making api requests with Insomnia.

With the backend up and running, we moved onto working on the frontend with React.js. Basic components were made for each page and a router was set up in the app.js file. We each took pages and worked on these individually creating the layout and functionality for each page.

Once our core frontend functionality was working, pages were taken individually for styling. We broke our style.scss file into individual sub files for improved navigation and to minimise conflicts.

Work was carried out on branches of the code depository for each feature. This was merged with the Development branch of the code and any merge conflicts were fixed as a group. Features were tested on the Development branch before being merged with the Master branch.

Tasks were managed and assigned through the task manager Trello and we had daily stand-ups to keep track of progress.

![wdi project 03 trello](https://user-images.githubusercontent.com/40343797/48483663-fb1bfd80-e80b-11e8-9309-5ebd2b9f28a2.png)

### Design

The layout of the site was created based on  Mobile-First-Design principles. Initial mock-up wire frames were made during the planning phase to show the basic functionality of each page and general layout. These were then worked on in more detail during the styling aspect of the build. Bulma CSS framework was used to create the structure of the layout and its responsiveness. Further styling was added with SCSS.

### Individual inputs
### Wins
### Challenges
### Future Features

We were hoping to create an app which would encourage uses to create and maintain the database of paintings. We had initially planned to add a trophies or points system to motivate users to upload new paintings. Users would gain trophies by uploading new paintings. We would also have liked to let users add follow friends so they can compete with other users and see when their friends upload new paintings or complete a journey.

If we had more time, we would like to allow users to follow Artists, so they are notified when new paintings are on display, particularly if they are located near where the user is based.

Tests were written with Chai to test the Artists routes and the Login / Register routes. We would like to have written more tests to cover all the routes if there was more time.

There are currently no admin users and Journeys must be set within a seeds file.
