chrome.storage.local.get("goodWords", function(result) {
  if (!result.goodWords) {
    chrome.storage.local.set({ goodWords: defaultWords });
  }
});

chrome.storage.local.get("badWords", function(result) {
  if (!result.badWords) {
    chrome.storage.local.set({ badWords: defaultWords });
  }
});


chrome.storage.local.get("angry", function(result) {
  document.querySelector('.checkbox--js').checked = result.angry
})

chrome.storage.local.get("goodWords", function(result) {
  document.querySelector('.good-words--js').value = result.goodWords.join('\n');
});

chrome.storage.local.get("badWords", function(result) {
  document.querySelector('.bad-words--js').value = result.badWords.join('\n');
});


document.querySelector('.submit--js').addEventListener('click', (e) => {
  e.preventDefault()
  let data = document.querySelector('.good-words--js').value;
  chrome.storage.local.set({ goodWords: data.split('\n') });
  data = document.querySelector('.bad-words--js').value;
  chrome.storage.local.set({ badWords: data.split('\n') });
  const elm = document.querySelector('.saved');
  const newone = elm.cloneNode(true);
  newone.classList.add('saved--visible');
  elm.parentNode.replaceChild(newone, elm);
})

document.querySelector('.switch--js').addEventListener('click', (e) => {
  chrome.storage.local.set({ angry: document.querySelector('.checkbox--js').checked});
})