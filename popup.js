// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
console.log('This is the popup page!!!!!$$$$$$$$$$$$$$$$$$$');
// let changeColor = document.getElementById('changeColor');
// chrome.storage.sync.get('color', function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
let setTime = document.getElementById('timeSubmit');
let toggle = false;


console.log('Setting Color');
chrome.storage.sync.get(['refreshOn'], function (result) {
  if (result['refreshOn']) {
    console.log('red');
    setTime.style.backgroundColor = 'red';
    setTime.innerHTML = 'STOP'
  } else {
    console.log('Green');
    setTime.style.backgroundColor = 'green'
    setTime.innerHTML = 'START'
  }
});




setTime.onclick = function (element) {
  if (toggle) {
    chrome.storage.sync.set({ refreshOn: false }, function () {
      setTime.style.backgroundColor = 'green';
      setTime.innerHTML = 'START'
      toggle = false;
      console.log('NewRefresh is set to false');
    });
  } else {
    chrome.storage.sync.set({ refreshOn: true }, function () {
      setTime.style.backgroundColor = 'red'
      setTime.innerHTML = 'STOP'
      toggle = true;
      console.log('NewRefresh is set');
    });
  }

  // chrome.storage.sync.set({refreshTime: '100'}, function() {
  //   console.log('Refreshtime is set');
  // });



}
