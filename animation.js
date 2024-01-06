document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    var navBar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    // Close the menu when a link is clicked
    var navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navBar.classList.remove('active');
        });
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.navbar, #menu-icon')) {
            navBar.classList.remove('active');
        }
    });
});
// Constructor function for TxtType
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate; // Array of strings to rotate
    this.el = el; // HTML element where the typing effect will be applied
    this.loopNum = 0; // Counter for tracking the current string in the rotation
    this.period = parseInt(period, 10) || 2000; // Time delay between rotations (default: 2000 milliseconds)
    this.txt = ''; // Current text being typed
    this.tick(); // Call the tick method to start the typing animation
    this.isDeleting = false; // Boolean flag to indicate whether characters are being deleted
};


// Prototype method for the TxtType object
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length; // Get the current index in the rotation array
    var fullTxt = this.toRotate[i]; // Get the full text for the current rotation

    if (this.isDeleting) {
        // If characters are being deleted, remove the last character from the current text
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // If characters are being added, add the next character to the current text
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Set the inner HTML of the target element to display the current text with a wrapping span
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100; // Randomize the typing speed slightly

    if (this.isDeleting) {
        delta /= 2; // If deleting, slow down the process
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        // If not deleting and the full text is typed, set a pause before starting to delete
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        // If deleting and all characters are deleted, move to the next string in rotation
        this.isDeleting = false;
        this.loopNum++;
        delta = 500; // Pause before typing the next string
    }

    // Call the tick method again after a calculated delay (delta)
    setTimeout(function() {
        that.tick();
    }, delta);
};


// Event handler for when the window has finished loading
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite'); // Get elements with the class 'typewrite'
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type'); // Get the data-type attribute value
        var period = elements[i].getAttribute('data-period'); // Get the data-period attribute value
        if (toRotate) {
            // If data-type attribute is present, create a new TxtType instance for the element
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

//keyboard effect
const keys = document.querySelectorAll(".key");

function pressRandomKey() {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    randomKey.style.animation = "pressDown 0.2s ease-in-out";

    randomKey.onanimationend = () => {
        randomKey.style.animation = "";
        setTimeout(pressRandomKey, 100 + Math.random() * 300);
    };
}
pressRandomKey();