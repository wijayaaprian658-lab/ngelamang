const nav = document.querySelector('nav');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Nav Toggle
burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile nav when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Scroll Animation using Intersection Observer
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        observer.unobserve(entry.target);
    });
}, observerOptions);

// Select elements to animate
const cards = document.querySelectorAll('.card, .beach-card, .service-card, .culture-split');

// Apply initial styles and observe
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});


// Modal Logic
const modal = document.getElementById('detail-modal');
const closeBtn = document.querySelector('.close-btn');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalMapBtn = document.getElementById('modal-map-btn');

// Data Deskripsi Lengkap (Bisa ditambah/diedit)
const destinationDetails = {
    "Gunung Rinjani": "Gunung Rinjani adalah gunung berapi tertinggi kedua di Indonesia dan primadona wisata Lombok. Pendakian ke puncaknya menawarkan tantangan sekaligus keindahan luar biasa, mulai dari savana, hutan tropis, hingga Danau Segara Anak yang magis di kawahnya. Pemandangan matahari terbit dari puncak adalah pengalaman yang tak terlupakan seumur hidup.",
    "Bukit Sempana": "Bukit Sempana menawarkan salah satu pemandangan terbaik ke arah Gunung Rinjani. Jalurnya yang menanjak curam terbayar lunas dengan hamparan savana hijau dan udara sejuk di puncaknya. Sangat cocok bagi pendaki yang ingin menikmati keindahan Rinjani tanpa harus mendaki puncaknya.",
    "Bukit Kondo": "Sering disebut sebagai tempat 'camping ceria' favorit, Bukit Kondo menawarkan pemandangan Rinjani yang megah dan selat Alas. Jalur pendakiannya relatif ramah bagi pemula, menjadikannya pilihan tepat untuk akhir pekan.",
    "Bukit Pergasingan": "Bukit ini terkenal dengan petak-petak sawah Sembalun yang terlihat berwarna-warni dari ketinggian. Tempat ini adalah spot populer untuk melihat sunrise dan berkemah santai.",
    "Benang Kelambu": "Berbeda dengan air terjun biasa, air di Benang Kelambu keluar dari celah-celah tanaman merambat, menciptakan tirai air yang sangat halus dan instagramable. Udaranya sangat sejuk dan hutannya masih asri.",
    "Tiu Kelep": "Air terjun megah di kaki Gunung Rinjani ini memiliki kolam alami di bawahnya yang bisa digunakan untuk berenang. Mitos lokal mengatakan, mandi di sini bisa membuat awet muda.",
    "Pantai Kuta Mandalika": "Pusat pariwisata baru di Lombok Tengah. Selain pasirnya yang putih seperti merica, area ini kini dilengkapi dengan sirkuit MotoGP kelas dunia dan pedestrian yang rapi, namun tetap mempertahankan keaslian pantainya.",
    "Pink Beach": "Salah satu dari sedikit pantai berpasir merah muda di dunia. Warna pink ini berasal dari serpihan karang merah yang bercampur pasir putih. Airnya sangat jernih dan tenang, sempurna untuk snorkeling.",
    "Gili Trawangan": "Pulau pesta dan relaksasi. Gili Trawangan bebas dari kendaraan bermotor, menawarkan suasana pulau tropis yang santai dengan kehidupan malam yang meriah, sunset point yang ikonik, dan spot snorkeling dengan penyu.",
    "Sade Village": "Desa adat Suku Sasak yang masih mempertahankan tradisi leluhur. Di sini Anda bisa melihat rumah adat 'Bale Tani' yang lantainya dilapisi kotoran kerbau, serta proses pembuatan kain tenun ikat tradisional."
};

// Add click event to all relevant cards
// Note: We use a slightly more specific selector/logic to avoid selecting non-destination cards if any
const destinationCards = document.querySelectorAll('.card, .beach-card');

destinationCards.forEach(card => {
    // Add pointer cursor to indicate clickability
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
        // 1. Get basic info from card
        const imgElement = card.querySelector('img');
        const titleElement = card.querySelector('h3');
        const descElement = card.querySelector('p');

        if (!imgElement || !titleElement) return; // Safety check

        const img = imgElement.src;
        const title = titleElement.innerText;
        const shortDesc = descElement ? descElement.innerText : '';

        // Get Price and Detail Data
        const price = card.getAttribute('data-price') || 'Hubungi untuk penawaran terbaik';
        const detail = card.getAttribute('data-detail') || 'Fasilitas lengkap tersedia.';

        // Get Long Description from dictionary or fallback
        const longDesc = destinationDetails[title] ||
            `Nikmati keindahan alam ${title} yang mempesona. Destinasi ini menawarkan pengalaman liburan yang otentik di Lombok, cocok untuk Anda yang mencari petualangan maupun ketenangan. ${shortDesc}`;

        // 2. Populate Modal
        modalImg.src = img;
        modalTitle.innerText = title;

        // Construct structured modal content
        modalDesc.innerHTML = `
            <div class="destination-detail">
                <p class="long-desc">${longDesc}</p>
                <div class="highlights">
                    <h5>Kenapa Harus ke Sini?</h5>
                    <ul>
                        <li><i class="fas fa-star" style="color: #D4AF37;"></i> Pemandangan alam yang spektakuler</li>
                        <li><i class="fas fa-camera" style="color: #D4AF37;"></i> Spot foto instagramable</li>
                        <li><i class="fas fa-heart" style="color: #D4AF37;"></i> Pengalaman lokal yang otentik</li>
                    </ul>
                </div>
            </div>

            <div class="package-info-box">
                <div class="package-header-modal">
                    <i class="fas fa-tag"></i>
                    <h4>Paket Wisata Spesial</h4>
                </div>
                <div class="package-content-modal">
                    <div class="price-tag">${price}</div>
                    <p class="package-includes">${detail}</p>
                    <p class="note">*Harga dapat berubah sewaktu-waktu. Hubungi kami untuk detail custom.</p>
                </div>
            </div>
        `;

        // Set Map Link
        modalMapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ' Lombok')}`;

        // Set WhatsApp Link with specific message
        const waBtn = document.querySelector('.whatsapp-btn');
        if (waBtn) {
            waBtn.href = `https://wa.me/6287889183809?text=Halo,%20saya%20tertarik%20dengan%20paket%20wisata%20ke%20${encodeURIComponent(title)}.%20Bisa%20infokan%20detail%20harganya?`;
        }

        // 3. Show Modal
        modal.style.display = 'block';
    });
});

// Close Logic
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
