import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
let currentURL = window.location.href;
console.log('currentURL:', currentURL);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
});
printLine("Using the 'printLine' function from the Print Module");
const getCurrentPage = () => {
  const page = window.location.href;
  console.log('page:', page);
  return page;
};

const sendMessage = (msg = { type: `GET_DOM` }, sender, sendResponse) => {
  let currentPage = getCurrentPage();
  const response = {
    title: currentPage,
    headlines: [],
  };
  sendResponse(response);
};
chrome.runtime.onMessage.addListener(sendMessage);
