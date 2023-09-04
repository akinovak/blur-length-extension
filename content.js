"use strict";

let shouldHide; 

window.onload = async () => {
    chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
        if (message.action === 'hideExtensionStatusChanged') {
            shouldHide = await getExtensionStatus()
            hide(shouldHide)
        }
    });

    shouldHide = await getExtensionStatus()
    hide(shouldHide)

    const observer = new MutationObserver((_) => {
        hide(shouldHide)
    });

    observer.observe(document, config.observerConfig);
};

const hide = (shouldHide) => {
    hideThumbnails(shouldHide)
    hideTimeDisplay(shouldHide)
    hideProgressBar(shouldHide)
}

const hideThumbnails = (shouldHide) => {
    const spans = document.querySelectorAll(config.elements.thumbnail.selector);
    spans.forEach((span) => {
        span.style.display = shouldHide ? "none" : config.elements.thumbnail.display
    });
}

const hideTimeDisplay = (shouldHide) => {
    const element = document.querySelector(config.elements.timeDisplay.selector)
    if (!element) return

    element.style.display = shouldHide ? "none" : config.elements.timeDisplay.display
}

const hideProgressBar = (shouldHide) => {
    const element = document.querySelector(config.elements.progressBar.selector)
    if (!element) return

    element.style.display = shouldHide ? "none" : config.elements.progressBar.display
}