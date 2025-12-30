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
}

// Support Form Selection
function setAmount(val) {
    const customField = document.getElementById('customAmount');
    customField.value = val;
    
    // UI highlight
    const btns = document.querySelectorAll('.t-btn');
    btns.forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Impact Gallery Toggle
function toggleGallery() {
    const content = document.getElementById('gallery-content');
    const btn = document.getElementById('gallery-toggle-btn');
    content.classList.toggle('gallery-hidden');
    
    btn.innerHTML = content.classList.contains('gallery-hidden') ? 
        '<i class="fas fa-th-large"></i> Explore Our Work' : 
        '<i class="fas fa-times"></i> Close Gallery';
}

// Copy Bank Account
function copyAcc() {
    const acc = document.getElementById('accNum').innerText;
    navigator.clipboard.writeText(acc).then(() => {
        alert("Account Number Copied!");
    });
}

// Form Submission to WhatsApp
document.getElementById('intentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('donorName').value;
    const amount = document.getElementById('customAmount').value;
    const msg = `WICO Support Interest:\nName: ${name}\nAmount: ₦${amount}`;
    window.open(`https://wa.me/2348136324180?text=${encodeURIComponent(msg)}`, '_blank');
});