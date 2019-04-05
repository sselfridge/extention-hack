'use strict';

chrome.runtime.onInstalled.addListener(function () {
  // chrome.storage.sync.set({ color: 'red' }, function () {
  //   console.log("The color is red.");
  // });
  chrome.storage.sync.set({ refreshOn: false }, function () {
    console.log("No new Refresh time ");
  });

  chrome.storage.sync.set({ userInactive: false }, function () { });


  // Use page state to only activate on .html pages? ....if you're using a server
  // you should be using something more sophisticated maybe??

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: { pathContains: '.html' },
  //     })
  //     ],
  //     actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  //   // console.log("Hello from background.js!!");
  // });
});



function setToggle(val) {
  chrome.storage.sync.set({ refreshOn: val }, function () {
    // console.log('NewRefresh is set');
  });

}


chrome.commands.onCommand.addListener(function (command) {

  // console.log(`Command: ${command} has been activated!`);
  chrome.storage.sync.get(['refreshOn'], function (result) {

    if (result['refreshOn']) {
      setToggle(false);
      chrome.browserAction.setBadgeBackgroundColor({ color: 'orange' })
    } else {
      setToggle(true);
      chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })

    }
  });

});

//check status and update icon accordingly
setInterval(function () {
  chrome.storage.sync.get(['refreshOn'], function (refreshResult) {
    chrome.storage.sync.get(['userInactive'], function (result) {
      let refreshOn = refreshResult['refreshOn'];
      let userInactive = result['userInactive'];
      
      // console.log('refreshOn: ', refreshOn);
      // console.log('userInactive: ', userInactive);

      if ( userInactive && refreshOn) {
        chrome.browserAction.setBadgeText({ text: 'Refreshing' });
        chrome.browserAction.setBadgeBackgroundColor({ color: 'green' })

      } else if (!userInactive && refreshOn) {
        chrome.browserAction.setBadgeText({ text: 'Stopped' });
        chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })
      }

    });
  });
}, 400)

// This looks promising for watching files maybe?
// https://developer.chrome.com/apps/fileSystem#method-getVolumeList



// Context menus	contextMenus	Allows app or extension developers 
// to add items to the context menu in Chrome. To open the context menu, users right-click a webpage.
// https://developer.chrome.com/extensions/desktopCapture