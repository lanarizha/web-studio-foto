<template>
  <div
    class="min-h-screen w-full overflow-x-hidden text-gray-800 font-sans flex flex-col aesthetic-bg"
  >
    <!-- HEADER -->
    <header
      ref="headerEl"
      class="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 fixed w-full top-0 z-[9999] shadow-md"
    >
      <div
        class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4"
      >
        <!-- Logo + Brand -->
        <div class="flex items-center space-x-3">
          <img
            src="../../assets/logo.png"
            alt="Logo"
            class="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full border-4 border-pink-100 shadow-lg transition-transform hover:rotate-6 hover:scale-105 duration-300"
          />
          <div>
            <h1 class="text-lg sm:text-2xl font-extrabold text-pink-700 leading-tight">
              CanEls Studio
            </h1>
            <p class="text-xs sm:text-sm text-purple-500 italic">
              "Abadikan Momen, Ciptakan Kenangan."
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-wrap items-center gap-4 text-sm sm:text-base">
          <router-link
            to="/halamanutama"
            class="nav-link"
            active-class="text-yellow-400 font-bold"
            exact
          >
            Home
          </router-link>
          <router-link
            to="/pricelist"
            class="nav-link"
            active-class="text-yellow-400 font-bold"
          >
            Booking
          </router-link>
          <router-link
            to="/about"
            class="nav-link"
            active-class="text-yellow-400 font-bold"
          >
            About Us
          </router-link>
          <router-link
            to="/kontak"
            class="nav-link"
            active-class="text-yellow-400 font-bold"
          >
            Contact Us
          </router-link>
        </nav>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-grow px-4" :style="{ paddingTop: headerHeight + 'px' }">
      <slot />
    </main>

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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerEl = ref(null);
const headerHeight = ref(0);

const updateHeaderHeight = () => {
  if (headerEl.value) {
    headerHeight.value = headerEl.value.offsetHeight;
  }
};

onMounted(() => {
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeaderHeight);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

/* NAVIGATION LINK */
.nav-link {
  padding: 0.5rem 0.75rem;
  color: #7e22ce;
  font-weight: 600;
  transition: color 0.3s ease;
}

/* Efek hover jadi kuning */
.nav-link:hover {
  color: #facc15; /* kuning */
}

/* Warna tetap kuning jika halaman aktif */
.nav-link.router-link-exact-active,
.nav-link.router-link-active {
  color: #facc15; /* kuning */
  font-weight: bold;
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
