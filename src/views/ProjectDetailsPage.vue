<template>
    <div class="w-full min-h-screen bg-gray-50">
        <!-- Header du projet -->
        <div class="bg-white border-b border-gray-200 shadow-sm">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="py-6">
                    <!-- Breadcrumb -->
                    <nav class="flex mb-4" aria-label="Breadcrumb">
                        <ol class="flex items-center space-x-2">
                            <li>
                                <div class="flex items-center">
                                    <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                        Projets
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <ChevronRightIcon class="flex-shrink-0 w-4 h-4 mx-2 text-gray-400" />
                                    <span class="text-sm font-medium text-gray-900 truncate">
                                        {{ project.name }}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <!-- Informations principales -->
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-4 mb-4">
                                <h1 class="text-2xl font-bold text-gray-900">
                                    {{ project.name }}
                                </h1>
                                <div class="flex items-center gap-2">
                                    <!-- Badge de statut -->
                                    <span :class="getStatusBadgeClass(project.status)"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                        <div :class="getStatusDotClass(project.status)"
                                            class="w-1.5 h-1.5 rounded-full mr-1.5"></div>
                                        {{ getStatusLabel(project.status) }}
                                    </span>

                                    <!-- Badge de priorité -->
                                    <span :class="getPriorityBadgeClass(project.priority)"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                        <FlagIcon class="w-3 h-3 mr-1" />
                                        {{ getPriorityLabel(project.priority) }}
                                    </span>
                                </div>
                            </div>

                            <!-- Informations secondaires -->
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div class="flex items-center text-sm text-gray-600">
                                    <UserIcon class="w-4 h-4 mr-2 text-gray-400" />
                                    <span class="mr-1 font-medium">Manager:</span>
                                    <span>{{ project.manager?.account?.firstName }} {{
                                        project.manager?.account?.lastName }}</span>
                                </div>

                                <div class="flex items-center text-sm text-gray-600">
                                    <CalendarIcon class="w-4 h-4 mr-2 text-gray-400" />
                                    <span class="mr-1 font-medium">Début:</span>
                                    <span>{{ formatDate(project.start) }}</span>
                                </div>

                                <div class="flex items-center text-sm text-gray-600">
                                    <ClockIcon class="w-4 h-4 mr-2 text-gray-400" />
                                    <span class="mr-1 font-medium">Créé:</span>
                                    <span>{{ formatDate(project.createdAt) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center gap-3 ml-6">
                            <button @click="editProject"
                                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#db147f]">
                                <PencilIcon class="w-4 h-4 mr-2" />
                                Modifier
                            </button>

                            <button @click="shareProject"
                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#db147f] hover:bg-[#c41370] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#db147f]">
                                <ShareIcon class="w-4 h-4 mr-2" />
                                Partager
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation par onglets -->
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="border-b border-gray-200">
                <nav class="flex -mb-px space-x-8" aria-label="Tabs">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                        activeTab === tab.id
                            ? 'border-[#db147f] text-[#db147f]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center'
                    ]">
                        <component :is="tab.icon" class="w-4 h-4 mr-2" />
                        {{ tab.name }}
                        <span v-if="tab.count !== undefined" :class="[
                            activeTab === tab.id ? 'bg-[#db147f] text-white' : 'bg-gray-100 text-gray-600',
                            'ml-2 py-0.5 px-2 rounded-full text-xs font-medium'
                        ]">
                            {{ tab.count }}
                        </span>
                    </button>
                </nav>
            </div>
        </div>

        <!-- Contenu des onglets -->
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Onglet Détails REDESIGNÉ -->
            <div v-if="activeTab === 'details'" class="space-y-6">

                <!-- Statistiques rapides -->
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <!-- Statut -->
                    <div class="relative overflow-hidden bg-white rounded-lg shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div :class="[
                                        'flex items-center justify-center w-8 h-8 rounded-md',
                                        project.status === 'completed' ? 'bg-green-500' :
                                            project.status === 'in_progress' ? 'bg-yellow-500' :
                                                project.status === 'open' ? 'bg-blue-500' : 'bg-gray-500'
                                    ]">
                                        <CheckCircleIcon v-if="project.status === 'completed'"
                                            class="w-5 h-5 text-white" />
                                        <PlayIcon v-else-if="project.status === 'in_progress'"
                                            class="w-5 h-5 text-white" />
                                        <CircleIcon v-else-if="project.status === 'open'" class="w-5 h-5 text-white" />
                                        <XCircleIcon v-else class="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div class="flex-1 w-0 ml-5">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Statut</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ getStatusLabel(project.status)
                                            }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Priorité -->
                    <div class="relative overflow-hidden bg-white rounded-lg shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div :class="[
                                        'flex items-center justify-center w-8 h-8 rounded-md',
                                        project.priority === 'HIGH' ? 'bg-red-500' :
                                            project.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
                                    ]">
                                        <FlagIcon class="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div class="flex-1 w-0 ml-5">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Priorité</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{
                                            getPriorityLabel(project.priority) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tâches -->
                    <div class="relative overflow-hidden bg-white rounded-lg shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-md">
                                        <CheckSquareIcon class="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div class="flex-1 w-0 ml-5">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Tâches</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ project.tasksCount || 0 }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Durée -->
                    <div class="relative overflow-hidden bg-white rounded-lg shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-md">
                                        <ClockIcon class="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div class="flex-1 w-0 ml-5">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Durée</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ getProjectDuration() }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contenu principal en deux colonnes -->
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <!-- Colonne principale (2/3) -->
                    <div class="space-y-6 lg:col-span-2">

                        <!-- Description et Objectif -->
                        <div class="bg-white rounded-lg shadow">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="flex items-center text-lg font-medium text-gray-900">
                                    <FileTextIcon class="w-5 h-5 mr-2 text-gray-400" />
                                    Description du projet
                                </h3>
                            </div>
                            <div class="px-6 py-4 space-y-4">
                                <div>
                                    <h4 class="mb-2 text-sm font-medium text-gray-900">Description</h4>
                                    <div class="p-4 rounded-lg bg-gray-50">
                                        <p class="text-sm leading-relaxed text-gray-700">
                                            {{ project.description || 'Aucune description fournie pour ce projet.' }}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="mb-2 text-sm font-medium text-gray-900">Objectif</h4>
                                    <div class="p-4 border-l-4 border-blue-400 rounded-lg bg-blue-50">
                                        <p class="text-sm leading-relaxed text-blue-700">
                                            {{ project.objectif || 'Aucun objectif spécifique défini pour ce projet.' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Timeline du projet -->
                        <div class="pb-8 bg-white rounded-lg shadow">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="flex items-center text-lg font-medium text-gray-900">
                                    <PlusIcon class="w-5 h-5 mr-2 text-gray-400" />
                                    Chronologie du projet
                                </h3>
                            </div>
                            <div class="px-6 py-4 ">
                                <div class="flow-root">
                                    <ul class="-mb-8">
                                        <li>
                                            <div class="relative pb-8">
                                                <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                    aria-hidden="true"></span>
                                                <div class="relative flex space-x-3">
                                                    <div>
                                                        <span
                                                            class="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full ring-8 ring-white">
                                                            <PlusIcon class="w-4 h-4 text-white" />
                                                        </span>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div>
                                                            <p class="text-sm font-medium text-gray-900">Projet créé</p>
                                                            <p class="text-sm text-gray-500">{{
                                                                formatDate(project.createdAt) }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class="relative pb-8">
                                                <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                    aria-hidden="true"></span>
                                                <div class="relative flex space-x-3">
                                                    <div>
                                                        <span
                                                            class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full ring-8 ring-white">
                                                            <PlayIcon class="w-4 h-4 text-white" />
                                                        </span>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div>
                                                            <p class="text-sm font-medium text-gray-900">Début prévu</p>
                                                            <p class="text-sm text-gray-500">{{
                                                                formatDate(project.start) }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class="relative">
                                                <div class="relative flex space-x-3">
                                                    <div>
                                                        <span
                                                            class="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full ring-8 ring-white">
                                                            <EditIcon class="w-4 h-4 text-white" />
                                                        </span>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div>
                                                            <p class="text-sm font-medium text-gray-900">Dernière
                                                                modification</p>
                                                            <p class="text-sm text-gray-500">{{
                                                                formatDate(project.updatedAt) }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar (1/3) -->
                    <div class="space-y-6">

                        <!-- Informations de l'équipe -->
                        <div class="bg-white rounded-lg shadow">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="flex items-center text-lg font-medium text-gray-900">
                                    <UsersIcon class="w-5 h-5 mr-2 text-gray-400" />
                                    Équipe
                                </h3>
                            </div>
                            <div class="px-6 py-4 space-y-4">
                                <!-- Manager -->
                                <div class="flex items-center space-x-3">
                                    <div class="flex-shrink-0">
                                        <div
                                            class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                                            <UserIcon class="w-6 h-6 text-gray-600" />
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900">
                                            {{ project.manager?.account?.firstName }} {{
                                            project.manager?.account?.lastName }}
                                        </p>
                                        <p class="text-sm text-gray-500">Manager du projet</p>
                                        <p class="text-xs text-gray-400">{{ project.manager?.account?.email }}</p>
                                    </div>
                                </div>
                                <!-- {{ project?.members[0].member.account.firstName }} -->
                                <div class="flex items-center flex-shrink-0 gap-2" v-for="guest in project.members"
                                    :key="guest.id">

                                    <div class="flex items-center flex-shrink-0 gap-2" v-if="guest.memberId !== project.manager.id">
                                        <div
                                            class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                                            <UserIcon class="w-6 h-6 text-gray-600" />
                                        </div>
                                        <div class="grid">
                                            <span>{{ guest.member.account.firstName }} {{ guest.member.account.lastName
                                                }}</span>
                                            <span class="text-sm text-gray-500">

                                                {{ guest.member.role }}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- Détails techniques -->
                        <div class="bg-white rounded-lg shadow">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="flex items-center text-lg font-medium text-gray-900">
                                    <SettingsIcon class="w-5 h-5 mr-2 text-gray-400" />
                                    Détails techniques
                                </h3>
                            </div>
                            <div class="px-6 py-4">
                                <dl class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <dt class="text-sm font-medium text-gray-500">ID du projet</dt>
                                        <dd class="px-2 py-1 font-mono text-sm text-gray-900 bg-gray-100 rounded">
                                            #{{ project.id }}
                                        </dd>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <dt class="text-sm font-medium text-gray-500">Slug</dt>
                                        <dd class="px-2 py-1 font-mono text-sm text-gray-900 bg-gray-100 rounded">
                                            {{ project.slug }}
                                        </dd>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <dt class="text-sm font-medium text-gray-500">Offre liée</dt>
                                        <dd class="text-sm text-gray-900">
                                            {{ project.job?.title || 'Aucune' }}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Onglet Tâches -->
            <div v-if="activeTab === 'tasks'">
                <ProjectTasksView :projectId="project.id" :projectName="project.name" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
    ChevronRightIcon,
    UserIcon,
    CalendarIcon,
    ClockIcon,
    PencilIcon,
    ShareIcon,
    FlagIcon,
    CheckSquareIcon,
    CheckCircleIcon,
    PlayIcon,
    CircleIcon,
    XCircleIcon,
    FileTextIcon,
    PlusIcon,
    EditIcon,
    UsersIcon,
    SettingsIcon,
    ZapIcon,
    DownloadIcon,
    CopyIcon,
    TrashIcon
} from 'lucide-vue-next'
import ProjectTasksView from './ProjectTasksView.vue'

const route = useRoute()
const auth = useAuthStore()

// État réactif
const project = ref({})
const loading = ref(true)
const activeTab = ref('details')

// Configuration des onglets
const tabs = computed(() => [
    {
        id: 'details',
        name: 'Détails',
        icon: CheckSquareIcon
    },
    {
        id: 'tasks',
        name: 'Tâches',
        icon: CheckSquareIcon,
        count: project.value.tasksCount || 0
    }
])

// Méthodes utilitaires pour les statuts
const getStatusLabel = (status) => {
    const statusLabels = {
        'open': 'Ouvert',
        'in_progress': 'En cours',
        'completed': 'Terminé',
        'closed': 'Fermé'
    }
    return statusLabels[status] || status
}

const getStatusBadgeClass = (status) => {
    const classes = {
        'open': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800',
        'closed': 'bg-gray-100 text-gray-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusDotClass = (status) => {
    const classes = {
        'open': 'bg-blue-400',
        'in_progress': 'bg-yellow-400',
        'completed': 'bg-green-400',
        'closed': 'bg-gray-400'
    }
    return classes[status] || 'bg-gray-400'
}

// Méthodes utilitaires pour les priorités
const getPriorityLabel = (priority) => {
    const priorityLabels = {
        'HIGH': 'Haute',
        'MEDIUM': 'Moyenne',
        'LOW': 'Basse'
    }
    return priorityLabels[priority] || priority
}

const getPriorityBadgeClass = (priority) => {
    const classes = {
        'HIGH': 'bg-red-100 text-red-800',
        'MEDIUM': 'bg-yellow-100 text-yellow-800',
        'LOW': 'bg-green-100 text-green-800'
    }
    return classes[priority] || 'bg-gray-100 text-gray-800'
}

// Calcul de la durée du projet
const getProjectDuration = () => {
    if (!project.value.createdAt || !project.value.start) return 'N/A'

    const created = new Date(project.value.createdAt)
    const start = new Date(project.value.start)
    const now = new Date()

    const diffTime = Math.abs(now - created)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) {
        return `${diffDays} jour${diffDays > 1 ? 's' : ''}`
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30)
        return `${months} mois`
    } else {
        const years = Math.floor(diffDays / 365)
        return `${years} an${years > 1 ? 's' : ''}`
    }
}

// Formatage des dates
const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Actions
const editProject = () => {
    console.log('Modifier le projet:', project.value.id)
}

const shareProject = () => {
    console.log('Partager le projet:', project.value.id)
}

// Récupération des données du projet
const fetchProject = async () => {
    loading.value = true
    try {
        const companyId = route.params.companyId
        const projectId = route.params.projectId

        const response = await auth.api(
            'GET',
            `/companies/${companyId}/projects/${projectId}/with_task`,
            null,
            false
        )

        if (response.success) {
            project.value = response.data
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error)
    } finally {
        loading.value = false
    }
}

// Initialisation
onMounted(() => {
    fetchProject()
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>