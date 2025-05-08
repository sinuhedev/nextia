# vitejs

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
WEB_TITLE=ENV-vite
WEB_API=https://65fd14fb9fc4425c653119c5.mockapi.io/api/v1
```