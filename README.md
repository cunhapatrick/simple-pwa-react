# Minimal Configuration to construct a PWA in React for android / IOS on firebase

## Initial Configuration

    First of all create your web-application -> (On terminal) create-react-app project-name

    goto public/manifest.json and change the short-name and name, the short-name will be the actual name of the application, and the short name the description

    don't forget to add those meta below on public/index.html inside the header
    <meta name="author" content="author-name">
    <meta name="keywords" content="keywords">
    <meta name="description" content="description">

    goto src/index.js and change serviceWorker.unregister() to serviceWorker.register()

    remove the .css,.test and icon files from src and remove the public/favicon.ico too.
    PS: Don't forget to remove every link/import of those files inside src/index.js and src/App.js

## Initial firebase Configuration

    goto firebase console on the browser, create a account and then a new project
    install firebase-tools globally with npm -> npm i -g firebase-tools

    run the command -> `firebase login` and make the login using a firebase account then run -> `firebase init`
    the cli will give you some options as follow
    Hosting: Configure and deploy firebase hosting sites
    ? Select a default firebase project for this directory : (Firebase project)
    ? What do you want to use as your public directory ? build
    ? Configure as a single-page app (rewrite all url to /index.html)? N

    goto firebase.json and write this code inside "hosting"
    "headers": [{
      "source": "/service-worker.js",
      "headers": [{
        "key": "Cache-Control",
        "value": "no-cache"
      }]
    }]

## Deploying pwa application to firebase

run the command `npm run build && firebase deploy`
