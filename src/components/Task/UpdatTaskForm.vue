<template>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">Modifier la tâche</h2>
                <p class="text-sm text-gray-600">Modifiez les détails de la tâche</p>
            </div>
            <button @click="$emit('close')" class="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100">
                <XIcon class="w-5 h-5" />
            </button>
        </div>

        <!-- Form Content -->
        <div class="flex-1 p-6 overflow-y-auto">
            <form class="space-y-6">
                <!-- Informations générales -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">
                        Informations générales
                    </h3>

                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Nom de la tâche *</label>
                        <input v-model="localTaskData.name" type="text"
                            placeholder="Ex: Développer l'interface utilisateur"
                            class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                            required />
                    </div>

                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
                        <textarea v-model="localTaskData.description" placeholder="Décrivez la tâche en détail..."
                            rows="3"
                            class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"></textarea>
                    </div>
                </div>

                <!-- Configuration -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">Configuration</h3>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Statut *</label>
                            <select v-model="localTaskData.status"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required>
                                <option value="create">create</option>
                                <option value="in progress">in progress</option>
                                <option value="in review">in review</option>
                                <option value="completed">completed</option>
                                <option value="closed">closed</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Priorité *</label>
                            <select v-model="localTaskData.priority"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required>
                                <option value="">Sélectionner une priorité</option>
                                <option value="LOW">low</option>
                                <option value="MEDIUM">medium</option>
                                <option value="HIGH">high</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Estimation (jours) *</label>
                            <input v-model.number="localTaskData.estimationTime" type="number" min="1" placeholder="5"
                                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Date de début *</label>
                            <input v-model="formattedStartDate" type="date"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required />
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Date d'échéance *</label>
                            <input v-model="formattedDueDate" type="date" :min="formattedStartDate"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required />
                        </div>
                    </div>
                </div>

                <!-- Assignation -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">Assignation</h3>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Assigné à *</label>
                            <select v-model="localTaskData.assigneeId"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required>
                                <option value="">Sélectionner un assigné</option>
                                <option v-for="member in projectMembers" :key="member.id" :value="member.id">
                                    {{ member.name }} - {{ member.role }}
                                </option>
                            </select>
                        </div>

                        <div v-if="localTaskData.step?.stepId">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Étape du projet</label>
                            <input disabled="true" v-model="localTaskData.step.name"
                                class="w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"/>
                        </div>
                    </div>
                </div>

                <!-- Fichiers joints -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">Documents du projet</h3>
                        <span class="text-sm text-gray-500">{{ localTaskData.files.length }}/3 fichiers</span>
                    </div>

                    <!-- Zone de sélection de fichiers -->
                    <div class="space-y-4">
                        <!-- Bouton de sélection multiple -->
                        <div class="flex items-center gap-3">
                            <input ref="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.mp4,.avi,.mov,.docx"
                                @change="handleMultipleFileSelection" class="hidden" />
                            <button type="button" @click="$refs.fileInput.click()" :disabled="localTaskData.files.length >= 3 || isUploading"
                                class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <UploadIcon class="w-4 h-4" />
                                {{ isUploading ? 'Upload en cours...' : 'Sélectionner des fichiers' }}
                            </button>
                            <p class="text-sm text-gray-500">
                                Maximum 3 fichiers (PDF, Images, Vidéos, DOCX) - Max 10MB par fichier
                            </p>
                        </div>
                    </div>

                    <!-- Liste des fichiers -->
                    <div v-if="localTaskData.files.length > 0" class="space-y-3">
                        <h4 class="text-sm font-medium text-gray-900">Fichiers :</h4>
                        <div class="space-y-2">
                            <div v-for="(file, index) in localTaskData.files" :key="index"
                                class="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0">
                                        <FileTextIcon v-if="isDocumentFile(file.type)" class="w-8 h-8 text-blue-500" />
                                        <ImageIcon v-else-if="isImageFile(file.type)" class="w-8 h-8 text-green-500" />
                                        <VideoIcon v-else-if="isVideoFile(file.type)" class="w-8 h-8 text-purple-500" />
                                        <FileIcon v-else class="w-8 h-8 text-gray-500" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate">
                                            {{ file.name }}
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            {{ formatFileSize(file.size) }} • {{ file.type || 'Type inconnu' }}
                                        </p>
                                        <!-- Barre de progression pour les nouveaux fichiers -->
                                        <div v-if="file.uploading" class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div class="bg-[#db147f] h-1.5 rounded-full transition-all duration-300" 
                                                :style="{ width: file.uploadProgress + '%' }"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <!-- Indicateur de statut d'upload -->
                                    <div v-if="file.uploading" class="flex items-center gap-2">
                                        <div class="w-4 h-4 border-2 border-[#db147f] border-t-transparent rounded-full animate-spin"></div>
                                        <span class="text-xs text-gray-500">{{ file.uploadProgress }}%</span>
                                    </div>
                                    <CheckCircleIcon v-else-if="file.uploaded" class="w-5 h-5 text-green-500" />
                                    <a v-if="file.url" :href="file.url" target="_blank" 
                                        class="p-1 text-blue-500 transition-colors hover:text-blue-700">
                                        <ExternalLinkIcon class="w-4 h-4" />
                                    </a>

                                    <!-- Bouton de suppression -->
                                    <button type="button" @click="removeFile(index)" :disabled="file.uploading"
                                        class="p-1 text-gray-400 transition-colors hover:text-red-500 disabled:opacity-50">
                                        <XIcon class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- État vide -->
                    <div v-else class="p-8 text-center text-gray-500 border-2 border-gray-200 border-dashed rounded-lg">
                        <FolderIcon class="w-8 h-8 mx-auto mb-4 text-gray-300" />
                        <p class="mb-2 text-lg font-medium text-gray-400">Aucun fichier ajouté</p>
                        <p class="text-sm text-gray-400">
                            Ajoutez des documents pour enrichir votre tâche
                        </p>
                    </div>
                </div>

                <!-- Section commentaires -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">Commentaires</h3>

                    <!-- Liste des commentaires existants -->
                    <div v-if="localTaskData.comments && localTaskData.comments.length > 0" class="space-y-3">
                        <div v-for="(comment, index) in localTaskData.comments" :key="index"
                            class="p-4 rounded-lg bg-gray-50">
                            <div class="flex justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <div class="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
                                        <UserIcon class="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span class="font-medium text-gray-900">{{ comment.author }}</span>
                                </div>
                                <span class="text-xs text-gray-500">{{ formatDateTime(comment.createdAt) }}</span>
                            </div>
                            <p class="text-gray-700">{{ comment.text }}</p>
                        </div>
                    </div>

                    <!-- Nouveau commentaire -->
                    <div>
                        <textarea v-model="newComment" placeholder="Ajoutez un nouveau commentaire..." rows="3"
                            class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"></textarea>
                        <div class="flex justify-end mt-2">
                            <button @click="addComment" type="button"
                                class="px-4 py-2 text-white bg-[#db147f] rounded-lg hover:bg-[#c41370] transition-colors">
                                Ajouter un commentaire
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Messages d'erreur -->
                <div v-if="errorMessage" class="p-4 border border-red-200 rounded-lg bg-red-50">
                    <p class="text-sm text-red-600">{{ errorMessage }}</p>
                </div>

                <!-- Boutons d'action -->
                <div class="flex items-center justify-end gap-3 pt-4">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                        Annuler
                    </button>
                    <button @click="updateTask" :disabled="isSaving || isUploading"
                        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isSaving ? "Mise à jour..." : "Mettre à jour" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AppwriteuploadFile } from '@/app_write/files'
import { 
    XIcon, 
    PaperclipIcon, 
    FileIcon, 
    UserIcon, 
    UploadIcon,
    FileTextIcon,
    ImageIcon,
    VideoIcon,
    FolderIcon,
    CheckCircleIcon,
    ExternalLinkIcon
} from "lucide-vue-next";

// Props
const props = defineProps({
    taskData: {
        type: Object,
        required: true,
    },
    projectMembers: {
        type: Array,
        default: () => []
    },
});

// Emits
const emit = defineEmits(["close", "updated"]);

const route = useRoute()
const auth = useAuthStore()

// Reactive data
const isSaving = ref(false);
const isUploading = ref(false);
const fileInput = ref(null);
const newComment = ref("");
const errorMessage = ref('');

// Créer une copie locale des données de la tâche
const localTaskData = ref({
    id: props.taskData.id,
    slug:props.taskData.slug,
    name: props.taskData.name || props.taskData.title || "",
    description: props.taskData.description || "",
    priority: props.taskData.priority || "",
    status: props.taskData.status || "create",
    startDate: props.taskData.startDate || "",
    dueDate: props.taskData.dueDate || "",
    estimationTime: props.taskData.estimationTime || null,
    assigneeId: props.taskData.assigneeId || props.taskData.assignee?.id || null,
    step: {
        stepId: props.taskData.step?.id || null,
        name: props.taskData.step?.name || null,
    },
    comments: props.taskData.comments || [],
    files: props.taskData.files || [],
});

console.log("localTaskData:", localTaskData.value);

// Computed properties pour les dates
const formattedStartDate = computed({
    get() {
        if (!localTaskData.value.startDate) return ''
        if (/^\d{4}-\d{2}-\d{2}$/.test(localTaskData.value.startDate)) {
            return localTaskData.value.startDate
        }
        const date = new Date(localTaskData.value.startDate)
        if (isNaN(date.getTime())) return ''
        return date.toISOString().split('T')[0]
    },
    set(value) {
        localTaskData.value.startDate = value || ''
    }
})

const formattedDueDate = computed({
    get() {
        if (!localTaskData.value.dueDate) return ''
        if (/^\d{4}-\d{2}-\d{2}$/.test(localTaskData.value.dueDate)) {
            return localTaskData.value.dueDate
        }
        const date = new Date(localTaskData.value.dueDate)
        if (isNaN(date.getTime())) return ''
        return date.toISOString().split('T')[0]
    },
    set(value) {
        localTaskData.value.dueDate = value || ''
    }
})

// Methods for file management avec Appwrite
const handleMultipleFileSelection = (event) => {
    const files = Array.from(event.target.files)
    processFiles(files)
}

const processFiles = async (files) => {
    // Vérifier la limite de fichiers
    const remainingSlots = 3 - localTaskData.value.files.length
    const filesToProcess = files.slice(0, remainingSlots)
    
    if (files.length > remainingSlots) {
        errorMessage.value = `Vous ne pouvez ajouter que ${remainingSlots} fichier(s) supplémentaire(s).`
        setTimeout(() => errorMessage.value = '', 5000)
    }

    for (const file of filesToProcess) {
        // Vérifier la taille du fichier (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            errorMessage.value = `Le fichier "${file.name}" est trop volumineux (max 10MB).`
            setTimeout(() => errorMessage.value = '', 5000)
            continue
        }

        // Vérifier le type de fichier
        if (!isValidFileType(file)) {
            errorMessage.value = `Le fichier "${file.name}" n'est pas un type de fichier accepté.`
            setTimeout(() => errorMessage.value = '', 5000)
            continue
        }

        // Créer l'objet fichier avec le type formaté
        const fileObj = {
            name: file.name,
            size: file.size,
            type: formatFileType(file.type),
            file: file,
            uploading: false,
            uploaded: false,
            uploadProgress: 0,
            url: null
        }

        localTaskData.value.files.push(fileObj)

        // Upload vers Appwrite
        await uploadFile(fileObj)
    }

    // Reset input
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const uploadFile = async (fileObj) => {
    fileObj.uploading = true
    isUploading.value = true
    
    try {
        // Upload vers Appwrite
        const data = await AppwriteuploadFile(fileObj.file)
        
        if (data.isCreate) {
            // Construire l'URL comme dans accountDetail.vue
            const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL
            const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID
            const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID
            
            fileObj.url = `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`
            fileObj.uploaded = true
            fileObj.uploadProgress = 100
            
            console.log(`Fichier ${fileObj.name} uploadé avec succès`)
        } else {
            console.error('Erreur upload:', data.message)
            errorMessage.value = data.message || `Erreur lors de l'upload de ${fileObj.name}`
            
            // Retirer le fichier de la liste en cas d'erreur
            const index = localTaskData.value.files.findIndex(f => f.name === fileObj.name)
            if (index > -1) {
                localTaskData.value.files.splice(index, 1)
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'upload:', error)
        errorMessage.value = `Erreur lors de l'upload de ${fileObj.name}`
        
        // Retirer le fichier de la liste en cas d'erreur
        const index = localTaskData.value.files.findIndex(f => f.name === fileObj.name)
        if (index > -1) {
            localTaskData.value.files.splice(index, 1)
        }
    } finally {
        fileObj.uploading = false
        isUploading.value = localTaskData.value.files.some(f => f.uploading)
    }
}

const removeFile = (index) => {
    localTaskData.value.files.splice(index, 1)
}

const isValidFileType = (file) => {
    const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'video/mp4',
        'video/avi',
        'video/mov',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    return allowedTypes.includes(file.type)
}

const formatFileType = (mimeType) => {
    const typeMap = {
        'application/pdf': 'PDF',
        'image/jpeg': 'Image',
        'image/jpg': 'Image',
        'image/png': 'Image',
        'video/mp4': 'Vidéo',
        'video/avi': 'Vidéo',
        'video/mov': 'Vidéo',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Document'
    }
    return typeMap[mimeType] || 'Fichier'
}

const isDocumentFile = (type) => {
    return type && (type.includes('pdf') || type.includes('document') || type.includes('Document'))
}

const isImageFile = (type) => {
    return type && (type.includes('image') || type.includes('Image'))
}

const isVideoFile = (type) => {
    return type && (type.includes('video') || type.includes('Vidéo'))
}

const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const addComment = () => {
    if (newComment.value.trim()) {
        if (!localTaskData.value.comments) {
            localTaskData.value.comments = [];
        }

        localTaskData.value.comments.push({
            id: Date.now(),
            text: newComment.value,
            author: "Utilisateur actuel", // À remplacer par l'utilisateur connecté
            createdAt: new Date().toISOString(),
        });

        newComment.value = "";
    }
}

const updateTask = async () => {
    errorMessage.value = ''
    isSaving.value = true

    try {
        // Validation
        if (!localTaskData.value.name || !localTaskData.value.priority || 
            !localTaskData.value.startDate || !localTaskData.value.dueDate || 
            !localTaskData.value.estimationTime || !localTaskData.value.assigneeId) {
            errorMessage.value = "Veuillez remplir tous les champs obligatoires"
            return
        }

        // Validation des dates
        if (new Date(localTaskData.value.dueDate) < new Date(localTaskData.value.startDate)) {
            errorMessage.value = "La date d'échéance doit être postérieure à la date de début"
            return
        }

        const companyId = route.params.companyId
        const projectId = route.params.projectId

        
        // Préparer les données pour l'API
        const taskPayload = {
            name: localTaskData.value.name,
            description: localTaskData.value.description || '',
            priority: localTaskData.value.priority,
            status: localTaskData.value.status,
            startDate: localTaskData.value.startDate,
            dueDate: localTaskData.value.dueDate,
            estimationTime: localTaskData.value.estimationTime,
            assigneeId: localTaskData.value.assigneeId,
            files: localTaskData.value.files.filter(f => f.uploaded).map(f => ({
                name: f.name,
                size: f.size,
                type: f.type,
                url: f.url
            })),
            comments: localTaskData.value.comments
        }

        const response = await auth.api(
            'PUT',
            `/companies/${companyId}/projects/${projectId}/tasks/${localTaskData.value.slug}/update`,
            taskPayload,
            true
        )

        if (response.success) {
            emit('updated', response.data)
            console.log('Tâche mise à jour avec succès:', response.data)
        } else {
            errorMessage.value = response.message || 'Erreur lors de la mise à jour de la tâche'
        }
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error)
        errorMessage.value = 'Erreur lors de la mise à jour de la tâche'
    } finally {
        isSaving.value = false
    }
}

onMounted(() => {
    // Initialiser les fichiers existants avec les bonnes propriétés
    if (props.taskData.files) {
        localTaskData.value.files = props.taskData.files.map(file => ({
            ...file,
            uploaded: true,
            uploading: false,
            uploadProgress: 100
        }))
    }
})

const handleSubmit = async () => {
    await updateTask();
}
</script>

<style scoped>
/* Custom scrollbar for the form content */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>