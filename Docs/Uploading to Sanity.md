# Uploading to Sanity

## Creating a Location
In Sanity, the location objects are the nodes in the graph; they represent the hospital clinics, entrances, and every intermediary step throughout the hospital.

The location object contains the following fields:
### Location Name
The location name field is where the name of the location goes. The name inputted here be what the name of the Location is displayed as in Sanity as well as in the Hospital GPS application. 
#### Description
The description field is where you can add a description of the location object or any notes pertaining to the location in the hospital. This information is not shown int he Hospital GPS application.
#### Type
The Type dropdown box contains all the classifiers a location can be in the graph.
 - Start - For all hospital entrances and help desks
 - End - All clinics and other points of interest in the hospital
 - Elevator - All elevators in the hospital
 - Stairwell - All stairwells in the hospital
 - Intersection - All intermediary steps throughout the hospital. If the location does not fit one of the four above mentioned Types, then it should be considered an intersection.
 
 All locations should be classified as one of five options.
#### Floor Number
The floor number field is where you insert the floor of the hospital the location is on. This goes for all Types of location objects.
#### X and Y Coordinates
These two fields are where the X and Y coordinates are inputted for the location. 
##### Finding the XY Coordinates of a Location
The coordinates of all images were calculated by using the pixel coordinates of the hospital maps we were given. By using an image editing/viewing software such as Adobe Photoshop (which can be downloaded for free by searching "uky software downloads") or Gimp, we uploaded the images of the maps and took the pixel coordinates of the pixel closest to where we shot the picture for the specified location.
All coordinates inputted into the coordinate fields are integers. While Sanity allows for decimal numbers, for consistency, we recommend using integers.
#### 3D and 2D Images
There are two field where you can upload the 3D and 2D image of a location. Images for a location can uploaded from your device or selected from the current images already uploaded to Sanity. 

#### Notes
 - When editing any of the field in the location object, be sure to publish your changes, or they will not be saved. Publishing your changes is as simply as clicking the "Publish" button in the bottom right of the location object.
 - When uploading images to a location, it is best not to click off the location object or navigate elsewhere in Sanity; this complicates the uploading process and sometimes causes the images to not get uploaded, in which case you must cancel the upload and retry. Advice is to wait for the images to upload, and once you visibly see them in the location object, you can publish the changes.
 - If you want to delete a location, you must first make sure that all edges that require that location are deleted. Unpublishing the edges does not work; you must delete all edges, or Sanity will give you an error, saying there are still objects that reference the location object, and because of that, the location cannot be deleted.

## Creating Edges
In Sanity, edges are what connect to location objects together, allowing for the graph searching algorithm to find the shortest route. All locations should have at least one edge to connect them to the next reachable location.

The edge object contains the following fields:
#### Edge Name
The edge name field is where the name of the edge goes. This name does not appear anywhere on the Hospital GPS application and is purely for organization within Sanity.
#### Location 1 and Location 2
There are two dropdown fields where you can select two location objects to connect with an edge. It is important to note that the order of the locations does not matter. All edges created are bidirectional, so you will not need to create two edges for Location 1 -> Location 2 and Location 2 -> Location 1.

Once the fields are filled out, be sure to publish them by clicking the "Publish" button in the bottom right of the edge object.
