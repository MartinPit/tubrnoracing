export default defineNuxtConfig({
  // Setting the compatibility date is standard for Nuxt 3 projects
  compatibilityDate: '2025-07-15', 

  // Enable Nuxt Devtools
  devtools: { enabled: true },

  // --- CRITICAL: Runtime Configuration for Directus URL ---
  // This allows the use of `useRuntimeConfig().public.directusUrl` in your Vue code
  runtimeConfig: {
    public: {
      // The variable VITE_DIRECTUS_URL is read from your app/.env file
      directusUrl: process.env.VITE_DIRECTUS_URL 
    }
  }
})