// scrollbar
const grid  = document.getElementById('bs-grid');
const track = document.getElementById('bs-track');
const thumb = document.getElementById('bs-thumb');

function updateThumb() {
    const { scrollLeft, scrollWidth, clientWidth } = grid;
    const scrollable = scrollWidth - clientWidth;
    const ratio      = scrollable > 0 ? scrollLeft / scrollable : 0;
    const thumbPct   = Math.max(10, (clientWidth / scrollWidth) * 100);
    thumb.style.width = thumbPct + '%';
    thumb.style.left  = (ratio * (100 - thumbPct)) + '%';
}

updateThumb();
window.addEventListener('resize', updateThumb);
grid.addEventListener('scroll', updateThumb, { passive: true });

// track it
track.addEventListener('click', (e) => {
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    grid.scrollLeft = ratio * (grid.scrollWidth - grid.clientWidth);
});

// drag it
let dragging = false, startX = 0, startScroll = 0;
thumb.style.pointerEvents = 'auto';
thumb.addEventListener('mousedown', (e) => {
    dragging = true; startX = e.clientX; startScroll = grid.scrollLeft;
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const delta = (e.clientX - startX) / track.offsetWidth * grid.scrollWidth;
    grid.scrollLeft = Math.max(0, Math.min(grid.scrollWidth - grid.clientWidth, startScroll + delta));
});

document.addEventListener('mouseup', () => { dragging = false; });

// show more
function bsToggle() {
    const btn  = document.getElementById('bs-show-more');
    const open = btn.dataset.open === 'true';
    document.querySelectorAll('.hidden-mobile').forEach(el => {
        el.classList.toggle('revealed', !open);
    });
    btn.dataset.open  = !open;
    btn.textContent   = open ? 'Show More' : 'Show Less';
}