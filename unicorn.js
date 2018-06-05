class CheckboxUnicorn {

    constructor() {
    }

    init() {
        console.log("Checkbox unicorn!")  

        var images = document.getElementsByTagName('img')
        for (var i = 0, l = images.length; i < l; i++) {
            images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height
        }
    }    
}

let unicorn = new CheckboxUnicorn()
unicorn.init()
