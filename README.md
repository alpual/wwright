# Based on angular-seed — the seed for AngularJS apps

contact: Paul Wright
email: alpual@gmail.com


WWright
-------

A portfolio website with a hexagonal grid system using an Angular grid-hex directive (directive.js) styled in hex.scss.  

Following a Model View Controller (MVC) architecture, the controller (currently view1.js) creates a hexagon grid from the model: data in app/json/hexGrid.json.  The controller fills the view (view1.html) with grid-hexes.  

hex.scss manipulates the hexagonal grid using a contstant for the container-width, which the user needs to define.  This allows the grid to fill various sized containers as required.  Large, medium and small hexes are defined as well.
