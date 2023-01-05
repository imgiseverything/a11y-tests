window.addEventListener("load", () => {
  const toggles = window.document.querySelectorAll('.toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('focus', function handleClick(event) {
      event.target.nextElementSibling.classList.add("focusvisible");
    });
    toggle.addEventListener('blur', function handleClick(event) {
      event.target.nextElementSibling.classList.remove("focusvisible");
    });
  });

});


/***************************************************************************
MODIFYING THE CODE BELOW THIS WILL AFFECT THE CONSENT MANAGEMENT.
PLEASE CONTACT SUPPORT FOR ASSISTANCE IF YOU NEED TO MODIFY.
***************************************************************************/

/**
* @description DIP-959
* @author Iyere Oboite <iyere.oboite@eurostar.com>
* @version 1.1
*/
(function preferences_prompt () { // eslint-disable-line camelcase
  var modal = document.querySelector('#__tealiumGDPRcpPrefs');
  var btnClose = document.querySelector('.close_btn_thick');
  var btnSave = document.querySelector('#preferences_prompt_submit');

  /**
   * Closes Consent Preferences Dialog.
   */
  var closeDialog = function () {
      if (modal && modal.style) {
          modal.style.display = 'none';
      }
      /**
       * @todo: Track Close icon button click.
       * This function also gets called when the Save button is clicked. Hence,
       * tracking should only happen when the Close icon button is clicked.
       */
  };

  /**
   * Show Consent Prompt.
   */
  var showPrompt = function () {
      if (window.utag && window.utag.gdpr
          && typeof window.utag.gdpr.showConsentPreferences === 'function') {
          var gdprLang = window.location.pathname.split('/')[1].split('-')[1] || window.utag.data.marketLanguage.split('-')[1] || '';
          window.utag.gdpr.showExplicitConsent(gdprLang);
      }
  };

  /**
   * Saves consent preferences and closes Consent Preferences Dialog.
   */
  var savePreferences = function () {

      setOldBannerCookie();

      var categories = {};
      var toggles = window.document.querySelectorAll('.consent_preferences .toggle');
      toggles = Array.prototype.slice.call(toggles);
      toggles.forEach(function (item) {
          if (/\d+$/.test(item.id)) {
              categories[item.id.match(/\d+$/)[0]] = (item.checked) ? 1 : 0;
          }
      });
      if (window.utag && window.utag.gdpr
          && typeof window.utag.gdpr.setPreferencesValues === 'function') {
          window.utag.gdpr.setPreferencesValues(categories);
      }
      if (typeof closeDialog === 'function') {
          closeDialog();
      }
      /**
       *  Track Save button click.
       */
      var prefs = Array();
      window.document.querySelectorAll(".consent_preferences_category_list")[0].querySelectorAll("input[type='checkbox']").forEach(function(el){
          var prefVal = (el.checked) ? 1 : 0;
          prefs.push(prefVal);
      });
      //callGoogleAnalytics('save', prefs.join("|"));
  };

  /**
   * Handles close icon button clicks.
   */
  if (btnClose) {
      btnClose.addEventListener('click', closeDialog);
  }
  if (btnClose) {
      btnClose.addEventListener('click', showPrompt);
  }

  /**
   * Handles 'Save' button clicks.
   */
  if (btnSave) {
      btnSave.addEventListener('click', savePreferences);
  }

  if (window.utag && window.utag.gdpr
      && typeof window.utag.gdpr.getConsentState === 'function'
      && window.utag.gdpr.preferences_prompt
      && typeof window.utag.gdpr.getCategories === 'function'
      && window.utag.gdpr.preferences_prompt.categories) {
      var consentState = window.utag.gdpr.getConsentState();
      if (typeof consentState === 'number') {
          var currentState = false;
          if (consentState === 1 || consentState === -1) { // Why is there a check for -1 as well?
              currentState = (consentState === 1);
          } else {
              currentState = !!window.utag.gdpr.preferences_prompt.defaultState;
          }
          var activeCategories = window.utag.gdpr.getCategories(true);
          /**
           * Filter out unused categories.
           * Analytics => Performance
           * Display Ads => Advertising
           * Misc => Functionality
           */
          activeCategories = activeCategories.filter(function (cat) {
              return /^(analytics|display_ads|misc)$/i.test(cat);
          });
          activeCategories.forEach(function (cat) {
              var id = window.utag.gdpr.preferences_prompt.categories[cat].id;
              var toggle = window.document.querySelector('#toggle_cat'.concat(id));
              if (toggle) {
                  toggle.checked = currentState;
              }
          });
      } else {
          consentState.forEach(function (cat) {
              if (cat.ct === '1') {
                  var id = window.utag.gdpr.preferences_prompt.categories[cat.name].id;
                  var toggle = window.document.querySelector('#toggle_cat'.concat(id));
                  if (toggle) {
                      toggle.checked = true;
                  }
              }
          });
      }

      if (!window.utag.data['cp.CONSENTMGR']) {

          var toggle9 = window.document.querySelector('#toggle_cat9'); // Functionality
          if (toggle9)  toggle9.checked = true;

          var toggle1 = window.document.querySelector('#toggle_cat1'); // Performance
          if (toggle1)  toggle1.checked = false;

          var toggle3 = window.document.querySelector('#toggle_cat3'); // Advertising
          if (toggle3)  toggle3.checked = false;
      }
  }

  /**
   * Remove Old Banner
   */
  var oldBanner = window.document.querySelector('#cookie-message');
  if (oldBanner) oldBanner.remove();

  /**
   * Set Old Banner Cookie
   */
  var setOldBannerCookie = function () {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var today  = new Date();
      var exdate=new Date();
      exdate.setDate(exdate.getDate() + 365);
      window.document.cookie = "eurostar_accepted_cookies="+today.toLocaleDateString("en-US", options)+"; domain=.eurostar.com; expires="+exdate.toUTCString()+"; path=/; ";
  };

  /**
   * Privacy Link
   */
  var gdprMarkLng = window.utag.data.marketLanguage || window.location.pathname.split('/')[1].split('-').join('-');

  if(window.document.querySelectorAll(".privacy_prompt_content a")[0]){

      if(/\-en/.test(gdprMarkLng) == true) var cookiesPage = 'cookies-and-personal-data';
      if(/\-fr/.test(gdprMarkLng) == true) var cookiesPage = 'utilisation-des-cookies';
      if(/\-nl/.test(gdprMarkLng) == true) var cookiesPage = 'ons-cookiebeleid';

      window.document.querySelectorAll(".privacy_prompt_content a")[0].href = "https://www.eurostar.com/"+ gdprMarkLng + '/'+ cookiesPage;

      window.document.querySelectorAll(".privacy_prompt_content a")[0].innerHTML = "https://www.eurostar.com/"+ gdprMarkLng + '/'+ cookiesPage;

  }

  /**
   * Tracking
   */
  var callGoogleAnalytics = function (event_action, event_label) {

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      var gaTid = (/staging\./.test(window.location.href))? 'UA-134701235-4' : 'UA-9818786-10';

      //if(document.cookie.indexOf('_ga') == -1)
      ga('create', gaTid, 'auto');


      ga('set', {
          'appName': window.utag_data.app_name,
          'appId': window.utag_data.app_id,
          'hostname': window.location.hostname,
          'title': '/' + window.utag_data.app_name + '/' + window.utag_data.page_name,
          'page': window.location.pathname,
      });

      ga('set', {
          'dimension2': window.utag_data.app_platform,
          'dimension97': window.location.pathname.split('/')[1],
          'dimension99': window.utag_data.page_name
      });

      ga('send', 'event', 'Consent', event_action, event_label, {
          nonInteraction: true
      });


  };


}());

