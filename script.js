// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal elements as they enter the screen
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Portfolio category filters
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

// Contact form: creates an email draft using the visitor's default email app.
// Replace the address below with your real professional email before publishing.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const destinationEmail = 'YOUR_EMAIL@example.com';
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry: ${data.get('project')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${data.get('project')}\n\nMessage:\n${data.get('message')}`
  );
  if (destinationEmail === 'YOUR_EMAIL@example.com') {
    formNote.textContent = 'Setup needed: replace YOUR_EMAIL@example.com in index.html and script.js with your real email address.';
    return;
  }
  window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
