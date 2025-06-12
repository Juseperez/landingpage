"use strict";

const openLink = (id,url) => {
    const insta = document.getElementById(id);
    if (insta) {
        insta.addEventListener("click", () => {
            window.open(url, "_blank");
        });
    }
};

(() => {
    openLink("instagram","https://www.instagram.com/Americanspalopeca/");
    openLink("whatsapp","https://wa.me/573103000000");
})();