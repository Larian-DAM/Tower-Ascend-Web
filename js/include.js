"use strict";

function loadComponents(id, file) {
    fetch(file).then(res => res.text()).then(data => {
        document.getElementById(id).innerHTML = data;
    })
}

loadComponents("header", "/components/header.html");
loadComponents("footer", "/components/footer.html");