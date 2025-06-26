document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const numberOfStars = stars.length;

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(function() {
            updateStarsOnScroll();
        });
    });

    // Function to update star positions and sizes based on scroll
    function updateStarsOnScroll() {
        const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const maxZoom = 2.8;
        const zoomFactor = 1 + (scrollPercentage * (maxZoom - 1));
        const centerX = 50;
        const centerY = 50;

        stars.forEach((star, index) => {
            const initialSize = parseFloat(star.dataset.initialSize);
            const originalX = parseFloat(star.dataset.originalX);
            const originalY = parseFloat(star.dataset.originalY);
            const visibilityThreshold = numberOfStars * (1 - scrollPercentage * 0.5);

            if (index < visibilityThreshold) {
                if (star.style.display === 'none') {
                    star.style.display = 'block';
                }

                const newSize = initialSize * zoomFactor;
                star.style.width = `${newSize}px`;
                star.style.height = `${newSize}px`;

                const deltaX = originalX - centerX;
                const deltaY = originalY - centerY;
                const zoomX = originalX + (deltaX * scrollPercentage * 0.2);
                const zoomY = originalY + (deltaY * scrollPercentage * 0.2);

                star.style.left = `${zoomX}%`;
                star.style.top = `${zoomY}%`;
            } else if (star.style.display !== 'none') {
                star.style.display = 'none';
            }
        });
    }
});