// Function to check if an element is in view
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll event
function handleScroll() {
    const scrollUpButton = document.querySelector('.scroll-up');
    const keyTechHeading = document.querySelector('#key-technologies h2');
    
    // Calculate the threshold for showing the button
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.documentElement.scrollHeight - 200; // Adjust this value if needed

    // Show or hide the scroll-up button based on the scroll position
    if (scrollPosition >= threshold) {
        scrollUpButton.style.display = 'flex'; // Show button
    } else {
        scrollUpButton.style.display = 'none'; // Hide button
    }

    // Show or hide the key technologies heading based on its visibility
    if (isInView(keyTechHeading)) {
        keyTechHeading.classList.add('in-view');
    } else {
        keyTechHeading.classList.remove('in-view');
    }
}

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Run on page load to check initial view state
window.addEventListener('load', handleScroll);

// JavaScript for Smooth Scroll
document.addEventListener('DOMContentLoaded', function() {
    const scrollUpButton = document.querySelector('.scroll-up');
    
    // Add click event listener
    scrollUpButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    });
});
