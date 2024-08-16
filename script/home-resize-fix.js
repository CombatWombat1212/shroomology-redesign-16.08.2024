document.addEventListener('DOMContentLoaded', function() {
    // Check if the current path is the home page
    if (window.location.pathname === '/') {
        // Wait for 500ms
        setTimeout(function() {
            // Trigger a resize event
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }
});
