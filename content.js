
let xPos;



function findScreenCoords(mouseEvent){
  xPos = mouseEvent.screenX;
}

document.documentElement.onmousemove = findScreenCoords;

isTabActive = false; //used for debugging in setInterval

window.onfocus = function () {
    isTabActive = true;
    chrome.storage.sync.set({ userInactive: false }, function () { });
};

window.onblur = function () {

    //TODO - track edge that user leaves the screen, if right, don't restart refreshing
    
    let offX = window.innerWidth - xPos
    if(offX < 100){
        //hold
        console.log(`offX = ${offX} = ${window.innerWidth} - ${xPos}`);
        chrome.storage.sync.set({ refreshOn: false }, function () {});
        chrome.storage.sync.set({ userInactive: false }, function () { });

    }else{
        isTabActive = false;
        chrome.storage.sync.set({ userInactive: true }, function () { });
    }



};


// setInterval(function () {
//     console.log(isTabActive ? 'Active!!' : 'Inactive');
// }, 1000)



function refreshPage() {

    chrome.storage.sync.get(['userInactive'], function (result) {
        isUserInactive = result['userInactive'];

        if (isUserInactive === true) {
            //if setting is on - refresh page
            chrome.storage.sync.get(['refreshOn'], function (result) {
                needRefresh = result['refreshOn'];
                if (needRefresh) {
                    location.reload(true)
                    console.log(`Extention Active------REFRESH THIS SHIT!!!!!!!!!!!!!!!`);
                }

            });
        }
        setTimeout(refreshPage, 2000);
    });
}

setTimeout(refreshPage, 2000);

