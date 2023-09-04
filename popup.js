let extensionActivated;
let activateButton;

document.addEventListener('DOMContentLoaded', async function () {
    activateButton = document.getElementById('activateButton');

    extensionActivated = await isActivated(); 
    updateButtonText();

    activateButton.addEventListener('click', async () => {
        await clicked(); 
        notifyTabs()
    })
});

const clicked = async() => {
    extensionActivated = !extensionActivated;
    await setActivated(extensionActivated)
    updateButtonText()
}

const notifyTabs = () => {
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
        if (tabs && tabs.length > 0) {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, { action: 'blurExtensionClicked' });
            });
        }
    });
}

const updateButtonText = () => {
    activateButton.textContent = extensionActivated ? 'Deactivate' : 'Activate'
}

const isActivated = async() => {
    return new Promise((resolve, _) => {
        chrome.storage.local.get(['blurExtensionActivated'], (result) => {
          if (!chrome.runtime.lastError) {
            resolve(result.blurExtensionActivated || false);
          }
        });
    });
}

const setActivated = async(value) => {
    return new Promise((resolve, _) => {
        chrome.storage.local.set({ blurExtensionActivated: value }, () => {
          if (!chrome.runtime.lastError) {
            resolve(value);
          }
        });
    });
}