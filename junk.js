function hookAjax() {
  if (window.jQuery) {
      console.log("[Tampermonkey] jQuery detected, hooking into $.ajax...");
      $(document).ajaxSuccess((event, xhr, settings) => {
          if (settings.url.includes('/api/2.0/public/cards')) { // Adjust for correct API endpoint
              try {
                  let response = JSON.parse(xhr.responseText);
                  response = filterCubeCards(response);
                  Object.defineProperty(xhr, "responseText", { value: JSON.stringify(response) });
                  console.log("[Tampermonkey] Modified API response:", response);
              } catch (e) {
                  console.error("[Tampermonkey] Error modifying response:", e);
              }
          }
      });
  } else {
      console.warn("[Tampermonkey] jQuery not detected yet, retrying in 500ms...");
      setTimeout(hookAjax, 500);
  }
}


function hookAjax() {
  if (window.jQuery && window.jQuery.ajax) {
      console.log("[Tampermonkey] Hooking into $.ajax...");

      const originalAjax = $.ajax;
      $.ajax = function(settings) {
          if (settings.url.includes('/api/2.0/public/cards')) { // Adjust endpoint as needed
              console.log("[Tampermonkey] Intercepting AJAX request:", settings.url);

              const originalSuccess = settings.success;
              settings.success = function(response, textStatus, jqXHR) {
                  response = filterCubeCards(response);
                  console.log("[Tampermonkey] Modified API response:", response);
                  if (originalSuccess) originalSuccess(response, textStatus, jqXHR);
              };
          }
          return originalAjax.apply(this, arguments);
      };
  } else {
      console.warn("[Tampermonkey] jQuery not detected yet, retrying in 500ms...");
      setTimeout(hookAjax, 500);
  }
}

var fdb = new ForerunnerDB(); fdb.db('netrunnerdb').collection('master_cards').remove();

var fdb = new ForerunnerDB(); await fdb.db('netrunnerdb').collection('master_cards').load(()=>{}); fdb.db('netrunnerdb')
var fdb = new ForerunnerDB(); await fdb.db('netrunnerdb').collection('master_cards').setData([]); await fdb.db('netrunnerdb').save(()=>{});

$.ajax = function(settings) {
  if (settings && settings.url && settings.url.includes('/api/2.0/public/cards')) {
      console.log("[Tampermonkey] Intercepted Ajax request to cards API:", settings.url);

      const modifiedPromise = originalAjax.apply(this, arguments).then(response => {
          console.log("[Tampermonkey] Original response:", response);
          
          // Modify the response here
          if (Array.isArray(response.data)) {
              response.data = response.data.filter(card => allowedCardIds.has(card.code));
          }

          console.log("[Tampermonkey] Modified response:", response);
          return response;
      });

      return modifiedPromise;
  }

  return originalAjax.apply(this, arguments);
};