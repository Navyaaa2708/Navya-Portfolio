document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('active');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

function selectedChips(containerId) {
  const selected = [...document.querySelectorAll(`#${containerId} .chip.active`)];
  return selected.map((chip) => chip.dataset.v).join(', ');
}

function submitLead() {
  const name = document.getElementById('f-name').value.trim();
  const company = document.getElementById('f-company').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const message = document.getElementById('f-message').value.trim();

  if (!name || !email || !phone || !message) {
    alert('Please fill required fields: name, email, phone, and message.');
    return;
  }

  const body = [
    'Hello Navya,',
    '',
    `Name: ${name}`,
    `Company: ${company || 'Not provided'}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Role type: ${selectedChips('chips-role') || 'Not selected'}`,
    `Focus areas: ${selectedChips('chips-focus') || 'Not selected'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const mailto = `mailto:navyaachanti7@gmail.com?subject=${encodeURIComponent('Recruiter enquiry for Navya Achanti')}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  document.getElementById('formArea').style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';
}