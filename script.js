const fbURL = "https://www.facebook.com/groups/243562089411829/?ref=share&mibextid=NSMWBT";
const igURL = "https://www.instagram.com/widowscare?igsh=MW5zajNpMWZ3NzA2ag==";

function toggleMenu() {
    const links = document.getElementById('nav-links');
    const toggle = document.getElementById('mobile-toggle');
    if (!links || !toggle) return;

    const isOpen = links.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isOpen));
}

function setAmount(val) {
    const event = window.event;
    const customField = document.getElementById('customAmount');
    if (customField) customField.value = val;

    const btns = document.querySelectorAll('.t-btn');
    btns.forEach((button) => button.classList.remove('active'));

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

function toggleGallery() {
    const content = document.getElementById('gallery-content');
    const btn = document.getElementById('gallery-toggle-btn');
    if (!content || !btn) return;

    const isHidden = content.classList.toggle('gallery-hidden');
    btn.setAttribute('aria-expanded', String(!isHidden));

    if (isHidden) {
        btn.innerHTML = '<i class="fas fa-th-large"></i> Explore Our Work';
        btn.style.background = 'var(--primary)';
    } else {
        btn.innerHTML = '<i class="fas fa-times"></i> Hide Gallery';
        btn.style.background = 'var(--accent)';
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function copyAcc() {
    const acc = document.getElementById('accNum')?.innerText;
    if (!acc) return;

    navigator.clipboard.writeText(acc).then(() => {
        const copyBtn = document.querySelector('.copy-trigger');
        if (!copyBtn) return;
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(() => {
        alert('Could not copy. Please select and copy manually.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const fbLink = document.getElementById('fb-link');
    const igLink = document.getElementById('ig-link');

    if (fbLink) fbLink.href = fbURL;
    if (igLink) igLink.href = igURL;

    const announcementModal = document.getElementById('announcement-modal');
    if (announcementModal) {
        const seenKey = 'widowscare_wicco_announcement_seen';
        const shouldShow = !localStorage.getItem(seenKey);

        const dismissAnnouncement = () => {
            announcementModal.classList.remove('active');
            document.body.classList.remove('modal-open');
            try {
                localStorage.setItem(seenKey, 'true');
            } catch (error) {
                console.warn('Announcement dismissal could not persist.', error);
            }
        };

        if (shouldShow) {
            announcementModal.classList.add('active');
            document.body.classList.add('modal-open');
        }

        const closeButton = document.querySelector('.announcement-close');
        closeButton?.addEventListener('click', dismissAnnouncement);

        announcementModal.addEventListener('click', (event) => {
            if (event.target === announcementModal) {
                dismissAnnouncement();
            }
        });

        const learnMoreButton = document.querySelector('.announcement-button');
        learnMoreButton?.addEventListener('click', () => {
            dismissAnnouncement();
        });
    }

    const countdownWrap = document.getElementById('countdown');
    if (countdownWrap) {
        const targetDate = new Date('2026-11-29T00:00:00');
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                countdownWrap.innerHTML = '<div class="countdown-item"><span>10</span><small>Years</small></div>';
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    const form = document.getElementById('intentForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('donorName').value;
            const email = document.getElementById('donorEmail').value;
            const amount = document.getElementById('customAmount').value;

            const formattedAmount = amount ? `₦${Number(amount).toLocaleString()}` : 'a custom amount';
            const message = `WICO Support Interest:\n\nName: ${name}\nEmail: ${email}\nIntended Support: ${formattedAmount}\n\nPlease guide me on the next steps.`;

            window.open(`https://wa.me/2348136324180?text=${encodeURIComponent(message)}`, '_blank');
        });
    }
});

