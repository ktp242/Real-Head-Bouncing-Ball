/**
 * main and config
 *
 * Require configuration and definition of main
 */
require.config({

  // Increase the wait time before giving up on a script
  waitSeconds: 15,

  baseUrl: 'js',

  paths: {
    // Core Libraries
    jquery: 'libs/jquery/jquery',
    lodash: 'libs/lodash/lodash',
    headtrackr: 'libs/headtrackr/headtrackr',
    getVideo: 'modules/getVideo',
    trackFace: 'modules/trackFace',

    // Helper Modules
    helpers: 'apps/helpers'

    // 3rd party
  },

  // Sets the configuration for your third party scripts that are not
  // AMD compatible
  shim: {
    lodash: {
      exports: '_'
    }
  }
}); // end require.config

/**
 * main
 */
require([
  'jquery',
  'lodash',
  'apps/master/app',
  'headtrackr',
  'getVideo',
  'trackFace',
], function($, _, App) {
  'use strict';

  // Start the application
  App.start();
});
