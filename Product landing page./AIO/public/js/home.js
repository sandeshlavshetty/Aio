const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  navbar.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    links.forEach((link, index) => {
      link.style.transition = 'none';
      link.style.opacity = '0';
      link.style.transform = 'translateX(-50px)';
      setTimeout(() => {
        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, index * 100);
    });
  }
});

// Function to check if an element is in the viewport
// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
//   }
  
//   // Function to handle card animation
//   function handleCardAnimation() {
//     const cards = document.querySelectorAll('.card');
  
//     cards.forEach((card) => {
//       if (isInViewport(card)) {
//         card.classList.add('fade-in');
//       }
//     });
//   }
 window.addEventListener('scroll', handleCardAnimation);

function scrollToElement(elementId) {
    const elements = document.getElementsByClassName(elementId);
  
    if (elements.length > 0) {
      elements[0].scrollIntoView({ behavior: 'smooth' });
    }
}