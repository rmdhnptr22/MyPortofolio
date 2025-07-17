// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// Ketika Humberger menu  di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
})

//Clear form before unpload
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
}

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', 
  database: 'Db_Portofolio',
  password: 'jombangsantri22', 
  port: 5432,
});

// Endpoint menerima pesan dari form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
     'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.status(200).send('Pesan berhasil disimpan');
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Terjadi kesalahan saat menyimpan data');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
