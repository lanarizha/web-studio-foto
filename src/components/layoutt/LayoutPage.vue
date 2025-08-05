<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar"
>
    
      <div class="logo-section">
        <div class="logo-placeholder" aria-label="Studio logo placeholder"></div>
        <h1 class="studio-name">CanEls Studio</h1>
        <p class="studio-slogan">Memori disetiap potretnya</p>
      </div>
      <div id="nav" class="menu">
        <ul> 
          <li :class="{ active: currentPage === 'home' }">
            <router-link to="/home">Home</router-link>
          </li>
          <li :class="{ active: currentPage === 'daftarBooking' }">
            <router-link to="/daftarBooking">Daftar Booking Customer</router-link>
          </li>
          <li :class="{ active: currentPage === 'kalender' }">
            <router-link to="/kalender">Kalender Booking</router-link>
          </li>
          <li :class="{ active: currentPage === 'paketfoto' }">
            <router-link to="/paketfoto">Paket Foto</router-link>
          </li>
          <li :class="{ active: currentPage === 'rekapbooking' }">
            <router-link to="/rekapbooking">Rekap Data Booking</router-link>
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
      <slot/>
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
      pageSubtitle: ""
    };
  },
  methods: {
    updatePageData() {
      const meta = this.$route.meta || {}
      this.pageTitle = meta.title || "Halaman"
      this.pageSubtitle = meta.subtitle || ""
      this.setCurrentPageFromPath(this.$route.path)
    },
    setCurrentPageFromPath(path) {
      if (path.includes("home")) this.currentPage = "home"
      else if (path.includes("daftarBooking")) this.currentPage = "daftarBooking"
      else if (path.includes("kalender")) this.currentPage = "kalender"
      else if (path.includes("paketfoto")) this.currentPage = "paketfoto"
      else this.currentPage = ""
    }
  },
  mounted() {
    this.updatePageData()
  },
  watch: {
    $route() {
      this.updatePageData()
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f9fafb;
}

.sidebar {
  width: 300px;
  background: linear-gradient(180deg, #1f2937 0%, #4b5563 100%);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  color: #e0e7ff;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
}

.logo-section {
  border-bottom: 1px solid #374151;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.logo-placeholder {
  width: 80px;
  height: 80px;
  margin: 0 auto 0.5rem;
  background: #dbeafe;
  border-radius: 50%;
  box-shadow: 0 0 10px #93c5fd inset;
}

.studio-name {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  letter-spacing: 2px;
}

.studio-slogan {
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: #c7d2fe;
  font-style: italic;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease;
  user-select: none;
}

.menu ul li:hover,
.menu ul li:focus {
  background-color: #3b82f6;
  color: white;
  outline: none;
}

.menu ul li.active {
  background-color: #2563eb;
  color: white;
}

.content-area {
  flex: 1;
  padding: 2.5rem 3rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 10px #e0e7ff;
}

.content-header {
  margin-bottom: 1.25rem;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 0.75rem;
}

.content-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #1e3a8a;
}

.page-subtitle {
  font-weight: 500;
  color: #2563eb;
  margin-top: 0.25rem;
}

.content-body {
  flex-grow: 1;
  background-color: aliceblue;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
  font-size: 1.1rem;
  color: #1e293b;
}
</style>