"use strict";

let hidden;
let shouldHideButton;

document.addEventListener('DOMContentLoaded', async () => {
    hidden = await getExtensionStatus(); 
    shouldHideButton = document.getElementById('shouldHideButton');

    updateButtonText();

    shouldHideButton.addEventListener('click', async () => {
        await clicked(); 
        notifyTabs()
    })
});

const clicked = async() => {
    hidden = !hidden;
    await setExtensionStatus(hidden)
    updateButtonText()
}

const notifyTabs = () => {
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
        if (tabs && tabs.length > 0) {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, { action: 'hideExtensionStatusChanged' });
            });
        }
    });
}

const updateButtonText = () => {
    shouldHideButton.textContent = hidden ? 'Show' : 'Hide'
}