# federation-extract-plugin

A webpack plugin for extract related files according to your ModuleFederationPlugin

## Getting Started

To begin, you'll need to install `@magic-gear/federation-extract-plugin`:

```console
$ npm install @magic-gear/federation-extract-plugin --save-dev
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
const FederationExtractPlugin = require('@magic-gear/federation-extract-plugin')

module.exports = {
  plugins: [new FederationExtractPlugin()],
}
```
