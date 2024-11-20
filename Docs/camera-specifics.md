# Camera Specifics

The camera used to take the 360 images was a Nikon KeyMission 360,
borrowed from [Professor Hank (Henry)
Dietz](http://aggregate.org/hankd/) of the Electrical and Computer
Engineering Department. His office (as of 2024-10-30) is in Room 203 of
the Davis Marksbury Building. His online website is at
<http://aggregate.org>. (Note http, not https).

The camera outputs images in a resolution of 7744 by 3872. The camera
does the image stitching itself, which means that there is no editing
required to have a 360 image viewer to read the image.

The home of the 360 image is the point in the 360 image where the 360
image viewer will start viewing the image by default. On the Nikon
KeyMission 360, this is in the center of the "2D", unwrapped image. This
home point is captured on the lens on the side of the camera with the
standard Nikon logo, and not the Nikkor logo.

While the camera is supposed to be compatible with the Nikon SnapBridge
360/170, the app is currently unmaintained, and does not work anymore.
To modify any parameters of the camera, you must use the KeyMission
360/170 Utility for Windows/MacOS. The software can be found at either
of the following links:

  - <https://downloadcenter.nikonimglib.com/en/products/337/KeyMission_360.html>
  - <https://downloadcenter.nikonimglib.com/en/download/sw/109.html>

While the camera is supposed to have a local Wi-Fi network that is
creates, we were unable to get it working. To take images without the
user in frame, you must use the self-timer features to ensure that you
can get out of the image. There are two timer options, 2 seconds and 10
seconds. This option is configurable in the KeyMission 360/170 Utility.

The camera has a standard micro-USB port in battery/SD card compartment
which is used for charging and connecting to a separate device for
configuration with the KeyMission 360/170 Utility.

The camera features an auto shutoff feature. So after a set amount of
time, which is configurable in the previously mentioned KeyMission
Utility program, the camera will turn off. This is important as there is
no dedicated power button, and the camera simply powers on when you
press the shutter button to take an image (or video). This is most
significant when taking images with the 2 second timer, often used when
dealing with high traffic areas with only small windows to take photos.
If the camera is powered off when the shutter button is pressed, it
first turns on the camera, and then starts counting down. This gives a
timer closer to 3 seconds as opposed to 2. Which is sometimes enough to
make the difference whether everyone can get out of frame in time.

The images are stored on a microSD card placed inside of the camera. The
KeyMission 360 supports microSD, microSDHC, and microSDXC cards. The
manual does not specify the maximum size of an SD card that the camera
supports, most standard sizes should work. When taking images, we used a
32GB card without any issues.

The camera has a standard 1/4-20 UNC tripod screw mount which should be
compatible with most consumer tripods.

For any more specific questions about the operation and features of the
camera, the manual for the camera is avaiable online at the following
link:

  - <https://download.nikonimglib.com/archive3/B6L6O00ZfbmV03weuS30500pel41/KM360RM_(En)05.pdf>

# Camera Alignment

## Recommended Setup

360 images that are taken with dual lens 360 cameras will have stitch
errors where the two images taken by the two lenses overlap and are
'stitched' together. It is important to make sure when taking images
that there is nothing important being obscured by the stitch errors,
such as clinic names and other signs.

For the Nikon KeyMission 360, the stitch errors will be oriented on the
short edges with the image capture button or the battery/SD card door.

When taking images, orient the camera in a way that "hides" stitch
errors. For example, when taking images down long hallways, face the
lenses towards the walls, and the edges of the camera (where the stitch
errors will be), should be facing down the hallway. This places the
stitching down the hall where it is less noticeable, and not on the
close walls where the stitch errors are quite obvious.

There are cases, however, where this convention should be broken. For
example, if there is a clinic (or any other end location) at the end of
a hallway which has a sign, the stitch errors should be on the walls of
the hallway, and not down the hallway, as this could place the errors on
the clinic itself, possibly obstructing a sign.

Also when taking images, it is important to record the "angle offset" of
the image. The angle offset is the number of degrees off from "map
north" that the "home point" of the camera is rotated.

The home point of the 360 image is the point in the image where the 360
image viewer will start displaying the image by default. On the Nikon
KeyMission 360, this is in the center of the "2D", unwrapped image. This
home point is captured on the lens on the side of the camera with the
standard Nikon logo, and not the Nikkor logo.

We record the angle offset from "map north" so we can edit the image so
that the home points of all of the images face "map north". This is
necessary as the Hospital GPS software requires that all of the images
face "map north" so that it can rotate each image to the next point in
the path programmatically.

To record the angle offset, we recommend taking the compass app on a
smartphone (or any tool that can measure degrees of rotation) and
placing it on top of the camera, starting at the home point. Then rotate
clockwise towards the "map north", which is the "north" of the 2D floor
maps of the Kentucky clinic. The map north is roughly 120 degrees, but
this is not exact. Once the angle offset is acquired, record it and
which image it belongs to.

For recording images and their data, we would recommend:

1.  Record each image number
      - Include all images taken, whether they are used or not (makes
        sorting through images from the SD easier)
2.  A rough location name (can be changed later for clarity)
3.  The angle offset

Once images are taken and the data is recorded, place all the data in
Excel (or some other program) and rename the image files to make
tracking each image easier.

## Historical Setup

For the images taken by our group (Jake Chanda, Sean Evans, Costner
Magill, Colum O'Connor, Justin Tussey), we used the following setup. We
recommend not using the following setup and recording methods, as we
realized after taking the images that it added unnecessary complexity to
sorting and editing the images.

The Hospital GPS software requires that all of the images have to have a
home point facing "map north", or the direction of the 2D maps of the
clinic used. The "north" of these maps is around 120 degrees, but this
is not exact.

To make the process of editing images easier we would record the angle
offset of the front of the camera to "map north". We would do this by
starting at the front of the camera (more on the front of the camera
later) and rotating clockwise to "map north" and recording how many
degrees it takes to rotate. This can either be done with the compass app
on your phone, or by incrementing by 90 degrees as many of the hallways
are perpendicular to each other and "map north".

Our main issue was with dealing with what was front of the camera. When
we first started taking pictures, I (Justin) did not bother to find out
what was the default front for the camera and instead came up with two
camera "fronts" for different situations. There was "stitch front" or
"edge front", where the edge of the camera, specifically the edge with
the battery door, (opposite edge with the shutter button). This was
mainly used for edge locations down hallways where the stitch errors
would be going down the hallway and not on the walls. There was also
"lens front" where one of the lenses, specifically the one with the
Nikkor logo, was the "front".

The main issue comes when you have to edit and reorient each image. Not
only do you have the angle offset for each image, you have an additional
offset based on the "front" of the camera used. While figuring out the
offset is not hard if you have recorded all the data for each image into
an Excel sheet, it does add unneeded complexity.

# Image Validation

Each image needs to be validated before it gets uploaded to the website.
Here is a list of things to check for each image:

  - No people visible in image (HIPAA Violation)
  - Lighting is at an appropriate level
      - Sometimes the auto exposure on the camera will be messed up if a
        bright light is overhead
      - Sometimes hallways will be dark since the lights "refresh" and
        the camera catches when the lights are "off" or not a full
        brightness
      - Depending on the time of day, some lights will be turned off
        making places darker than normal
  - Important singage is visible and readable
      - Stitch errors can blur signs
      - Distance or autoexpose can make signs unreadable
  - Image is relatively level
  - Hallways need to be clean and free of trash, etc.
  - Doors that are closed normally should be left closed
  - Image should be in the center of the hallway
  - Camera should be perpendicular to the walls/hallway. AKA, images
    should be looking straight down hallways
