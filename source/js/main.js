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
    
    // Customized Modules
    //resizeCanvas: 'modules/resizeCanvas',
    getVideo: 'modules/getVideo',
    trackFace: 'modules/trackFace',
    playGame: 'modules/playGame',
    score: 'modules/score',
    enterGame: 'modules/enterGame',

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
    },

    enterGame: {
      includes: ['jquery'],
      exports: 'enterGame'
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
  //'resizeCanvas',
  'getVideo',
  'trackFace',
  'playGame',
  'score',
  'enterGame'
], function($, _, App) {
  'use strict';

  // Start the application
  App.start();
});
