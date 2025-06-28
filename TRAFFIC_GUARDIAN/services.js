//image slideshow javascript
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}


//key parameter menu collaspe and expand
document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.collapsible-container');

    containers.forEach(container => {
        const header = container.querySelector('.collapsible-header');
        const toggle = header.querySelector('.collapsible-toggle');
        const content = container.querySelector('.collapsible-content');

        // Toggle visibility on click
        header.addEventListener('click', function () {
            if (content.style.display === 'block') {
                content.style.display = 'none';
                toggle.innerHTML = '&#9662;'; // Down arrow
            } else {
                content.style.display = 'block';
                toggle.innerHTML = '&#9652;'; // Up arrow
            }
        });
    });
});


//faq collaspe and expand
function toggleFaq(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.arrow');

    if (content.style.display === 'block') {
        content.style.display = 'none';
        arrow.classList.remove('rotate');
    } else {
        content.style.display = 'block';
        arrow.classList.add('rotate');
    }
}
