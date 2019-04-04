// refreshTime = 1000;

window.onfocus = function () {

    isTabActive = true;
};

window.onblur = function () {

    isTabActive = false;
};

console.log(`CONTENT.JS CHECKING IN!!`);



function checkRefreshFlag(flag) {
    console.log(`Refreshed--------------${flag}---------`);
    if(flag === true){
        // chrome.storage.sync.set({ 'newRefreshTime': false }, function () {
        //     console.log('NewRefresh is set to ');
        //     // location.reload(true);
        // });
        refreshTime = 100;
        location.reload(true)
    }
}


function refreshPage() {
    // chrome.storage.sync.get(['newRefreshTime'], function (result) {
    //     let needRefresh;
    //     console.log(result['newRefreshTime']);
    //     needRefresh = result['newRefreshTime'];
    //     console.log('From Content');

    //     callOnMe(needRefresh);
    // });
    chrome.storage.sync.get(['newRefreshTime'], function (result) {
        needRefresh = result['newRefreshTime'];

        checkRefreshFlag(needRefresh);
        setTimeout(refreshPage, 2000);
    });

    // console.log(`Refesh Time is: ${refreshTime}`);

}

setTimeout(refreshPage, 2000);

