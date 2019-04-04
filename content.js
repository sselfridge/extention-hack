// refreshTime = 1000;
isTabActive = false;
window.onfocus = function () {
    isTabActive = true;
    chrome.storage.sync.set({ userInactive: false }, function () {
        console.log("User Active - Stop refreshing ");
    });
};

window.onblur = function () {

    //TODO - track edge that user leaves the screen, if right, don't restart refreshing

    isTabActive = false;
    console.time("setToTrue")
    chrome.storage.sync.set({ userInactive: true }, function () {
        console.log("Inactive Active - Start Refreshing ");
    });
    console.timeEnd("setToTrue")

};

console.log(`CONTENT.JS CHECKING IN!!`);

setInterval(function(){
    console.log(isTabActive ? 'Active!!' : 'Inactive');
},1000)

function userInactive(flag) {
    console.log(`User Inactive:${flag}`);
    if (flag === true) {
        //if setting is on - refresh page
        chrome.storage.sync.get(['refreshOn'], function (result) {
            needRefresh = result['refreshOn'];
            if (needRefresh) {
                location.reload(true)
                console.log(`Extention Active------REFRESH THIS SHIT!!!!!!!!!!!!!!!`);
            }

        });
        // refreshTime = 100;
    }
}


function refreshPage() {
    // chrome.storage.sync.get(['refreshOn'], function (result) {
    //     let needRefresh;
    //     console.log(result['refreshOn']);
    //     needRefresh = result['refreshOn'];
    //     console.log('From Content');

    //     callOnMe(needRefresh);
    // });
    chrome.storage.sync.get(['userInactive'], function (result) {
        isUserInactive = result['userInactive'];

        userInactive(isUserInactive);
        setTimeout(refreshPage, 2000);
    });

    // console.log(`Refesh Time is: ${refreshTime}`);

}

setTimeout(refreshPage, 2000);

