<template>
    <!-- Sidebar for large screens (lg and above) -->
    <nav class=" d-flex flex-column p-3 h-100 position-fixed d-none d-lg-flex">
        <div class="mb-3">
            <img src="/public/favicon.ico" alt="Logo" class="logo-image">
        </div>
        <ul class="nav flex-column">
            <li class="nav-item">
                <a href="#" class="nav-link ">
                    <i class="bi bi-flower2"></i>                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link ">
                    <i class="bi bi-person-circle"></i>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link ">
                    <i class="bi bi-gear"></i>
                </a>
            </li>
            <li class="nav-item">
                <div href="#" class="nav-link " @click="toggleTheme()">
                    <i class="bi bi-toggle-off"></i>
                    <!-- <i class="bi bi-toggle-on"></i> -->
                </div>
            </li>
        </ul>
    </nav>

    <!-- Navbar for small screens (below lg) -->
    <nav class="d-lg-none d-sm-flex bg-dark navbar  w-100 position-sticky top-0 start-0 end-0">
        <div class="container-fluid">
            <div id="navbarToggleExternalContent">
                <div class="">
                    <ul class="nav overflow-auto flex-nowrap justify-content-center">
                        <li class="nav-item">
                            <a href="#" class="nav-link ">
                                <div class="mb-3">
                                    <img src="/public/favicon.ico" alt="Logo" class="logo-image">
                                </div>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link ">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link ">Settings</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link ">Help</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link ">Help</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

// State to track whether the navbar is collapsed or not
const isNavbarCollapsed = ref(false);

// Function to toggle the navbar collapse state
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
};

</script>

<style scoped>
/* Styling to ensure correct behavior */
.w-250 {
    width: 250px;
}

.h-100 {
    height: 100vh;
    /* Sidebar should take full height */
}

.navbar {
    overflow-x: auto;
    /* Allows horizontal scrolling */
    white-space: nowrap;
    /* z-index: 10; */
    /* Prevents items from wrapping to the next line */
}

.nav .nav-item {
    flex: 0 0 auto;
    /* Keeps nav items in one row */
}
</style>
