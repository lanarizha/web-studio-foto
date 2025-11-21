<template>
  <div class="app-container">
    <!-- Tombol Toggle Sidebar untuk Mobile -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
      {{ sidebarOpen ? "✖" : "☰" }}
    </button>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="logo-section">
        <img
          src="../../assets/logo.png"
          alt="Logo CanEls Studio"
          class="logo-img spinBounce"
        />
        <h1 class="studio-name">CanEls Studio</h1>
        <p class="studio-slogan">"Abadikan Momen, Ciptakan Kenangan."</p>
      </div>

      <!-- Menu Navigasi -->
      <div id="nav" class="menu">
        <ul>
          <li :class="{ active: currentPage === 'home' }">
            <router-link to="/home" @click.native="closeSidebar">
              <img src="../../assets/family-life.gif" alt="Home" class="inline w-5 h-5 mr-2" />
              Home
            </router-link>
          </li>
          <li :class="{ active: currentPage === 'daftarBooking' }">
            <router-link to="/daftarBooking" @click.native="closeSidebar">
              <img src="../../assets/checklist.gif" alt="Booking" class="inline w-5 h-5 mr-2" />
              Daftar Booking
            </router-link>
          </li>
          <li :class="{ active: currentPage === 'kalender' }">
            <router-link to="/kalender" @click.native="closeSidebar">
              <img src="../../assets/friendship-day.gif" alt="Kalender" class="inline w-5 h-5 mr-2" />
              Kalender Booking
            </router-link>
          </li>
          <li :class="{ active: currentPage === 'paketfoto' }">
            <router-link to="/paketfoto" @click.native="closeSidebar">
              <img src="../../assets/photo-gallery.gif" alt="Paket Foto" class="inline w-5 h-5 mr-2" />
              Paket Foto
            </router-link>
          </li>
          <li :class="{ active: currentPage === 'rekapbooking' }">
            <router-link to="/rekapbooking" @click.native="closeSidebar">
              <img src="../../assets/files.gif" alt="Rekap" class="inline w-5 h-5 mr-2" />
              Rekap Booking
            </router-link>
          </li>
          <li class="mt-14 hover:cursor-pointer">
            <button @click="logout" class="w-full text-left hover:cursor-pointer">
              <img src="../../assets/logout.gif" alt="Logout" class="inline w-5 h-5 mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Konten Utama -->
    <main class="content-area" role="main">
      <header v-if="$route.meta.title" class="page-header">
        <img
          v-if="$route.meta.icon"
          :src="$route.meta.icon"
          alt="icon"
          class="page-icon"
        />
        <div>
          <h1>{{ $route.meta.title }}</h1>
          <p v-if="$route.meta.subtitle">{{ $route.meta.subtitle }}</p>
        </div>
      </header>

      <section class="content-body">
        <slot />
      </section>
    </main>
  </div>
   <!-- FOOTER -->
    <footer
      class="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-t-4 border-pink-200 py-10 text-center"
    >
      <div
        class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
      >
        <p
          class="text-sm text-purple-700 font-semibold flex items-center space-x-2 relative"
        >
          <span>© 2025 CanEls Studio</span>
          <span>All rights reserved</span>
          <span class="relative inline-flex items-center justify-center w-10 h-10">
            <img
              src="../../assets/fireworks.gif"
              alt="Heart Animation"
              class="w-9 h-9 animate-float-wiggle relative z-10"
            />
            <span class="sparkle sparkle-1"></span>
            <span class="sparkle sparkle-2"></span>
            <span class="sparkle sparkle-3"></span>
          </span>
        </p>

        <div class="flex space-x-6 text-lg">
          <a
            href="https://www.instagram.com/millow.happyyxx"
            target="_blank"
            class="social-btn bg-pink-200 text-pink-700"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://maps.app.goo.gl/Sy8KrPNeB5L1Jsio8?g_st=ac"
            target="_blank"
            class="social-btn bg-blue-200 text-blue-700"
          >
            <i class="fa-solid fa-map-marker-alt"></i>
          </a>
          <a
            href="https://www.tiktok.com/@candid.place"
            target="_blank"
            class="social-btn bg-purple-200 text-purple-700"
          >
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a
            href="https://wa.me/6283890642797?text=Hai%20CanEls%20Studio%20💖%2C%20aku%20mau%20booking%20nih!"
            target="_blank"
            class="social-btn bg-green-200 text-green-700"
          >
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: "LayoutPage",
  data() {
    return {
      currentPage: "",
      pageTitle: "",
      pageSubtitle: "",
      sidebarOpen: false,
    };
  },
  methods: {
    updatePageData() {
      const meta = this.$route.meta || {};
      this.pageTitle = meta.title || "Halaman";
      this.pageSubtitle = meta.subtitle || "";
      this.setCurrentPageFromPath(this.$route.path);
    },
    setCurrentPageFromPath(path) {
      if (path.includes("home")) this.currentPage = "home";
      else if (path.includes("daftarBooking")) this.currentPage = "daftarBooking";
      else if (path.includes("kalender")) this.currentPage = "kalender";
      else if (path.includes("paketfoto")) this.currentPage = "paketfoto";
      else if (path.includes("rekapbooking")) this.currentPage = "rekapbooking";
      else this.currentPage = "";
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.updatePageData();
  },
  watch: {
    $route() {
      this.updatePageData();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
/* Layout */
.app-container {
  display: flex;
  min-height: 100vh;
  font-family: "Comic Neue", "Segoe UI", sans-serif;
  color: #4b5563;
  background-color: #fff0f5;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: linear-gradient(to bottom, #f9e0ff, #ffe2e2);
  padding: 2rem 1.5rem;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 3px dashed #fbcfe8;
  transition: left 0.3s ease;
}

/* Logo */
.logo-section {
  text-align: center;
  border-bottom: 2px dashed #f9a8d4;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.logo-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  box-shadow: 0 0 10px #f9a8d4;
  border: 3px solid #fcd5ce;
}

/* Animasi Logo Putar + Mantul */
@keyframes spinBounceAnim {
  0%   { transform: rotate(0deg) translateY(0); }
  25%  { transform: rotate(90deg) translateY(-5px); }
  50%  { transform: rotate(180deg) translateY(0); }
  75%  { transform: rotate(270deg) translateY(-5px); }
  100% { transform: rotate(360deg) translateY(0); }
}

.spinBounce {
  animation: spinBounceAnim 2s ease-in-out infinite;
}

/* Judul & Slogan */
.studio-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ec4899;
  letter-spacing: 1px;
}

.studio-slogan {
  font-size: 0.8rem;
  color: #d946ef;
  font-style: italic;
  margin-top: 0.25rem;
}

/* Menu Navigasi */
.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  border-radius: 12px;
  transition: 0.3s ease;
  background-color: #fdf4ff;
  color: #9333ea;
}

.menu ul li:hover {
  background-color: #fbcfe8;
  color: #701a75;
}

.menu ul li.active {
  background-color: #f9a8d4;
  color: #831843;
  font-weight: 700;
}

.menu ul li a {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Konten Utama */
.content-area {
  flex: 1;
  padding: 2.5rem 3rem;
  background-color: #fffafc;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 10px #ffe4e6;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(to right, #fff, #fdf4ff);
  border-left: 5px solid #ec4899;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(236, 72, 153, 0.15);
  animation: fadeIn 0.6s ease-out;
}

.page-header h1 {
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(90deg, #ec4899, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-header p {
  font-size: 1rem;
  color: #a855f7;
  font-style: italic;
}

.page-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  animation: bounceIcon 1.5s infinite ease-in-out;
}

.content-body {
  flex-grow: 1;
  background-color: #fdf2f8;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(249, 168, 212, 0.2);
}

/* Tombol toggle */
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  background-color: #fbcfe8;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #831843;
  cursor: pointer;
  z-index: 1000;
}

/* Responsive Layout */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }

  .sidebar-toggle {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    width: 75%;
    max-width: 280px;
    height: 100%;
    z-index: 999;
  }

  .sidebar.open {
    left: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIcon {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* FOOTER ANIMATION */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}
.animate-float-wiggle {
  animation: float 2s ease-in-out infinite, wiggle 1.2s ease-in-out infinite;
}

.sparkle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 40%, transparent 60%);
  border-radius: 50%;
  animation: sparkleBlink 1.5s infinite ease-in-out;
}
.sparkle-1 {
  width: 6px;
  height: 6px;
  top: -4px;
  left: -6px;
  animation-delay: 0s;
}
.sparkle-2 {
  width: 5px;
  height: 5px;
  bottom: -4px;
  right: -5px;
  animation-delay: 0.5s;
}
.sparkle-3 {
  width: 4px;
  height: 4px;
  top: -6px;
  right: -4px;
  animation-delay: 1s;
}

@keyframes sparkleBlink {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* BACKGROUND MOTIF */
.aesthetic-bg {
  background-color: #fff1f5;
  background-image: radial-gradient(rgba(236, 72, 153, 0.15) 2px, transparent 2px),
    radial-gradient(rgba(236, 72, 153, 0.15) 2px, transparent 2px);
  background-position: 0 0, 15px 15px;
  background-size: 30px 30px;
}

/* SOCIAL BUTTON */
.social-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.social-btn:hover {
  transform: scale(1.1) rotate(6deg);
}
</style>
