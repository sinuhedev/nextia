# nextjs

## To start

Open http://localhost:3000 to view it in the browser.

```sh
npm i
npm start
node --run start
#
npm test
npm run build
npm run serve
```

## env

```.env
.env              # loaded in all cases
.env.[ENV]    # only loaded in specified ENV [ development, test, production ]
```

 * .env.development
 * .env.production
 * .env.test
 
```env
NEXT_PUBLIC_LOGGER=true
NEXT_PUBLIC_TITLE=<ENV>-nextjs
#
API=https://65fd14fb9fc4425c653119c5.mockapi.io/api/v1
```

