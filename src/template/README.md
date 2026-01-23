# TEMPLATE

## To start

Open http://localhost:3000 to view it in the browser.

```sh
npm install
node --run start
#
node --run test
node --run build <ENV>
node --run preview
```

## env

```.env
.env          # loaded in all cases
.env.[ENV]    # only loaded in specified ENV [ dev, test, prod ]
```

 * .env.dev
 * .env.prod
 * .env.test
 
```env
VITE_TITLE=TITLE
VITE_VIEW_TRANSITION=false
```