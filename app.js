import products from "./products";

const div = document.querySelector('.slogan'); 
const text = `Where future meets fashion...`;

const typingEffect = (element, text, idx = 0) => {
    if (idx === 0) {
        element.textContent = '';
    }

    element.textContent += text[idx];

    // If the function reaches the end of the string
    if (idx === text.length - 1) {
        return;
    }

    setTimeout(() => typingEffect(element, text, idx + 1), 200);
}

typingEffect(div, text);

const welcomingVideo = () => {
    // Select existing overlay and video elements
    const overlay = document.querySelector('.overLay');
    const landingOverlay = document.querySelector('.landingOverlay');
    const logbg = document.querySelector('.bglog');
    const bod = document.querySelector('#hid');

    // Show the overlay and video when the page loads
    setTimeout(() => {
        overlay.style.display = "block";
        logbg.style.display = "block";
        landingOverlay.style.display = "none"
        bod.style.overflow = "hidden";
    }, 500); // Small delay for smooth appearance

    // Hide the overlay and video after 20 seconds
    setTimeout(() => {
        overlay.style.display = "none";
        logbg.style.display = "none";
        landingOverlay.style.display = "block"
        bod.style.overflow = "scroll";

        
     // 20 seconds in milliseconds (20000ms)
    }, 20000); 
};

document.addEventListener('DOMContentLoaded', welcomingVideo);


//RENDER ITEMS DYNAMIC FROM THE DATA I HAVE BUILT SO THAT I CAN ALSO BE ABLE TO CREAT A FILTER FUNCTION
