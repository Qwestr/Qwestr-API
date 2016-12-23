# Qwestr-API

Qwestr API Server, bootstrapped with a [Yeoman generator for an ES2015 enabled GraphQL Server](https://github.com/stylesuxx/generator-es6-graphql).

## Usage

### Start the Development Server
```Bash
npm start
```

When starting the server there are a couple of parameters you can pass:
* verbose - Enable verbose output
* release - Enable release mode, which will generally disable debugging features

Hot reloading is in place, so you do not need to restart the server on file change.

#### Environment Variables
The following environment variables are supported:
* PORT - defaults to 1234 if not set

### Deployment
If you want to deploy your application, simply copy the build folder and invoke
```Bash
node server.js
```
## License

Copyright © 2016-2017 Qwestr LLC. This source code is licensed under the MIT
license found in the [LICENSE.txt](https://github.com/Qwestr-API/Qwestr/blob/master/LICENSE.txt)
file. The documentation to the project is licensed under the
[CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/) license.

---
Made with ♥ by Shawn Daichendt ([@shawndaichendt](https://twitter.com/shawndaichendt)) and [contributors](https://github.com/Qwestr/Qwestr-API/graphs/contributors)
