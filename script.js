// 1. Hamburger Menu untuk Layar HP
const hamburger = id('hamburger');
const navMenu = id('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

function id(e) { return document.getElementById(e); }

// 2. Dark Mode Toggle
const themeToggle = id('theme-toggle');
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// 3. Effect Ketik Otomatis (Typing Effect)
const words = ["Freelancer", "Video Editor", "Desain Grafis", "UI/UX Designer", "Humas Marketing", "Konten Kreator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
typeEffect();

// 4. Filter Proyek
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 5. Validasi Form Kontak
const contactForm = id('contact-form');
const formStatus = id('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.style.color = 'green';
    formStatus.textContent = 'Pesan Anda berhasil dikirim!';
    contactForm.reset();
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Masukkan nomor WhatsApp Anda (format 62...)
    const phoneNumber = "6285866980352"; 

    // Ambil nilai dari input form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Susun pesan mentah (Gunakan * tunggal untuk teks tebal di WA)
    const rawText = `Halo Feri, saya *${name}* (${email}).\n\n*Pesan:*\n${message}`;

    // Encode teks agar spasi, enter (\n), dan simbol khusus aman di URL
    const encodedText = encodeURIComponent(rawText);

    // Buat URL WhatsApp
    const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');
});