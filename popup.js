'use strict';
let setTime = document.getElementById('timeSubmit');


let toggle = false; //toggle to keep track of if the extention is activated
chrome.storage.sync.get(['refreshOn'], function (result) {
  if (result['refreshOn']) {
    setTime.style.backgroundColor = 'red';
    setTime.innerHTML = 'STOP'
    toggle = true;
  } else {
    setTime.style.backgroundColor = 'green'
    setTime.innerHTML = 'START'
    toggle = false;
  }
});


setTime.onclick = function (element) {
  if (toggle) {
    chrome.storage.sync.set({ refreshOn: false }, function () {
      setTime.style.backgroundColor = 'green';
      setTime.innerHTML = 'START'
      toggle = false;      
    });
  } else {
    chrome.storage.sync.set({ refreshOn: true }, function () {
      setTime.style.backgroundColor = 'red'
      setTime.innerHTML = 'STOP'
      toggle = true;
      console.log(chrome.browserAction.setBadgeText({text: ''}));
    });
  }
}
