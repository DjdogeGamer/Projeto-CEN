# Cyberecurity Arcade Games - Phaser 3

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements | Requisitos

* [Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.
* [Web Pack](https://webpack.js.org/) is required to build the project.
* [Phaser 3](https://phaser.io/phaser3) was used to develop the game.
* [ES6](https://www.w3schools.com/js/js_es6.asp) is required to write the code.
* [AWS](https://aws.amazon.com/pt/) was used to deploy the project. (S3)
* [GCP](https://cloud.google.com/) was used to deploy the project. (App Engine)

## Available Commands | Inicialização do Projeto

| Command         | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| `npm install`   | Install project dependencies                                                    |
| `npm start`     | Build project and open web server running project                               |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server
by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will
automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project
to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with
total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you
can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files
and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js`
along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something
like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.

### Deploying to App Engine (GCP)

To deploy the project to App Engine, you need to have the [Google Cloud SDK](https://cloud.google.com/sdk/) installed
and configured on your machine.

## Updating the project on App Engine

1. Login in your account:

```bash
gcloud auth login
```

2. Set the project:

```bash
gcloud config set project cen-jogo-phaser
```

3. Deploy the project:

```bash
gcloud app deploy
```

4. Open the project:

```bash
gcloud app browse 
```

or
https://cen-jogo-phaser.nw.r.appspot.com/

## Contributing

If you find any bugs or have a feature request, please open an issue with a description, steps to reproduce, and
expected result.

## License

[General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)