const observerConfig = {
    childList: true,
    subtree: true, 
};

let isActive; 

window.onload = async () => {
    console.log('Window has finished loading');

    chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
        if (message.action === 'blurExtensionClicked') {
          console.log('got the message')
          location.reload()
        }
    });

    isActive = await getExtensionStatus()
    updateSpanOuterText()

    const observer = new MutationObserver((_) => {
        updateSpanOuterText()
    });

    observer.observe(document, observerConfig);
};


const updateSpanOuterText = () => {
    if (!isActive) return;
    const spans = document.querySelectorAll('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer');
    spans.forEach((span) => {
        span.outerText = "Hidden";
    });
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