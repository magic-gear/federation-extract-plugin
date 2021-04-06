const PLUGIN_NAME = 'FederationExtractPlugin'

class FederationExtractPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: PLUGIN_NAME,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (_, callback) => {
          const federationPlugins = compilation.options.plugins.filter(
            (plugin) => plugin instanceof compiler.webpack.container.ModuleFederationPlugin,
          )
          if (federationPlugins.length) {
            federationPlugins.forEach((plugin) => {
              const { name } = plugin._options
              const files = []
              compilation.chunks.forEach((chunk) => {
                if (
                  chunk.runtime === name ||
                  (typeof chunk.runtime?.has === 'function' && chunk.runtime.has(name))
                ) {
                  files.push(...chunk.files)
                }
              })

              files.forEach((filename) => {
                compilation.emitAsset(`${name}/` + filename, compilation.assets[filename])
              })
            })
          }
          callback()
        },
      )
    })
  }
}

export default FederationExtractPlugin
