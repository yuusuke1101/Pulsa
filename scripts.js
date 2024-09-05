// Nomor penerima pesan WhatsApp (admin)
const adminNumber = '+62895410057557';

// Fungsi untuk mengirim pesan WhatsApp
function sendWhatsAppMessage(message) {
    const url = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Menampilkan section yang sesuai berdasarkan kategori yang dipilih
document.getElementById('kategori').addEventListener('change', function() {
    const value = this.value;
    const sections = ['pulsaSection', 'ewalletSection', 'tokenListrikSection'];

    // Sembunyikan semua section
    sections.forEach(section => {
        document.getElementById(section).classList.add('d-none');
    });

    // Tampilkan section yang sesuai
    if (value) {
        document.getElementById(value).classList.remove('d-none');
    }
});

// Fungsi untuk menghandle pengiriman pesan berdasarkan form yang disubmit
function handleFormSubmission(event, type) {
    event.preventDefault();

    let message = '';
    let nominal = '';
    let harga = 0;

    if (type === 'pulsa') {
        const provider = document.getElementById('provider').value;
        nominal = document.getElementById('nominal-pulsa').value;
        const nomorHp = document.getElementById('nomor-hp').value;
        harga = parseInt(nominal) + 4000;

        // Buat pesan untuk top up pulsa
        message = `Permintaan Top up: Pulsa\nJenis: ${provider}\nNominal: ${nominal} seharga Rp${harga}\nKe nomor: ${nomorHp}`;
    } else if (type === 'ewallet') {
        const ewallet = document.getElementById('ewallet').value;
        nominal = document.getElementById('nominal-ewallet').value;
        const nomorEwallet = document.getElementById('nomor-ewallet').value;
        harga = parseInt(nominal) + 4000;

        // Buat pesan untuk top up e-wallet
        message = `Permintaan Top up: E-Wallet\nJenis: ${ewallet}\nNominal: ${nominal} seharga Rp${harga}\nKe nomor: ${nomorEwallet}`;
    } else if (type === 'tokenListrik') {
        nominal = document.getElementById('nominal-token').value;
        const idPln = document.getElementById('id-pln').value;
        const nomorWhatsapp = document.getElementById('nomor-whatsapp').value;
        harga = parseInt(nominal) + 4000;

        // Buat pesan untuk pembelian token listrik
        message = `Permintaan pembelian Token Listrik\nID Pelanggan: ${idPln}\nNominal: ${nominal} seharga Rp${harga}\nNomor penerima token: ${nomorWhatsapp}`;
    }

    // Kirim pesan WhatsApp
    sendWhatsAppMessage(message);

    // Tampilkan alert sukses
    alert(`Permintaan ${type === 'tokenListrik' ? 'pembelian token listrik' : 'top up ' + type} berhasil!`);
}

// Event listener untuk form pembelian pulsa
document.getElementById('pulsaForm').addEventListener('submit', function(event) {
    handleFormSubmission(event, 'pulsa');
});

// Event listener untuk form top up e-wallet
document.getElementById('ewalletForm').addEventListener('submit', function(event) {
    handleFormSubmission(event, 'ewallet');
});

// Event listener untuk form pembelian token listrik
document.getElementById('tokenListrikForm').addEventListener('submit', function(event) {
    handleFormSubmission(event, 'tokenListrik');
});