// Social Media Links
const fbURL = "https://www.facebook.com/groups/243562089411829/?ref=share&mibextid=NSMWBT";
const igURL = "https://www.instagram.com/widowscare?igsh=MW5zajNpMWZ3NzA2ag==";

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set links to footer icons
    const fbLink = document.getElementById('fb-link');
    const igLink = document.getElementById('ig-link');
    
    if(fbLink) fbLink.href = fbURL;
    if(igLink) igLink.href = igURL;
});

// Navigation Toggle
function toggleMenu() {
    const links = document.getElementById('nav-links');
    links.classList.toggle('active');
    // Prevent scrolling when menu is open
    if (links.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Support Form Selection
function setAmount(val) {
    const event = window.event;
    const customField = document.getElementById('customAmount');
    customField.value = val;
    
    // UI highlight
    const btns = document.querySelectorAll('.t-btn');
    btns.forEach(b => b.classList.remove('active'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Impact Gallery Toggle
function toggleGallery() {
    const content = document.getElementById('gallery-content');
    const btn = document.getElementById('gallery-toggle-btn');
    
    content.classList.toggle('gallery-hidden');
    
    if (content.classList.contains('gallery-hidden')) {
        btn.innerHTML = '<i class="fas fa-th-large"></i> Explore Our Work';
        btn.style.background = 'var(--primary)';
    } else {
        btn.innerHTML = '<i class="fas fa-times"></i> Close Gallery';
        btn.style.background = 'var(--accent)';
        // Smooth scroll to gallery start when opened
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Copy Bank Account
function copyAcc() {
    const acc = document.getElementById('accNum').innerText;
    navigator.clipboard.writeText(acc).then(() => {
        const copyBtn = document.querySelector('.copy-trigger');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        alert("Could not copy. Please select and copy manually.");
    });
}

// Form Submission to WhatsApp
document.getElementById('intentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const amount = document.getElementById('customAmount').value;
    
    const formattedAmount = amount ? `₦${Number(amount).toLocaleString()}` : "a custom amount";
    
    const msg = `WICO Support Interest:\n\nName: ${name}\nEmail: ${email}\nIntended Support: ${formattedAmount}\n\nPlease guide me on the next steps.`;
    
    window.open(`https://wa.me/2348136324180?text=${encodeURIComponent(msg)}`, '_blank');
});
