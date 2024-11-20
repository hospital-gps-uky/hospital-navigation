# Bugs to Fix & Features to Add

## Coordinate System

The current coordinate system is based off of the pixels in 2D maps of
the Kentucky Clinic provided by UK.

Currently, the Hospital GPS uses these coordinates to draw the path on
the minimap, orient the starting orientation of the 360 image viewer,
the direction that the arrow points to, and as a weight system for
Dijkstras algorithm by measuring the distance between two locations.

The main issues is that the maps are not consistent between floors. The
difference is most noticeable between floors 1-3 and the 4th and 5th
floors. While the first 3 floors have the "full" layout, the 4th and 5th
floors only include Wing D, and the parking garage. However, there are
differences between the first 3 floors as well. Such as the size and
aspect ratio of the parking garage, the length of hallways and the
overall size of the wing. While there are some differences in the
architecture on each floor, they are no where near as significant as
they are on the map (or even the right changes). The maps also have
several errors as well, such as hallways that simply don't exist,
hallways that should be connected and are not, missing doorways &
pathways.

This means that, despite the images being the same resolution (meaning
they have the same coordinate space), an X\&Y coordinate on one floor
will not map to the same location on the next. This is most noticeable
with elevators (at least on floors 1-3).

This inconsistent system means that of the features that rely on the
coordinates, while they work on a single floor, traversing in-between
floors causes issues.

For example, when taking a path that requires an elevator, when reaching
the elevator and looking at the minimap, you will see that often the
path drawn on the minimap will go to a random spot, often outside of the
map. The path line also continues on in often weird directions, through
walls, etc, as the path covers all floors and is shown in its entirety
on every floor.

Another issue is with pathfinding. The GPS uses Dijkstra's algorithm to
find the shortest path between two nodes. The algorithm also takes into
account the "weight" of each edge, in our case the distance between two
nodes on the map. The problem is that the algorithm does not know what
floor a node is on. Along with the inconsistent coordinate system,
suboptimal paths can be generated. This most often occurs when traveling
to locations on the 4th or 5th floor, as their Wing D section is in the
middle of the map, while the rest of the floors have that wing on the
bottom left of the map.

## Minimap Path

On the minimap there is a blue line that draws out the path that you are
supposed to take. The problem is that the path line is for the entirety
of the route, and not just for the floor you are on. So this means that
the line, once it reaches an elevator, will go off into a different
direction due to the inconsistencies with the coordinates and maps of
each floor. The path being drawn for the entire route across floors also
makes it less clear where you are going and could confuse users.

The path would need to stop being drawn once it reaches and elevator,
and once you are on the next floor, draw the rest of the path for that
floor.

## Elevator & End Location Orientation

All of the 360 image are edited to face "map north" so that the website
can programmatically rotate each image towards the next one based on
some basic trigonometry to find the angle. However there are some issues
that occurs with the selected end location and elevators.

For elevators, the website currently rotates the image toward the next
location in the route. The issue is obviously that the next location is
not on the floor that the elevator is on, and is on a different one.
This means that instead of looking at the elevator directly, the image
is rotated in a random direction.

If we were to create a separate end location and intersection, for each
clinic, we would end up doubling the amount of nodes needed to update if
a clinic or set of clinics gets updated. To prevent this, we would
connect multiple edges to each end location (if applicable) to let them
also be used as intersections. This means that each end location image
had to also be rotated towards map north, breaking the feature of the
website not rotating the last image.

For the selected end locations, there was a working solution. Instead of
having the image rotated towards map north, the image would be facing
the actual end location, and the software would not rotate it. This
works if the end locations only have one edge connected to them.
However, due to the layout of the Kentucky Clinic, several of the
clinics are on the sides of hallways, which means that they get passed
by during navigation.

To fix both of these issues, our proposed solution is to add a manual
rotation offset to the location type, and then fill this out with the
number of degrees needed to set the image facing at the desired
location. This number would be filled out on the elevator and end
location nodes, and in the software, would override and default image
rotation with this offset.

To get the angle offset, you can open the image in a software like GIMP
and use offset tool. (In GIMP this is found under Layer \> Transform \>
Offset). This tool will allow you to move the image left or right by a
set amount of pixels and have the image wrap around to the other side.
After offsetting the image by the desired pixel amount, you then can
take this offset, and then multiply it by a constant value, in this case
is the fraction with 360 (for the number of degrees) as the numerator,
and the number of pixels wide the image is (for the Nikon KeyMission
360, 7744). Then multiplying this number with our pixel offset we get
the number of degrees.

Important note, if you want to rotate the home point of the image
clockwise, your pixel offset will be negative. This means that you will
get a negative angle offset which is incorrect for clockwise rotation.

## Saving State

After selecting an end location, you get placed in the "Map Page" where
you have the 360 image viewer and route navigation. The issue is if that
the page is refreshed, the website completely forgets the start and end
location, and shows a blank viewer and no route. The buttons that are
left on the page then give odd behavior due to their being no saved
state.

To prevent this from happening, the "MapPage" page needs to store state,
(and properly clear it). React has a built in system for this that you
can import with the following statement. (See: [Managing
State](https://react.dev/learn/managing-state) from the React Dev
website).

``` javascript
import { useState } from 'react';
```

After importing this, you can save the state of certain variables
in-between page refreshes, preventing the website from forgetting the
route.

## End Location Selection

As of right now, the end location selection page, while it does work, is
overwhelming to someone not familiar with the clinic or website. Since
there are so many clinics (and other end locations), there needs to be a
way to make it easier for the user to find the clinic they are trying to
go to.

One possible solution would be to add a search function to the list.
However, the search function would need to be quite "fuzzy". That is to
say that a input string would have to bring up all end location names
that include all or some of the substring and not just perform an exact
match of the string. The search may also need to be "smart" and be able
to match locations that do not include the substring, but are
"logically" related; however this may be impractical as implementing
this could add significant complexity to the search function that may
make it hard to implement.
