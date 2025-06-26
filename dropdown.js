document.addEventListener('DOMContentLoaded', function() {
    // Target all regular-box elements
    const regularBoxes = document.querySelectorAll('.regular-box');
    
    regularBoxes.forEach(box => {
        const question = box.querySelector('.question');
        const answer = box.querySelector('.answer');
        const icon = box.querySelector('.dropdown-icon');
        
        // Add click event to the entire box
        box.addEventListener('click', function(e) {
            // Prevent event bubbling if clicking on links within the answer
            if (e.target.tagName === 'A') {
                return;
            }
            
            const isActive = answer.classList.contains('active');
            
            if (isActive) {
                // Close this FAQ
                answer.classList.remove('active');
                icon.classList.remove('active');
            } else {
                // Close all other regular-box FAQs first
                document.querySelectorAll('.regular-box .answer.active').forEach(activeAnswer => {
                    activeAnswer.classList.remove('active');
                });
                document.querySelectorAll('.regular-box .dropdown-icon.active').forEach(activeIcon => {
                    activeIcon.classList.remove('active');
                });
                
                // Open this FAQ
                answer.classList.add('active');
                icon.classList.add('active');
            }
        });
        
        // Add cursor pointer to the entire box when closed
        box.style.cursor = 'pointer';
        
        // Update cursor based on state
        function updateCursor() {
            if (answer.classList.contains('active')) {
                box.style.cursor = 'default';
                question.style.cursor = 'pointer';
            } else {
                box.style.cursor = 'pointer';
                question.style.cursor = 'pointer';
            }
        }
        
        // Initial cursor setup
        updateCursor();
        
        // Update cursor when state changes
        const observer = new MutationObserver(updateCursor);
        observer.observe(answer, { attributes: true, attributeFilter: ['class'] });
    });
});