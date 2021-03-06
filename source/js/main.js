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
    
    getVideo: 'modules/getVideo',
    trackFace: 'modules/trackFace',
    ball: 'modules/ball',
    score: 'modules/score',

    // Helper Modules
    helpers: 'apps/helpers',
    headtrackr: 'apps/helpers/headtrackr'

    // 3rd party
  },

  // Sets the configuration for your third party scripts that are not
  // AMD compatible
  shim: {
    lodash: {
      exports: '_'
    },

    headtrackr: {
      includes: ['jquery'],
      exports: 'headtrackr'
    },

    trackFace: {
      includes: ['headtrackr'],
      exports: 'trackFace'
    },

    getVideo: {
      includes: ['jquery'],
      exports: 'getVideo'
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
  'ball',
  'score',
], function($, _, App) {
  'use strict';

  // Start the application
  App.start();
});
