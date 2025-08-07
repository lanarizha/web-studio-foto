<template>
  <div class="app-container">
    <!-- Tombol Toggle Sidebar untuk Mobile -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">☰</button>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="logo-section">
        <img src="../../assets/logo.png" alt="Logo CanEls Studio" class="logo-img" />
        <h1 class="studio-name">CanEls Studio</h1>
        <p class="studio-slogan">"Abadikan Momen, Ciptakan Kenangan."</p>
      </div>

      <div id="nav" class="menu">
        <ul>
          <li :class="{ active: currentPage === 'home' }">
            <router-link to="/home" @click.native="sidebarOpen = false">🏠 Home</router-link>
          </li>
          <li :class="{ active: currentPage === 'daftarBooking' }">
            <router-link to="/daftarBooking" @click.native="sidebarOpen = false">📋 Daftar Booking</router-link>
          </li>
          <li :class="{ active: currentPage === 'kalender' }">
            <router-link to="/kalender" @click.native="sidebarOpen = false">🗓️ Kalender Booking</router-link>
          </li>
          <li :class="{ active: currentPage === 'paketfoto' }">
            <router-link to="/paketfoto" @click.native="sidebarOpen = false">📸 Paket Foto</router-link>
          </li>
          <li :class="{ active: currentPage === 'rekapbooking' }">
            <router-link to="/rekapbooking" @click.native="sidebarOpen = false">📊 Rekap Booking</router-link>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Konten Utama -->
    <main class="content-area" role="main">
      <header class="content-header">
        <h2>{{ pageTitle }}</h2>
        <p class="page-subtitle">{{ pageSubtitle }}</p>
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
      sidebarOpen: false
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
    }
  },
  mounted() {
    this.updatePageData();
  },
  watch: {
    $route() {
      this.updatePageData();
    }
  }
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

.studio-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ec4899;
  letter-spacing: 1px;
}

.studio-slogan {
  font-size: 0.80rem;
  color: #d946ef;
  font-style: italic;
  margin-top: 0.25rem;
}

/* Navigation */
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

/* Main Content */
.content-area {
  flex: 1;
  padding: 2.5rem 3rem;
  background-color: #fffafc;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 10px #ffe4e6;
}

/* Header */
.content-header {
  margin-bottom: 1.25rem;
  border-bottom: 3px dashed #f9a8d4;
  padding-bottom: 0.75rem;
}

.content-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #be185d;
}

.page-subtitle {
  font-weight: 500;
  color: #ec4899;
  margin-top: 0.25rem;
}

/* Body */
.content-body {
  flex-grow: 1;
  background-color: #fdf2f8;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(249, 168, 212, 0.2);
  font-size: 1.1rem;
  color: #4b5563;
}

/* Tombol Toggle Sidebar */
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background-color: #fbcfe8;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  color: #831843;
  cursor: pointer;
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
    transition: left 0.3s ease;
  }

  .sidebar.open {
    left: 0;
  }

  .content-area {
    padding: 1.5rem;
    margin-top: 3.5rem;
  }

  .content-header h2 {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .content-body {
    padding: 1.5rem;
    font-size: 1rem;
  }
}
</style>
