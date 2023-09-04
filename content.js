const observerConfig = {
    childList: true,
    subtree: true, 
};

let isActive; 

window.onload = async () => {
    chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
        if (message.action === 'blurExtensionClicked') {
          location.reload()
        }
    });

    isActive = await getExtensionStatus()
    hide()

    const observer = new MutationObserver((_) => {
        hide()
    });

    observer.observe(document, observerConfig);
};

const hide = () => {
    if (!isActive) return;
    updateThumbnails()
    removePlayerTime()
    removeProgressBar()
}

const updateThumbnails = () => {
    const spans = document.querySelectorAll('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer');
    spans.forEach((span) => {
        span.outerText = "Hidden";
    });
}

const updateThumbnailsVideo = () => {
    const spans = document.querySelectorAll('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer');
    spans.forEach((span) => {
        span.outerText = "Hidden";
    });
}

const removePlayerTime = () => {
    const element = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate")
    if (!element) return

    element.style.display = "none"
}

const removeProgressBar = () => {
    const element = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar")
    if (!element) return

    element.style.display = "none"
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