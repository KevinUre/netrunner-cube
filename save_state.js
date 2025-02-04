// ==UserScript==
// @name         Netrunner Cube
// @namespace    http://tampermonkey.net/
// @version      2025-02-04
// @description  Filters NetrunnerDB card list to only show cube cards
// @author       You
// @match        https://netrunnerdb.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
  'use strict';
  console.log("[Tampermonkey] Script loaded.");
  // var fdb = new ForerunnerDB(); fdb.db('netrunnerdb').collection('master_cards').remove();
  console.log("[Tampermonkey] forerunner nuked.");
  const cube = [];

  function filterCubeCards(response) {
      for(let i = 0; i < response.data.length; i++) {
          if (response.data[i].title === 'Accelerated Beta Test') {
              console.log('found Accelerated Beta Test')
              response.data.splice(i,1)
          }
      }
      return response;
  }

  function hookAjax() {
      if (window.jQuery && window.jQuery.ajax) {
          console.log("[Tampermonkey] Hooking into $.ajax...");

          const originalAjax = $.ajax;
          $.ajax = function(settings) {
              if (settings === '/api/2.0/public/cards') {
                  console.log("[Tampermonkey] Intercepted Ajax request to cards API:", settings);

                  const modifiedPromise = originalAjax.apply(this, arguments).then(response => {
                      console.log("[Tampermonkey] Original response:", response);

                      // Modify the response here
                      if (Array.isArray(response.data)) {
                          response = filterCubeCards(response)
                      }

                      console.log("[Tampermonkey] Modified response:", response);
                      return response;
                  });

                  return modifiedPromise;
              }

              return originalAjax.apply(this, arguments);
          };
      } else {
          console.warn("[Tampermonkey] jQuery not detected yet, retrying in 500ms...");
          setTimeout(hookAjax, 500);
      }
  }

  // Ensure jQuery is hooked as early as possible
  Object.defineProperty(window, "jQuery", {
      get: function() {
          return this._jQuery;
      },
      set: function(value) {
          console.log("[Tampermonkey] jQuery detected, hooking $.ajax...");
          this._jQuery = value;
          // hookAjax();
      },
      configurable: true
  });

})();