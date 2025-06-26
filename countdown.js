document.addEventListener('DOMContentLoaded', function() {
// Countdown Timer Functions
function triggerapplyPageEffect() {
    const choiceContainer = document.getElementById('choiceContainer');
    choiceContainer.classList.add('visible');
    document.getElementById('countdown').classList.add('visible');
    startCountdown();
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date('2025-08-01T07:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            countdownElement.textContent = "Event has started!";
            return;
        }

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the countdown
        countdownElement.textContent = 
            `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }

    // Update immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Store the interval ID on the window object so we can clear it if needed
    window.countdownInterval = countdownInterval;
}

// Initialize when DOM is ready

    // Remove any existing countdown interval when the page loads
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
});