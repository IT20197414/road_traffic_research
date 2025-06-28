// form-validation.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        
        var emailValue = emailInput.value;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if email is valid
        if (!emailPattern.test(emailValue)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            event.preventDefault(); // Prevent form submission
            return;
        }
        
        // Check if name is provided
        if (nameInput.value.trim() === '') {
            alert('Please enter your name.');
            nameInput.focus();
            event.preventDefault(); // Prevent form submission
            return;
        }
        
        // Check if message exceeds 2000 characters
        if (messageInput.value.length > 2000) {
            alert('Message cannot exceed 2000 characters.');
            messageInput.focus();
            event.preventDefault(); // Prevent form submission
            return;
        }
    });
});
