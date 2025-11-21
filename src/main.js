import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
// Import Font Awesome
// import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import LoginPage from './pages/LoginPage.vue'

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
import RegisterPage from './pages/RegisterPage.vue';

// ✅ Icon langsung di-import
import homeIcon from './assets/family-life.gif'
import daftarIcon from './assets/checklist.gif'
import kalenderIcon from './assets/friendship-day.gif'
import fotoIcon from './assets/photo-gallery.gif'
import rekapIcon from './assets/files.gif'

// ✅ Rute dengan icon benar (tanpa tanda kutip di variabel)
const routes = [
  { path: '/', name: 'HalUtama', component: HalUtama},
  { path: '/pricelist', name: 'Pricelist', component: PriceList },
  { path: '/about', name: 'About', component: About },
  { path: '/kontak', name: 'Kontak', component: Kontak },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
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
  const loggedIn = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !loggedIn) {
    // Jika rute memerlukan auth dan tidak ada token, redirect ke login
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && loggedIn) {
    // Jika user sudah login dan mencoba mengakses halaman login/register, redirect ke home
    next('/home');
  } else {
    // Lanjutkan navigasi
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
