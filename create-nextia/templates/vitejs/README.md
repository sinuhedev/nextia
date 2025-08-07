# TEMPLATE

## To start

Open http://localhost:3000 to view it in the browser.

```bash
npm i
npm start
node --run start
```

## Env

```.env
.env        # loaded in all cases
.env.[mode] # only loaded in specified mode [ development, test, production ]
```

 * .env.development
 * .env.production
 * .env.test
 
```env
VITE_LOGGER=true
VITE_TITLE=<ENV>-vite
```