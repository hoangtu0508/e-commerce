window.addEventListener('beforeunload', (event) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
        event.preventDefault();
        navigate('/admin');
    }
});