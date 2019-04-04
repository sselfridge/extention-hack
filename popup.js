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
    changeColor.style.backgroundColor = 'red';
    toggle = false;
  } else {
    changeColor.style.backgroundColor = 'green'
    toggle = true;
  }

  chrome.storage.sync.set({refreshTime: '100'}, function() {
    console.log('Refreshtime is set');
  });

  chrome.storage.sync.set({newRefreshTime: true}, function() {
    console.log('NewRefresh is set');
  });

  

}
