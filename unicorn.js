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

            if (!checkboxLabel || !checkboxLabel.innerText) {
                const childNodes = checkboxes[i].parentNode.children
                console.log(childNodes)

                for (let y = 0; y < childNodes.length; y++) {
                    if (childNodes[y].innerText) {
                        this.searchInLabel(childNodes[y])
                    } 
                }
            } else {
                this.searchInLabel(checkboxLabel)
            }
        }
    }

    searchInLabel(label) {
        const labelText = label.innerText

        console.log(this.checkGlossary(labelText, "negative"))

        if (this.checkGlossary(labelText, "negative")) {
            label.classList.add("unicorn-negative")
        } else if (this.checkGlossary(labelText, "positive")) {
            label.classList.add("unicorn-positive")
        }
    }

    checkGlossary(text, value) {
        function checkArray(item) {
            return text.indexOf(item) !== -1
        }

        glossary[value].some(checkArray)
    }  
    
}

let unicorn = new CheckboxUnicorn()
unicorn.init()
