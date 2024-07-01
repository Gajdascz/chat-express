document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-container').forEach((container) => {
    const toggleButton = container.querySelector('.dropdown-toggle-button');
    const contentContainer = container.querySelector('.dropdown-content-container');
    if (!toggleButton || !contentContainer) {
      console.error('Dropdown container setup failed.');
      return;
    }

    const openDropdown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleButton.setAttribute('aria-expanded', 'true');
      container.classList.toggle('open', 'true');
      document.addEventListener('keydown', closeDropdown);
      document.addEventListener('click', closeDropdown);
      toggleButton.removeEventListener('click', openDropdown);
    };

    const closeDropdown = (e) => {
      if ((e.key === 'Escape' || e.type === 'click') && container.classList.contains('open')) {
        toggleButton.setAttribute('aria-expanded', 'false');
        container.classList.remove('open');
        document.removeEventListener('keydown', closeDropdown);
        document.removeEventListener('click', closeDropdown);
        toggleButton.addEventListener('click', openDropdown);
      }
    };

    toggleButton.addEventListener('click', openDropdown);

    // Add 'dropdown-option' class to children of contentContainer
    [...contentContainer.children].forEach((child) => child.classList.add('dropdown-option'));
  });
});
