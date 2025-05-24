import { defineStore } from 'pinia'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [
      {
        id: 1,
        title: "Éducateur/trice de jeunes enfants",
        companyName: "KindiJob Paris",
        companyLogo: "https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg",
        location: "Paris",
        type: "CDI",
        salary: 35000,
        description: "Nous recherchons un(e) éducateur/trice passionné(e) pour rejoindre notre équipe dynamique.",
        skills: ["Petite enfance", "Pédagogie", "Travail d'équipe"]
      },
      {
        id: 2,
        title: "Assistant(e) maternel(le)",
        companyName: "Crèche Les Petits Pas",
        companyLogo: "https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg",
        location: "Lyon",
        type: "CDD",
        salary: 28000,
        description: "Poste d'assistant(e) maternel(le) dans une structure moderne et bienveillante.",
        skills: ["Patience", "Créativité", "Organisation"]
      },
      {
        id: 3,
        title: "Directeur/trice de crèche",
        companyName: "Les Bambins Heureux",
        companyLogo: "https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg",
        location: "Marseille",
        type: "CDI",
        salary: 45000,
        description: "Direction d'une crèche de 40 berceaux. Expérience requise.",
        skills: ["Management", "Gestion", "Leadership"]
      }
    ],
    filters: {
      location: [],
      category: [],
      salary: {
        min: 0,
        max: 100000,
        isFiltered: false
      },
      jobType: [],
      levelExperience: [],
      searchQuery: ''
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchJobs() {
      this.loading = true
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch('YOUR_BACKEND_API_URL/jobs').catch(() => {
          // Si l'appel échoue, on utilise les données par défaut
          return new Response(JSON.stringify(this.jobs))
        })
        const data = await response.json()
        this.jobs = data
      } catch (error) {
        console.error('Erreur lors du chargement des jobs:', error)
        // En cas d'erreur, on garde les données par défaut
        this.error = "Impossible de charger les données depuis le serveur. Affichage des offres en cache."
      } finally {
        this.loading = false
      }
    },

    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
    },

    setSearchQuery(query) {
      this.filters.searchQuery = query
    }
  },

  getters: {
    filteredJobs: (state) => {
      let filtered = [...state.jobs]

      if (state.filters.searchQuery) {
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(state.filters.searchQuery.toLowerCase())
        )
      }

      if (state.filters.location.length) {
        filtered = filtered.filter(job => 
          state.filters.location.includes(job.location)
        )
      }

      if (state.filters.category.length) {
        filtered = filtered.filter(job => 
          state.filters.category.includes(job.category)
        )
      }

      if (state.filters.jobType.length) {
        filtered = filtered.filter(job => 
          state.filters.jobType.includes(job.type)
        )
      }

      if (state.filters.salary.isFiltered) {
        filtered = filtered.filter(job => 
          job.salary >= state.filters.salary.min &&
          job.salary <= state.filters.salary.max
        )
      }

      return filtered
    }
  }
}) 