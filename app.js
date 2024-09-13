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
    const logbg = document.querySelector('.bglog');

    // Show the overlay and video when the page loads
    setTimeout(() => {
        overlay.style.display = "block";
        logbg.style.display = "block";
    }, 500); // Small delay for smooth appearance

    // Hide the overlay and video after 20 seconds
    setTimeout(() => {
        overlay.style.display = "none";
        logbg.style.display = "none";
    }, 12000); // 20 seconds in milliseconds (20000ms)
};

document.addEventListener('DOMContentLoaded', welcomingVideo);
