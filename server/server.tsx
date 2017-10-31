import * as Express from 'express';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';

// Webpack Requirements
import * as webpack from 'webpack';
import * as config from '../webpack.config.dev';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = Express();

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Set native promises as mongoose promise
require('mongoose').Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../client/')));
app.use('/api', posts);

// Render Initial HTML
const renderFullPage = (html: string, initialState: any) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

// const renderError = err => {
//   const softTab = '&#32;&#32;&#32;&#32;';
//   const errTrace = process.env.NODE_ENV !== 'production' ?
//     `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
//   return renderFullPage(`Server Error${errTrace}`, {});
// };

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  const store = configureStore();
  const branch = matchRoutes(routes, req.url);

  return fetchComponentData(
    store,
    branch.map(elem => elem.route.component),
    branch.map(elem => elem.match.params),
  ).then(() => {
    let context = {};
    const initialView = renderToString(
      <Provider store={store}>
        <IntlWrapper>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </IntlWrapper>
      </Provider>
    );

    const finalState = store.getState();

    res
      .set('Content-Type', 'text/html')
      .status(200)
      .end(renderFullPage(initialView, finalState));
  })
  .catch((error: Error) => next(error));

  // matchRoutes(routes, req.url, (err, redirectLocation, renderProps) => {
  //   if (err) {
  //     return res.status(500).end(renderError(err));
  //   }
  //
  //   if (redirectLocation) {
  //     return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   }
  //
  //   if (!renderProps) {
  //     return next();
  //   }
  //
  //
  //   return fetchComponentData(store, renderProps.components, renderProps.params)
  //     .then(() => {
  //       const initialView = renderToString(
  //         <Provider store={store}>
  //           <IntlWrapper>
  //             <RouterContext {...renderProps} />
  //           </IntlWrapper>
  //         </Provider>
  //       );
  //       const finalState = store.getState();
  //
  //       res
  //         .set('Content-Type', 'text/html')
  //         .status(200)
  //         .end(renderFullPage(initialView, finalState));
  //     })
  //     .catch((error) => next(error));
  // });
});

// start app
app.listen(serverConfig.port, (error: Error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;