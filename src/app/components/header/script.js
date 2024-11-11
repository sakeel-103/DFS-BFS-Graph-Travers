const toggleButton = document.getElementById('toggle-dark-mode');

if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    console.log('toggled')
}

toggleButton.addEventListener('click', () => {
    
    document.body.classList.toggle('dark-mode');

    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        console.log('toggled')
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        console.log('toggled')
    }
});