// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


let setTime = document.getElementById('timeSubmit');
let toggle = false;

setTime.onclick = function (element) {
  if (toggle) {
    chrome.storage.sync.set({newRefreshTime: false}, function() {
      setTime.style.backgroundColor = 'red';
      toggle = false;
      console.log('NewRefresh is set to false');
    });
  } else {
    chrome.storage.sync.set({newRefreshTime: true}, function() {
      setTime.style.backgroundColor = 'green'
      toggle = true;
      console.log('NewRefresh is set');
    });
  }

  // chrome.storage.sync.set({refreshTime: '100'}, function() {
  //   console.log('Refreshtime is set');
  // });

  

}
