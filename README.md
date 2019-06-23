## For run

npm install

npm start

## for build

npm run build

## project short description

For this task, i chose react + redux + material UI framework.

I chose this technology stack, beacause React and Redux help build SPA logic which can be maintained in the future
and Material UI framework contains ready to use UI elements that look good out of the box.

I found some bugs on the backend:

1. When i send request for get assets with id 64, in response i get assets with id 66. I decided not to show an image from the assets in this case, because user may get the wrong product image.
2. In the assets, url of an image has the 'uri' key, which seems to be wrong.
