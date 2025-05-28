document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(["blockedWords", "blockedChannels"], (data) => {
    document.getElementById('keywords').value = (data.blockedWords || []).join('\n');
    document.getElementById('channels').value = (data.blockedChannels || []).join('\n');
  });
});

document.getElementById('save').addEventListener('click', () => {
  const words = document.getElementById('keywords').value.split('\n').map(s => s.trim()).filter(Boolean);
  const channels = document.getElementById('channels').value.split('\n').map(s => s.trim()).filter(Boolean);

  chrome.storage.sync.set({ blockedWords: words, blockedChannels: channels }, () => {
    const status = document.getElementById('status');
    status.textContent = "Changes Saved";

    // close the popup
    setTimeout(() => {
      window.close();
    }, 500);
  });
});
