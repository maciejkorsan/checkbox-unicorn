chrome.storage.local.get("words", function(result) {
  if (!result.words) {
    chrome.storage.local.set({ words: defaultWords });
  }
});

chrome.storage.local.get("words", function(result) {
  document.querySelector('.words--js').value = result.words.join('\n');
});


document.querySelector('.submit--js').addEventListener('click', (e) => {
  e.preventDefault()
  const data = document.querySelector('.words--js').value
  chrome.storage.local.set({ words: data.split('\n') });
})
