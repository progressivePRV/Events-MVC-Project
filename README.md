# Events-MVC-Project

This is an Events description web App Named as "Events With us". A user can create, delete and update the Events. It will show all the events categorized into categories.

## Specification
In this assignment, I have develop a fully functional web app using the MVC pattern, according to the following specifications:
- All the pages are qualified with HTML5 specification. (used [w3c validator](https://validator.w3.org/) for validation)  
- Used JavaScript functions and literal objects to implement the business layer of the application (model).
- Used EJS template pages to present the view to the browser.
- Used modularized routes to forward the request to the appropriate controller function.
- Used modularized controller to control the flow of the application.

## Note:- below Event is also known as connection

## Programming Language used in this project
- JavaScript
- HTML5
- CSS

## Modules/Library/Tools/Technology used in this project
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://www.npmjs.com/package/express)
- [EJS](https://www.npmjs.com/package/ejs)
- [Luxon](https://www.npmjs.com/package/luxon)
- [Method-override](https://www.npmjs.com/package/method-override)
- [uuid](https://www.npmjs.com/package/uuid)
- [Morgan](https://www.npmjs.com/package/morgan)
- [VSCode](https://code.visualstudio.com/)

## Views in this Project.
### Partial Views (common compnent of views/pages)
- header 
- footer
### General Pages
- About 
- Home/index
- Contact
- Error page
### Connections related Pages
- Show all Connections
- Show specific Connection
- Create Specific Connection
- Edit/update Specific Connection

## Model
### Connection
- id
- title
- category/topic
- details/description
- date
- Start time
- End time
- Host name
- Image Url

## Interface for manipulating model
- Get all Connections
- Get specific Connection
- Update specific Connection
- Delete specific Connection
- Create new Connection

## Routes 
### routes passes request to controller
- Connection route (/Connections)
- Main route (for general navigation like /about)

## Controller
### For getting request, getting data and manipulating it, setting data into views and giving out as response
- Connection Controller
- Main Controller

## Images

### Home Page
![Home Page](https://github.com/progressivePRV/Events-MVC-Project/blob/main/images/home_page.png)
### All Events Page
![All Events Page](https://github.com/progressivePRV/Events-MVC-Project/blob/main/images/All_Events.png)
### Event Description Page
![Event Description Page](https://github.com/progressivePRV/Events-MVC-Project/blob/main/images/Events_desc.png)
### Start new Event page
![Start new Event page](https://github.com/progressivePRV/Events-MVC-Project/blob/main/images/create_new_event.png)
### Edit Event page
![Edit Event page](https://github.com/progressivePRV/Events-MVC-Project/blob/main/images/Edit_evet.png)
