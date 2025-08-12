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
</style>
