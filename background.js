// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: 'red' }, function () {
    console.log("The color is red.");
  });
  chrome.storage.sync.set({ refreshOn: false }, function () {
    console.log("No new Refresh time ");
  });
  // chrome.storage.sync.set({ refreshTime: 100 }, function () {
  //   console.log("Setting base refreshTime ");
  // });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { pathContains: '.html' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
    console.log("Hello from background.js!!");
  });
});

console.log("Hello from outsise.js!!");



function setToggle(val){
  chrome.storage.sync.set({ refreshOn: val }, function () {
    console.log('NewRefresh is set');
  });
  
}


chrome.commands.onCommand.addListener(function (command) {

  console.log(`Command: ${command} has been activated!`);
  chrome.storage.sync.get(['refreshOn'], function (result) {

    if (result['refreshOn']) {
      console.log('red');
      setToggle(false);
    } else {
      setToggle(true);

    }
  });



  
});

// This looks promising for watching files maybe?
// https://developer.chrome.com/apps/fileSystem#method-getVolumeList



// Context menus	contextMenus	Allows app or extension developers 
// to add items to the context menu in Chrome. To open the context menu, users right-click a webpage.
// https://developer.chrome.com/extensions/desktopCapture