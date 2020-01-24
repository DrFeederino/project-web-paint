# STATUS

NO LONGER MAINTAINED
# Project Web Paint
This was done as a part of graduate paper. It was inspired by web technologies and [this magnificent react-design-editor by salgum1114](https://github.com/salgum1114/react-design-editor). Even though the front-end is based on work of RDE, it was heavily modified, simplified and tweaked to make the most sense of what to expect from graphical editor (RDE was made as a powerpoint alterntaive with workflows). Server side is a simple NodeJS app with basic CRUD operations on MongoDB to support login and registration.
# Changes made
- Added brush, fill, dark theme, new image and probably more;
- Fixed tons of bugs from RDE and improvements: context-menu hiding on right-clicking instantly, switched to i18n locales in most places (the only part is not utilizing i18n is Login and User), reworked side panels;
- Reduced the size of source code by half and dependecies.
- Updated used libraries to the latest possible.
# Dependecies
- ant.design
- React
- Fabric.js
- FontAwesome 5
- MongoDB
- Node.js
# Getting Started
Git clone the project or download as zip
Execute npm install && npm start from server dir first as the frontend relies on the working backend in order to work
Execute npm install && npm start from client dir. It should fire up the default used web-browsed with the correct serving URL.
Default URLs and Ports used:
Frontend: localhost:3000
Backend: localhost:9000
# Future of this repo
- Continue stripping away bloated components (ant.d and FA) to reduce size
- Updating and exposing more functionality of fabric, adding share to external platforms
- Fixing bugs, undefined behaviors...
- Simply make PWB a simple and fun to use image editor

# Project Web Paint
This was done as a part of graduate paper. It was inspired by web technologies and [this magnificent react-design-editor by salgum1114](https://github.com/salgum1114/react-design-editor). Even though the front-end is based on work of RDE, it was heavily modified, simplified and tweaked to make the most sense of what to expect from graphical editor (RDE was made as a powerpoint alterntaive with workflows). Server side is a simple NodeJS app with basic CRUD operations on MongoDB to support login and registration.
# Changes made
- Added brush, fill, dark theme, new image and probably more;
- Fixed tons of bugs from RDE and improvements: context-menu hiding on right-clicking instantly, switched to i18n locales in most places (the only part is not utilizing i18n is Login and User), reworked side panels;
- Reduced the size of source code by half and dependecies.
- Updated used libraries to the latest possible.
# Dependecies
- ant.design
- React
- Fabric.js
- FontAwesome 5
- MongoDB
- Node.js
# Getting Started
Git clone the project or download as zip
Execute npm install && npm start from server dir first as the frontend relies on the working backend in order to work
Execute npm install && npm start from client dir. It should fire up the default used web-browsed with the correct serving URL.
Default URLs and Ports used:
Frontend: localhost:3000
Backend: localhost:9000
# Future of this repo
- Continue stripping away bloated components (ant.d and FA) to reduce size
- Updating and exposing more functionality of fabric, adding share to external platforms
- Fixing bugs, undefined behaviors...
- Simply make PWB a simple and fun to use image editor
