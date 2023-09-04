const observerConfig = {
    childList: true,
    subtree: true, 
};

let shouldHide; 

window.onload = async () => {
    chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
        if (message.action === 'blurExtensionClicked') {
            shouldHide = await getExtensionStatus()
            hide(shouldHide)
        }
    });

    shouldHide = await getExtensionStatus()
    hide(shouldHide)

    const observer = new MutationObserver((_) => {
        hide(shouldHide)
    });

    observer.observe(document, observerConfig);
};

const hide = (shouldHide) => {
    updateThumbnails(shouldHide)
    removePlayerTime(shouldHide)
    removeProgressBar(shouldHide)
}

const updateThumbnails = (shouldHide) => {
    const spans = document.querySelectorAll('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer');
    spans.forEach((span) => {
        span.style.display = shouldHide ? "none" : "inline-block"
    });
}

const removePlayerTime = (shouldHide) => {
    const element = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate")
    if (!element) return

    element.style.display = shouldHide ? "none" : "inline-block"
}

const removeProgressBar = (shouldHide) => {
    const element = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container")
    if (!element) return

    element.style.display = shouldHide ? "none" : "block"
}

const getExtensionStatus = async() => {
    return new Promise((resolve, _) => {
        chrome.storage.local.get(['blurExtensionActivated'], (result) => {
          if (!chrome.runtime.lastError) {
            resolve(result.blurExtensionActivated || false);
          }
        });
    });
}