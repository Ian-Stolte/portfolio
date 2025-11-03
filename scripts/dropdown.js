
const dd = document.getElementById('dropdown');
const ddTop = document.getElementById('dropdown-top');

// Toggle menu open/close when the trigger is clicked
ddTop.addEventListener('click', e => {
    e.stopPropagation();
    console.log('Dropdown top clicked');
    dd.classList.add('open');
});

// Close the menu when clicking outside
document.addEventListener('click', e => {
    if (!dd.contains(e.target)) 
        dd.classList.remove('open');
});