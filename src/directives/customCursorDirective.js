export const customCursorDirective = {
  mounted(el, binding) {
    // Create the custom cursor element
    const cursor = document.createElement('div');
    
    cursor.classList.add('custom-cursor'); // Add class instead of inline styles
    cursor.classList.add('custom-cursor-'+binding.arg); // Add class instead of inline styles

    el.style.position = 'relative'; // Ensure the parent element has relative positioning
    el.style.cursor = 'none'; // Ensure the parent element has relative positioning
    el.appendChild(cursor); // Add cursor to the element

    // Handle mouse movement
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.left = `${x}px`; // Update position
      cursor.style.top = `${y}px`;
      cursor.classList.add('custom-cursor-visible'); // Show cursor on movement
    });

    // Hide cursor when mouse leaves the element
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor-visible'); // Hide cursor on leave
    });

    // Handle click event (expand effect)
    el.addEventListener('click', () => {
      cursor.classList.add('cursor-bubble-expand'); // Trigger expand effect
      setTimeout(() => {
        cursor.classList.remove('cursor-bubble-expand'); // Remove after animation
      }, 500);
    });

    // Load external CSS for animations
    import('../assets/css/customCursors.css').then(() => {
    });
  },
};
