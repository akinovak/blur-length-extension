"use strict";

let shouldHide; 
let thumbnail; 
let vTime;
let pBar;  

window.onload = async () => {
    setUp()
    
    chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
        if (message.action === 'hideExtensionStatusChanged') {
            shouldHide = await getExtensionStatus()
            hide(shouldHide)
        }
    });

    shouldHide = await getExtensionStatus()
    hide(shouldHide)
};

const setUp = () => {
    thumbnail = document.createElement('style');
    document.head.appendChild(thumbnail);

    vTime = document.createElement('style');
    document.head.appendChild(vTime);

    pBar = document.createElement('style');
    document.head.appendChild(pBar);
}

const hide = (shouldHide) => {
    if (shouldHide) {
        thumbnail.innerText = '.ytd-thumbnail-overlay-time-status-renderer { display: none !important; }'
        vTime.innerText = '.ytp-time-duration { display: none !important; }'
        pBar.innerText = '.ytp-progress-bar-container { display: none !important; }'
    } else {
        thumbnail.innerText = ''
        vTime.innerText = ''
        pBar.innerText = ''
    }
}