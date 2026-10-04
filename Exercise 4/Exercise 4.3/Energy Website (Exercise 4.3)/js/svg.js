function storyClick(numb, element) {
    
    document.querySelector(`#e${numb}`).classList.remove("hidden");
    document.querySelectorAll(`div.exercise:not(#e${numb})`).forEach(e => e.classList.add("hidden"));

    const slidingBg = document.getElementById('slid-bg');
    
    if (element && slidingBg) {
        slidingBg.style.width = `${element.offsetWidth}px`;
        slidingBg.style.transform = `translateX(${element.offsetLeft}px)`;
    }
}

// OPTIONAL: Run this on page load so the pill starts on the first button automatically
window.addEventListener('DOMContentLoaded', () => {
    const firstBtn = document.querySelector('.esvg-btn');
    if (firstBtn) {
        storyClick(1, firstBtn);
    }
});