import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import LoginPage from './components/LoginPage.vue'

// ✅ Folder "layoutt"
import DashboardPage from './components/DashboardPage.vue'

// ✅ Folder "halaman"
import Home from './pages/hal-admin/Home.vue'
import DaftarBooking from './pages/hal-admin/DaftarBooking.vue'
import Kalender from './pages/hal-admin/Kalender.vue'
import PaketFoto from './pages/hal-admin/PaketFoto.vue'
import RekapBooking from './pages/hal-admin/RekapBooking.vue'
import HalUtama from './pages/hal-cust/HalUtama.vue'
import PriceList from './pages/hal-cust/PriceList.vue'
import About from './pages/hal-cust/About.vue'


import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

// router setup tetap sama seperti sebelumnya...


// Rute
const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      subtitle: 'Ringkasan Halaman Utama'
    }
  },
  {
    path: '/daftarBooking',
    name: 'DaftarBooking',
    component: DaftarBooking,
    meta: {
      title: 'Daftar Booking Customer',
      subtitle: 'Lihat dan kelola jadwal yang telah dibooking oleh pelanggan'
    }
  },
  {
    path: '/kalender',
    name: 'Kalender',
    component: Kalender,
    meta: {
      title: 'Kalender Booking',
      subtitle: 'Tanggal dan waktu booking customer'
    }
  },
  {
    path: '/paketfoto',
    name: 'PaketFoto',
    component: PaketFoto,
    meta: {
      title: 'Paket Foto',
      subtitle: 'Jelajahi pilihan paket foto yang tersedia untuk pelanggan'
    }
  },
  {
    path: '/rekapbooking',
    name: 'RekapBooking',
    component: RekapBooking,
    meta: {
      title: 'Rekap Booking Customer',
      subtitle: 'Data Booking Customer yang telah dibooking'
    }
  },
  {
    path: '/halamanutama',
    name: 'HalUtama',
    component: HalUtama,
    // meta: {
    //   title: 'Halaman utama',
    //   subtitle: 'Data Booking Customer yang telah dibooking'
    // }
  },
  {
    path: '/pricelist',
    name: 'Pricelist',
    component: PriceList,
    // meta: {
    //   title: 'paket foto',
    //   subtitle: 'Data Booking Customer yang telah dibooking'
    // }
  }, 
  {
    path: '/about',
    name: 'About',
    component: About,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) next();
      else next('/');
    }, () => next('/'));
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
