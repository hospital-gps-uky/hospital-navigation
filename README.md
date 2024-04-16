## 🚀 Quick start

1.  **Initialize dependencies**

    ```shell
    yarn install
    ```

2.  **Start front-end**

    Navigate into src and run yarn start.

    ```shell
    cd src
    yarn start
    ```

    The front-end should be running on "http://localhost:8000/" by default.

    The front-end also comes with a very useful query tool hosted at "http://localhost:8000/___graphql".

4.  **Access back-end**

    Navigate into studio and sanity start.

    ```shell
    cd studio
    sanity start
    OR
    yarn sanity start
    ```

    The back-end is deployed to "http://localhost:3333/" by default.

    You can also access it via https://hospitalnav.sanity.studio/ for the deployed version.

    To have the front-end access the changes made to the database run:
    
    ```shell
    sanity graphql deploy
    ```

# Design structure

## Frontend
The frontend is developed using React and Gatsby.
Gatsby is a framework used to build websites and easily integrates with GraphQL. Gatsby builds website staticly so everything is loaded at build time.
Because of this, there are no runtime calls to the database.
GraphQL is used for querying the database. Utilize "http://localhost:8000/___graphql" while running the webpage locally to easily write queries.

## Backend
The backend is built using Sanity. Sanity is a cloud hosted content management system. (Contact previous group for access.)

**Sanity structure**
* Location: All locations in hospital including entrances, hallways, intersections, and clinics.
    * Name
    * Description: Optional
    * Type: Start, End, Intersection, Elevator, Stairwell (Elevator and Stairwell currently unused)
    * X: The x coordinate of the location on the 2D map.
    * Y: The y coordinate of the location on the 2D map.
    * 3D Image: Image displayed in 360 viewer.
    * 2D Image: Image displayed on location cards. Only necessary for start and end cards.
* Map: 2D Maps of the hospital displayed in the minimap.
* Edge: Connects each location, necessary for creating a path between entrances and clinics.

Notes on images:
* All images except for end locations should be oriented up / north with respect to the 2D map. The program works by calculating the angle between the current location and the next location using x/y coordinates, and then rotating the image the correct direction. The images must be as straight as possible for the paths to look good.
* On hitting return to start, the path will skip the initial image resulting in a smoother user experience. (You would hit the button and be in virtually the same space which was sometimes confusing.)

## Hosting
The website is hosted using Netlify. (Contact previous group for access.)
Netlify uses webhooks to automatically rebuild the webpage whenever changes are made to Github or Sanity. Access these webhooks in the settings of Netlify and Sanity.

    
