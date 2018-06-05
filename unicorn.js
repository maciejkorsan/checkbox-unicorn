const glossary = {
    "positive": [
        "opt out"
    ],
    "negative": [
        "contact",
        "telephone",
        "phone",
        "e-mail",
        "email",
        "mail",
        "marketing"
    ]
}

class CheckboxUnicorn {

    init() {
        let checkboxes = document.querySelectorAll("input[type=checkbox]")
        for (let i = 0; i < checkboxes.length; i++) {
            const checkboxId = checkboxes[i].getAttribute("id")
            const checkboxLabel = document.querySelector(`label[for=${checkboxId}]`)

            this.searchInLabel(checkboxLabel)
        }
    }

    searchInLabel(label) {
        const labelText = label.innerText

        if (!this.checkGlossary(labelText, "negative")) {
            label.classList.add("unicorn-negative")
        } else if (!this.checkGlossary(labelText, "positive")) {
            label.classList.add("unicorn-positive")
        }
    }

    checkGlossary(text, value) {
        glossary[value].some(function(item) {
            return text.indexOf(item) === -1
        })
    }  
    
}

let unicorn = new CheckboxUnicorn()
unicorn.init()
