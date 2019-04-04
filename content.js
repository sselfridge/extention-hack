refreshTime = 1000;

window.onfocus = function () {

    isTabActive = true;
};

window.onblur = function () {

    isTabActive = false;
};

console.log(`CONTENT.JS CHECKING IN!!`);



function callOnMe(flag) {
    console.log(`Refreshed--------------${flag}---------`);
    if(flag === true){
        chrome.storage.local.set({ 'newRefreshTime': false }, function () {
            console.log('NewRefresh is set to ');
            // location.reload(true);
        });
        refreshTime = 100;
        // location.reload(true)
    }
}


function refreshPage() {


    console.log(`Refresh Page Run`);

    
    chrome.storage.sync.get(['newRefreshTime'], function (result) {
        let needRefresh;
        console.log(result['newRefreshTime']);
        needRefresh = result['newRefreshTime'];
        console.log('From Content');

        callOnMe(needRefresh);

    });

    console.log(`Refesh Time is: ${refreshTime}`);

    setTimeout(refreshPage, 1000);
}

setTimeout(refreshPage, 1000);

