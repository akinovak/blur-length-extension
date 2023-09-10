"use strict";

let hidden;
let toggleSwitch;
let toggleSlider;

document.addEventListener("DOMContentLoaded", async () => {
  hidden = await getExtensionStatus();

  toggleSwitch = document.getElementById("toggle");
  toggleSlider = toggleSwitch.querySelector(".toggle-slider");

  updateToggle();

  toggleSwitch.addEventListener("click", async () => {
    await clicked();
    notifyTabs();
  });
});

const clicked = async () => {
  hidden = !hidden;
  updateToggle();
  await setExtensionStatus(hidden);
};

const notifyTabs = () => {
  chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
    if (tabs && tabs.length > 0) {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "hideExtensionStatusChanged",
        });
      });
    }
  });
};

const updateToggle = () => {
  if (hidden) {
    toggleSwitch.classList.add("on");
    toggleSlider.classList.add("on");
  } else {
    toggleSwitch.classList.remove("on");
    toggleSlider.classList.remove("on");
  }
};
