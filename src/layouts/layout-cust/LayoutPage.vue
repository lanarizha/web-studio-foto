<template>
  <div
    class="min-h-screen w-full overflow-x-hidden text-gray-800 font-sans flex flex-col aesthetic-bg"
  >
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 fixed w-full top-0 z-50 shadow-md transition-all duration-700"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo + Brand -->
        <div class="flex items-center space-x-3 animate-fade-in-down">
          <img
            src="../../assets/logo.png"
            alt="Logo"
            class="h-20 w-20 object-contain rounded-full border-4 border-pink-100 shadow-lg transition-transform hover:rotate-6 hover:scale-105 duration-300"
          />
          <div class="flex flex-col">
            <h1 class="text-2xl font-extrabold text-pink-700 leading-tight">
              CanEls Studio
            </h1>
            <p class="text-sm text-purple-500 italic">
              "Abadikan Momen, Ciptakan Kenangan."
            </p>
          </div>
        </div>

        <!-- Hamburger Button (Mobile) -->
        <button
          @click="toggleMenu"
          class="md:hidden text-purple-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Navigation -->
        <nav
          :class="[
            'flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-4 animate-fade-in-down absolute md:static bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 md:bg-transparent top-full left-0 w-full md:w-auto px-4 py-4 md:p-0 shadow-md md:shadow-none transition-transform duration-300',
            isMenuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0',
          ]"
        >
          <router-link
            to="/halamanutama"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            active-class="text-yellow-400 font-bold"
            exact
            @click="closeMenu"
          >
            Home
          </router-link>
          <router-link
            to="/pricelist"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            active-class="text-yellow-400 font-bold"
            @click="closeMenu"
          >
            Booking
          </router-link>
          <router-link
            to="/about"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            active-class="text-yellow-400 font-bold"
            @click="closeMenu"
          >
            About Us
          </router-link>
          <router-link
            to="/kontak"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            active-class="text-yellow-400 font-bold"
            @click="closeMenu"
          >
            Contact Us
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Konten dinamis -->
    <main class="flex-grow pt-28 px-4">
      <slot />
    </main>

    <!-- Footer Pastel Lucu dengan Sparkle -->
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

          <!-- GIF di tengah -->
          <span class="relative inline-flex items-center justify-center w-10 h-10">
            <img
              src="../../assets/fireworks.gif"
              alt="Heart Animation"
              class="w-9 h-9 animate-float-wiggle relative z-10 justify-center items-center"
            />
            <!-- Sparkles -->
            <span class="sparkle sparkle-1"></span>
            <span class="sparkle sparkle-2"></span>
            <span class="sparkle sparkle-3"></span>
          </span>
        </p>

        <div class="flex space-x-6 text-lg">
          <a
            href="https://www.instagram.com/millow.happyyxx"
            target="_blank"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-pink-200 hover:bg-pink-300 text-pink-700 shadow-md transition-all duration-300 transform hover:scale-110 hover:rotate-6"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://maps.app.goo.gl/Sy8KrPNeB5L1Jsio8?g_st=ac"
            target="_blank"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 hover:bg-blue-300 text-blue-700 shadow-md transition-all duration-300 transform hover:scale-110 hover:rotate-6"
          >
            <i class="fa-solid fa-map-marker-alt"></i>
          </a>
          <a
            href="https://www.tiktok.com/@candid.place"
            target="_blank"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-purple-200 hover:bg-purple-300 text-purple-700 shadow-md transition-all duration-300 transform hover:scale-110 hover:rotate-6"
          >
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a
            href="https://wa.me/6283890642797?text=Hai%20CanEls%20Studio%20💖%2C%20aku%20mau%20booking%20nih!"
            target="_blank"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-green-200 hover:bg-green-300 text-green-700 shadow-md transition-all duration-300 transform hover:scale-110 hover:rotate-6"
          >
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </footer>
    <!-- footer kamu tetap sama -->
  </div>
</template>

<script>
export default {
  name: "LayoutPage",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

/* Animasi Fade In Header */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fadeInDown 0.9s ease-out;
}

body {
  scroll-behavior: smooth;
  font-family: "Comic Neue", sans-serif;
}

/* Background pastel motif */
.aesthetic-bg {
  background-color: #fff1f5;
  background-image: radial-gradient(rgba(236, 72, 153, 0.15) 2px, transparent 2px),
    radial-gradient(rgba(236, 72, 153, 0.15) 2px, transparent 2px);
  background-position: 0 0, 15px 15px;
  background-size: 30px 30px;
}

/* Animasi Fade In Header */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fadeInDown 0.9s ease-out;
}

/* Animasi Floating + Wiggle GIF */
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

/* Efek Sparkle */
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
</style>
