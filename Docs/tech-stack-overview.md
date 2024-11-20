# Tech Stack Overview

## Netlify

[Netlify](https://www.netlify.com/) is a serverless web hosting provider
which we use to host the Hospital GPS. Netlify lets us host the website
without needing to manage our own webserver.

Netlify also provides the ability to link to a GitHub repository and
automatically rebuild the website when changes are pushed. We also can
trigger automatic rebuilding when we make changes to the database with
webhooks as well. (Webhooks can be found under Site configuration\>Build
& Deploy\>Build Hooks).

The downside of Netlify (and all other serverless hosting providers) is
the cost. While the website is currently under a free plan, there is a
limited amount of bandwidth and build time we are allowed each month.

In the future, it would be best to shift away from serverless hosting
and run on dedicated server. However, this does add some complications
due to how the website is architectured.

## Sanity

[Sanity](https://www.sanity.io/) is a CMS (content managment system),
which is a database which supports several document types, and can be
easily interfaced by a user. See: [Content Mangment
Systems](https://en.wikipedia.org/wiki/Content_management_system).

Sanity is a cloud-based CMS, meaning that the data is not localized on a
central machine, but is stored on Sanity's servers.

We use Sanity to store all of the 360 images, along with their metadata,
and the pathways that connect them all.

For each location on a path, we add a "Location" node, which stores a
360 image, a 2D image (only needed if a start or end location), location
type, X\&Y, and floor. See the "Uploading to Sanity" document.

Each location is then linked together to another location with an "Edge"
node. This then creates a graph that can be traversed with an algorithm
to find the optimal path. This graph can be view with the "[Content
Graph View](https://www.sanity.io/plugins/graph-view)" plugin for
Sanity. See the "content-graph-view" branch, which has it set up.

By using a webhook, we can trigger Netlify to rebuild the website when
changes have been made. This is important as we are using Gatsby on the
front-end to statically compile the website. The webhook can be found in
the API section of the "Manage project" settings menu.

## Gatsby & React

[React](https://react.dev/) is a JavaScript framework that allows for
the creation of component based UI's. These components are simple to add
functionality to since they are created with
[JSX](https://en.wikipedia.org/wiki/JSX_\(JavaScript\)), a JavaScript
extension that allows for the intermixing of JavaScript and HTML.

We also use [Gatsby](https://www.gatsbyjs.com/), a React framwork which
allows us to build the website and all of the images before hand. This
means that we do not have to make dynamic database calls at runtime.
This reduces the load times of the website, and lowers the load on the
Netlify & Sanity CMS (which have limited bandwidth).
