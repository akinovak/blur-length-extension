const config = {
    observerConfig: {
        childList: true,
        subtree: true, 
        attributes: true,
        attributeFilter: ["class"],
    },
    elements: {
        thumbnail: {
            selector: 'span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer', 
            display: 'inline-block'
        }, 
        timeDisplay: {
            selector: '#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate', 
            display: 'inline-block'
        },
        progressBar: {
            selector: '#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container', 
            display: 'block'
        }
    }
}