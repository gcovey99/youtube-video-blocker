function filterVideos(blockedWords, blockedChannels) {
  const items = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer');

  items.forEach(item => {
    const text = item.innerText.toLowerCase();

    const blockByKeyword = blockedWords.some(word => text.includes(word.toLowerCase()));

    const channelNameElement = item.querySelector('#channel-name, ytd-channel-name a');
    const channelName = channelNameElement?.innerText?.trim()?.toLowerCase();
    const blockByChannel = blockedChannels.some(name => channelName === name.toLowerCase());

    if (blockByKeyword || blockByChannel) {
      item.style.display = "none";
    }
  });
}

// Load user-defined keywords and channels
function runFilter() {
  chrome.storage.sync.get(["blockedWords", "blockedChannels"], (data) => {
    const words = data.blockedWords || [];
    const channels = data.blockedChannels || [];
    filterVideos(words, channels);
  });
}

const observer = new MutationObserver(runFilter);
observer.observe(document.body, { childList: true, subtree: true });

runFilter();
