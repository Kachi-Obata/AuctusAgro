// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded');

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  console.log('Hamburger element:', hamburger);
  console.log('Nav links element:', navLinks);

  if (!hamburger || !navLinks) {
    console.error('Could not find hamburger or nav-links elements');
    return;
  }

  // Toggle menu
  hamburger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Hamburger clicked');

    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';

    console.log('Menu is now:', this.classList.contains('active') ? 'open' : 'closed');
  });

  // Close menu when clicking a link
  const navLinksItems = navLinks.querySelectorAll('a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', function () {
      console.log('Nav link clicked');
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
      console.log('Clicked outside, closing menu');
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Handle resize - close menu if switching to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && navLinks.classList.contains('active')) {
      console.log('Resized to desktop, closing menu');
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
        item.querySelector('.faq-icon').src = 'images/faqButton.svg';
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        faqItem.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
        faqItem.querySelector('.faq-icon').src = 'images/faqButtonOpened.svg';
      }
    });
  });
});