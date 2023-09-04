const getExtensionStatus = async() => {
    return new Promise((resolve, _) => {
        chrome.storage.local.get(['hidden'], (result) => {
          if (!chrome.runtime.lastError) {
            resolve(result.hidden || false);
          }
        });
    });
}

const setExtensionStatus = async(value) => {
    return new Promise((resolve, _) => {
        chrome.storage.local.set({ hidden: value }, () => {
          if (!chrome.runtime.lastError) {
            resolve(value);
          }
        });
    });
}