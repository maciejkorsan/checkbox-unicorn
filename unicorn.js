const glossary = {
  positive: ["opt out"],
  negative: [
    "contact",
    "telephone",
    "phone",
    "e-mail",
    "email",
    "mail",
    "marketing"
  ]
};

class CheckboxUnicorn {
  
  init() {
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
      const checkboxId = checkboxes[i].getAttribute("id");
      const checkboxLabel = document.querySelector(`label[for=${checkboxId}]`);
      const value = this.searchInLabel(checkboxLabel);
      if (value) {
        checkboxes[i].addEventListener('click', () => {
          const element = document.createElement(`img`);
          element.setAttribute('style', 'position: fixed; bottom: 0; right: 0;');
          const url = chrome.extension.getURL('assets/angry.png');
          element.setAttribute('src', url);
          document.querySelector('body').appendChild(element);
        })
      }
    }
  }

  searchInLabel(label) {
    const labelText = label.innerText;

    if (!this.checkGlossary(labelText, "negative")) {
      label.classList.add("unicorn-negative");
      return true;
    } else if (!this.checkGlossary(labelText, "positive")) {
      label.classList.add("unicorn-positive");
      return false;
    }
  }

  checkGlossary(text, value) {
    glossary[value].some(function(item) {
      return text.indexOf(item) === -1;
    });
  }
}

let unicorn = new CheckboxUnicorn();
unicorn.init();
