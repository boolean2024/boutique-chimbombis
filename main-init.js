// SCRIPT PRINCIPAL

// Modo selector
function selectMode(mode) {
    const modeSelector = document.getElementById('modeSelector');
    modeSelector.classList.add('inactive');
    
    if (mode === 'buyer') {
        document.getElementById('buyerMode').style.display = 'block';
        document.getElementById('adminMode').style.display = 'none';
        setTimeout(async () => await initBuyer(), 300);
        loadCart();
        updateCartUI();
    } else if (mode === 'admin') {
        document.getElementById('buyerMode').style.display = 'none';
        document.getElementById('adminMode').style.display = 'block';
        setTimeout(async () => await initAdmin(), 300);
    }
}

// Volver al selector
function backToMode() {
    document.getElementById('buyerMode').style.display = 'none';
    document.getElementById('adminMode').style.display = 'none';
    document.getElementById('modeSelector').classList.remove('inactive');
    document.getElementById('productForm').reset();
    closeAddProductModal();
    closeProductModal();
}

// Notificación
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    setTimeout(() => {
        notification.style.transform = 'translateX(500px)';
    }, 2000);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 0);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Boutique Chimbombis cargada');
});
