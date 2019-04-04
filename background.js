// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: 'red' }, function () {
    console.log("The color is red.");
  });
  chrome.storage.sync.set({ newRefreshTime: false }, function () {
    console.log("No new Refresh time ");
  });
  chrome.storage.sync.set({ refreshTime: 100 }, function () {
    console.log("Setting base refreshTime ");
  });
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


chrome.commands.onCommand.addListener(function (command) {
  // chrome.tabs.query({currentWindow: true}, function(tabs) {
  //   // Sort tabs according to their index in the window.
  //   tabs.sort((a, b) => { return a.index < b.index; });
  //   let activeIndex = tabs.findIndex((tab) => { return tab.active; });
  //   let lastTab = tabs.length - 1;
  //   let newIndex = -1;
  //   if (command === 'flip-tabs-forward')
  //     newIndex = activeIndex === 0 ? lastTab : activeIndex - 1;
  //   else  // 'flip-tabs-backwards'
  //     newIndex = activeIndex === lastTab ? 0 : activeIndex + 1;
  //   chrome.tabs.update(tabs[newIndex].id, {active: true, highlighted: true});
  // });
  console.log(`Command: ${command} has been activated!`);
});

// This looks promising for watching files maybe?
// https://developer.chrome.com/apps/fileSystem#method-getVolumeList



// Context menus	contextMenus	Allows app or extension developers 
// to add items to the context menu in Chrome. To open the context menu, users right-click a webpage.
// https://developer.chrome.com/extensions/desktopCapture