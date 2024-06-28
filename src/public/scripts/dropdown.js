document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-container').forEach((container) => {
    const toggleButton = container.querySelector('.dropdown-toggle-button');
    const contentContainer = container.querySelector('.dropdown-content-container');
    if (!toggleButton || !contentContainer) {
      console.error('Dropdown container setup failed.');
      return;
    }

    const toggleDropdown = () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', !isExpanded);
      container.classList.toggle('open', !isExpanded);
    };

    const closeDropdown = (e) => {
      if (e.key === 'Escape' && container.classList.contains('open')) {
        toggleButton.setAttribute('aria-expanded', 'false');
        container.classList.remove('open');
      }
    };

    toggleButton.addEventListener('click', toggleDropdown);
    document.addEventListener('keydown', closeDropdown);

    // Add 'dropdown-option' class to children of contentContainer
    [...contentContainer.children].forEach((child) => child.classList.add('dropdown-option'));
  });
});
