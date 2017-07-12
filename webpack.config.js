const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');
const { optimize: { CommonsChunkPlugin }, ProvidePlugin } = require('webpack')

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || []
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig)

// primary config:
const title = 'Music Search';
const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: { plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })]}
  }
]

module.exports = ({production, server, extractCss, coverage} = {}) => ({
  resolve: {
    extensions: ['.js'],
    modules: [srcDir, 'node_modules'],
  },
  entry: {
    app: ['aurelia-bootstrapper'],
//    vendor: ['bluebird', 'jquery'],
  },
  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
    sourceMapFilename: production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
    chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js',
  },
  devServer: {
    contentBase: outDir,
    // serve index.html for all 404 (required for push-state)
    historyApiFallback: true,
  },
  module: {
    rules: [
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: extractCss ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssRules,
        }) : ['style-loader', ...cssRules],
      },
      {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules,
      },
      { test: /\.html$/i, loader: 'html-loader' },
      //{ test: /\.js$/i, loader: 'babel-loader', exclude: nodeModulesDir,
      //  options: coverage ? { sourceMap: 'inline', plugins: [ 'istanbul', 'transform-decorators-legacy' ] } : {},
      //},
      { test: /\.js$/i, exclude: nodeModulesDir, use: { loader: 'babel-loader', options: { plugins: ['istanbul'], sourceMap: 'inline' } } },
      { test: /\.json$/i, loader: 'json-loader' },
      // use Bluebird as the global Promise implementation:
      { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' },
      // exposes jQuery globally as $ and as jQuery:
      { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
      // embed small images and fonts as Data Urls and larger ones as files:
      { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      // load these fonts normally, as files:
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
    ]
  },
  plugins: [
    new AureliaPlugin(),
    new ModuleDependenciesPlugin({
      "aurelia-materialize-bridge": [
				'./autocomplete/autocomplete',
				'./badge/badge',
				'./box/box',
				'./breadcrumbs/breadcrumbs',
				'./breadcrumbs/instructionFilter',
				'./button/button',
				'./card/card',
				'./carousel/carousel-item',
				'./carousel/carousel',
				'./char-counter/char-counter',
				'./checkbox/checkbox',
				'./chip/chip',
				'./chip/chips',
				'./collapsible/collapsible',
				'./collection/collection-header',
				'./collection/collection-item',
				'./collection/collection',
				'./collection/md-collection-selector',
				'./colors/colorValueConverters',
				'./colors/md-colors',
				'./common/attributeManager',
				'./common/attributes',
				'./common/constants',
				'./common/events',
				'./datepicker/datepicker-default-parser',
				'./datepicker/datepicker',
				'./dropdown/dropdown-element',
				'./dropdown/dropdown',
				'./dropdown/dropdown-fix',
				'./fab/fab',
				'./file/file',
				'./footer/footer',
				'./input/input-prefix',
				'./input/input-update-service',
				'./input/input',
				'./modal/modal',
				'./modal/modal-trigger',
				'./navbar/navbar',
				'./pagination/pagination',
				'./parallax/parallax',
				'./progress/progress',
				'./pushpin/pushpin',
				'./radio/radio',
				'./range/range',
				'./scrollfire/scrollfire-patch',
				'./scrollfire/scrollfire-target',
				'./scrollfire/scrollfire',
				'./scrollspy/scrollspy',
				'./select/select',
				'./sidenav/sidenav-collapse',
				'./sidenav/sidenav',
				'./slider/slider',
				'./switch/switch',
				'./tabs/tabs',
				'./toast/toastService',
				'./tooltip/tooltip',
				'./transitions/fadein-image',
				'./transitions/staggered-list',
				'./validation/validationRenderer',
				'./waves/waves',
				'./well/md-well.html'
      ],
    }),
    new ProvidePlugin({
      'Promise': 'bluebird',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      minify: production ? {
        removeComments: true,
        collapseWhitespace: true
      } : undefined,
      metadata: {
        // available in index.ejs //
        title, server, baseUrl
      },
    }),
    new CopyWebpackPlugin([
      { from: 'static/favicon.ico', to: 'favicon.ico' }
    ]),
    ...when(extractCss, new ExtractTextPlugin({
      filename: production ? '[contenthash].css' : '[id].css',
      allChunks: true,
    })),
    ...when(production, new CommonsChunkPlugin({
      name: 'common'
    }))
  ],
})
