import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import LoginPage from './components/LoginPage.vue'

// ✅ Folder "halaman"
import Home from './pages/hal-admin/Home.vue'
import DaftarBooking from './pages/hal-admin/DaftarBooking.vue'
import Kalender from './pages/hal-admin/Kalender.vue'
import PaketFoto from './pages/hal-admin/PaketFoto.vue'
import RekapBooking from './pages/hal-admin/RekapBooking.vue'
import HalUtama from './pages/hal-cust/HalUtama.vue'
import PriceList from './pages/hal-cust/PriceList.vue'
import About from './pages/hal-cust/About.vue'
import Kontak from './pages/hal-cust/Kontak.vue'

// ✅ Icon langsung di-import
import homeIcon from './assets/family-life.gif'
import daftarIcon from './assets/checklist.gif'
import kalenderIcon from './assets/friendship-day.gif'
import fotoIcon from './assets/photo-gallery.gif'
import rekapIcon from './assets/files.gif'

import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

// ✅ Rute dengan icon benar (tanpa tanda kutip di variabel)
const routes = [
  { path: '/', name: 'HalUtama', component: HalUtama},
  { path: '/pricelist', name: 'Pricelist', component: PriceList },
  { path: '/about', name: 'About', component: About },
  { path: '/kontak', name: 'Kontak', component: Kontak },
  { path: '/login', name: 'Login', component: LoginPage },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      subtitle: 'Ringkasan Halaman Utama',
      icon: homeIcon,
      requiresAuth: true
    }
  },
  {
    path: '/daftarBooking',
    name: 'DaftarBooking',
    component: DaftarBooking,
    meta: {
      title: 'Daftar Booking Customer',
      subtitle: 'Lihat dan kelola jadwal yang telah dibooking oleh pelanggan',
      icon: daftarIcon,
      requiresAuth: true
    }
  },
  {
    path: '/kalender',
    name: 'Kalender',
    component: Kalender,
    meta: {
      title: 'Kalender Booking',
      subtitle: 'Tanggal dan waktu booking customer',
      icon: kalenderIcon,
      requiresAuth: true
    }
  },
  {
    path: '/paketfoto',
    name: 'PaketFoto',
    component: PaketFoto,
    meta: {
      title: 'Paket Foto',
      subtitle: 'Jelajahi pilihan paket foto yang tersedia untuk pelanggan',
      icon: fotoIcon,
      requiresAuth: true
    }
  },
  {
    path: '/rekapbooking',
    name: 'RekapBooking',
    component: RekapBooking,
    meta: {
      title: 'Rekap Booking Customer',
      subtitle: 'Data Booking Customer yang telah dibooking',
      icon: rekapIcon,
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard untuk melindungi halaman yang memerlukan autentikasi
router.beforeEach((to, from, next) => {
  // Cek apakah halaman yang diakses memerlukan autentikasi
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Cek status autentikasi user
  onAuthStateChanged(auth, (user) => {
    // Jika halaman yang diakses memerlukan autentikasi
    if (requiresAuth) {
      // Jika user sudah login
      if (user) {
        if (to.path === '/login') {
          // Jika urlnya /login, redirect ke halaman home
          next('/home');
        } else {
          // Jika urlnya bukan /login, lanjutkan ke halaman yang diakses
          next();
        }
      } else {
        // Jika user belum login, redirect ke halaman login
        next('/login');
      }
    } else { // Jika halaman yang diakses tidak memerlukan autentikasi
      // Jika user sudah login dan urlnya /login, redirect ke halaman home
      if(user && to.path === '/login') {
        next('/home');
      } else {
        // Jika urlnya bukan /login, lanjutkan ke halaman yang diakses
        next();
      }
    }
  }, () => {
    // Error dalam pengecekan auth, redirect ke login
    next('/login');
  });
});

const app = createApp(App);
app.use(router);
app.mount('#app');
