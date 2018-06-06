window.onload = function(){
  let angryUnicorn = false;

let glossary = {
  positive: ["opt out", "opt-out"],
  negative: [
    "contact",
    "consultant",
    "telephone",
    "phone",
    "e-mail",
    "email",
    "mail",
    "marketing",
    "terms",
    "e-post",
    "SMS",
    "offer",
    "offers",
    "newsletter",
    "newsletters",
    "markedsføring",
    "tekstmelding",
    "telefon",
    "tilbud",
    "nyhetsbrev",
    "kontakt",
    "konsulent",
    "kundeklubben",
    "klubben"
  ]
};

class CheckboxUnicorn {
  init() {
    console.log(glossary);
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
      const checkboxId = checkboxes[i].getAttribute("id");
      const checkboxLabel = document.querySelector(`label[for=${checkboxId}]`);
      let value = false;
      if (!checkboxLabel || !checkboxLabel.innerText) {
        const childNodes = checkboxes[i].parentNode.children;
        for (let y = 0; y < childNodes.length; y++) {
          if (childNodes[y].innerText) {
            value = this.searchInLabel(childNodes[y]);
          }
        }
      } else {
        value = this.searchInLabel(checkboxLabel);
      }
      if (angryUnicorn && value) {
        checkboxes[i].addEventListener("click", () => {
          if (checkboxes[i].checked) {
            const element = document.createElement(`img`);
            element.setAttribute(
              "class", "checkbox-angry-unicorn"
            );
            const url = chrome.extension.getURL("assets/angry.png");
            element.setAttribute("src", url);
            document.querySelector("body").appendChild(element);

            const audio = document.createElement(`audio`);
            audio.setAttribute('src', chrome.extension.getURL("assets/roar.mp3"));
            audio.play()
          }          
        });
      }
    }
  }

  searchInLabel(label) {
    const labelText = label.innerText;

    if (this.checkGlossary(labelText, "negative")) {
      label.classList.add("unicorn-negative");
      return true;
    } else if (this.checkGlossary(labelText, "positive")) {
      label.classList.add("unicorn-positive");
      return false;
    }
  }

  checkGlossary(text, value) {
    function checkArray(item) {
      return text.toLowerCase().indexOf(item.toLowerCase()) !== -1;
    }
    return glossary[value].some(checkArray);
  }
}

let unicorn = new CheckboxUnicorn();

chrome.storage.local.get("goodWords", function(result) {
  if (!result.goodWords) {
    chrome.storage.local.set({ goodWords: glossary["positive"] });
  } else {
    glossary["positive"] = result.goodWords;
  }

  chrome.storage.local.get("badWords", function(result) {
    if (!result.badWords) {
      chrome.storage.local.set({ badWords: glossary["negative"] });
    } else {
      glossary["negative"] = result.badWords;
    }

    chrome.storage.local.get("angry", function(result) {
      if (!result.angry) {
        chrome.storage.local.set({ angry: false });
        angryUnicorn = false;
      } else {
        angryUnicorn = result.angry;
      }
      unicorn.init();
    });
  });
});
};


