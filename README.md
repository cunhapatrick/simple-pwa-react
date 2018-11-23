# Minimal Configuration to construct a PWA in React for mobile on firebase

## Initial Configuration

1. Create your web-application `create-react-app` "project-name"
2. Goto public/manifest.json and change the short-name and name, the short-name will be the actual name of the application, and the short name the description
3. Add those meta tags below on public/index.html inside the header tag


```
  <meta name="author" content="author-name">
  <meta name="keywords" content="keywords">
  <meta name="description" content="description">
```


4. Goto src/index.js and change serviceWorker.unregister() to serviceWorker.register()
5. Remove the .css,.test and icon files from src and remove the public/favicon.ico too.


PS: Don't forget to remove every link/import of those files inside src/index.js and src/App.js

## Initial firebase Configuration

1. Goto firebase console on the browser, create a account and then a new project
2. Install firebase-tools globally with `npm i -g firebase-tools`
3. Run the command `firebase login` and make the login using a firebase account then run `firebase init`
4. The firebase cli will give you some options as follow


```
Hosting: Configure and deploy firebase hosting sites
? Select a default firebase project for this directory : (Firebase project)
? What do you want to use as your public directory ? build
? Configure as a single-page app (rewrite all url to /index.html)? N
```


5. Goto firebase.json clear all code and write this one down


```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [{
      "source": "/service-worker.js",
      "headers": [{
        "key": "Cache-Control",
        "value": "no-cache"
      }]
    }]
  }
}
```

## Deploying pwa application to firebase

run the command `npm run build && firebase deploy`
