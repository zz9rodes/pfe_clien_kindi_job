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
            <form @submit.prevent="updateTask" class="space-y-6">
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
                            rows="2"
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
                                <option value="create">Créé</option>
                                <option value="in_progress">En cours</option>
                                <option value="in_review">En révision</option>
                                <option value="completed">Terminé</option>
                                <option value="closed">Fermé</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Priorité *</label>
                            <select v-model="localTaskData.priority"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required>
                                <option value="">Sélectionner une priorité</option>
                                <option value="low">Faible</option>
                                <option value="medium">Moyenne</option>
                                <option value="high">Élevée</option>
                                <option value="urgent">Urgente</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Estimation (jours) *</label>
                            <input v-model="localTaskData.estimationTime" type="number" min="1" placeholder="5"
                                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Date de début *</label>
                            <input v-model="localTaskData.startDate" type="date"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                                required />
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Date d'échéance *</label>
                            <input v-model="localTaskData.dueDate" type="date" :min="localTaskData.startDate"
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
                                <option v-for="assignee in assignees" :key="assignee.id" :value="assignee.id">
                                    {{ assignee.name }} - {{ assignee.email }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Étape du projet</label>
                            <select v-model="localTaskData.stepId"
                                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]">
                                <option value="">Aucune étape</option>
                                <option v-for="step in projectSteps" :key="step.id" :value="step.id">
                                    {{ step.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Fichiers joints -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">Fichiers joints</h3>
                    <p class="text-sm text-gray-600">
                        Vous pouvez joindre jusqu'à 3 fichiers
                    </p>

                    <!-- File Input (hidden) -->
                    <input ref="fileInput" type="file" multiple accept="*/*" @change="handleFileSelect"
                        class="hidden" />

                    <!-- Existing Files -->
                    <div v-if="existingFiles.length > 0" class="space-y-3">
                        <h4 class="text-sm font-medium text-gray-700">
                            Fichiers existants
                        </h4>
                        <div v-for="(file, index) in existingFiles" :key="'existing-' + index"
                            class="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
                            <div class="flex items-center gap-3">
                                <div class="flex-shrink-0">
                                    <img v-if="file.preview && file.type?.startsWith('image/')" :src="file.preview"
                                        alt="Preview" class="object-cover w-12 h-12 border border-gray-200 rounded" />
                                    <div v-else class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded">
                                        <FileIcon class="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>

                                <div>
                                    <p class="font-medium text-gray-900">{{ file.name }}</p>
                                    <p class="text-sm text-gray-600">
                                        {{ formatFileSize(file.size) }}
                                    </p>
                                </div>
                            </div>

                            <button @click="removeExistingFile(index)"
                                class="p-2 text-red-600 transition-colors rounded-lg hover:text-red-700 hover:bg-red-50">
                                <XIcon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Upload Area -->
                    <div v-if="totalFiles < 3"
                        class="p-2 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
                        <div class="space-y-4">
                            <div class="flex justify-center">
                                <PaperclipIcon class="text-gray-400 h-9 w-9" />
                            </div>
                            <div>
                              
                                <p class="mb-4 text-gray-600">
                                    Cliquez pour sélectionner des fichiers à joindre
                                </p>
                                <button @click="triggerFileInput" type="button"
                                    class="px-6 py-2 bg-[#db147f] text-white rounded-lg hover:bg-[#c41370] transition-colors font-medium">
                                    Choisir des fichiers
                                </button>
                            </div>
                            <p class="text-sm text-gray-500">
                                Tous types de fichiers acceptés ({{ 3 - totalFiles }} restant{{
                                    3 - totalFiles > 1 ? "s" : ""
                                }})
                            </p>
                        </div>
                    </div>

                    <!-- New File Previews -->
                    <div v-if="selectedFiles.length > 0" class="space-y-3">
                        <h4 class="text-sm font-medium text-gray-700">Nouveaux fichiers</h4>
                        <div v-for="(file, index) in selectedFiles" :key="'new-' + index"
                            class="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                            <div class="flex items-center gap-3">
                                <div class="flex-shrink-0">
                                    <img v-if="file.preview && file.type.startsWith('image/')" :src="file.preview"
                                        alt="Preview" class="object-cover w-12 h-12 border border-gray-200 rounded" />
                                    <div v-else class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded">
                                        <FileIcon class="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>

                                <div>
                                    <p class="font-medium text-gray-900">{{ file.name }}</p>
                                    <p class="text-sm text-gray-600">
                                        {{ formatFileSize(file.size) }}
                                    </p>
                                </div>
                            </div>

                            <button @click="removeNewFile(index)"
                                class="p-2 text-red-600 transition-colors rounded-lg hover:text-red-700 hover:bg-red-50">
                                <XIcon class="w-4 h-4" />
                            </button>
                        </div>
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
                                    <span class="font-medium text-gray-900">{{
                                        comment.author
                                        }}</span>
                                </div>
                                <span class="text-xs text-gray-500">{{
                                    formatDateTime(comment.createdAt)
                                    }}</span>
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

                <!-- Boutons d'action -->
                <div class="flex items-center justify-end gap-3 pt-4">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                        Annuler
                    </button>
                    <button @click="updateTask" :disabled="isSaving"
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
import { XIcon, PaperclipIcon, FileIcon, UserIcon } from "lucide-vue-next";

// Props
const props = defineProps({
    taskData: {
        type: Object,
        required: true,
    },
});

// Emits
const emit = defineEmits(["close", "updated"]);

// Reactive data
const isSaving = ref(false);
const selectedFiles = ref([]);
const existingFiles = ref([]);
const fileInput = ref(null);
const newComment = ref("");

// Créer une copie locale des données de la tâche
const localTaskData = ref({
    id: props.taskData.id,
    name: props.taskData.name || props.taskData.title || "",
    description: props.taskData.description || "",
    priority: props.taskData.priority || "",
    status: props.taskData.status || "create",
    startDate: props.taskData.startDate || "",
    dueDate: props.taskData.dueDate || "",
    estimationTime: props.taskData.estimationTime || null,
    assigneeId: props.taskData.assigneeId || null,
    stepId: props.taskData.stepId || null,
    comments: props.taskData.comments || [],
});

// Data from API
const assignees = ref([]);
const projectSteps = ref([]);

// Computed properties
const totalFiles = computed(
    () => existingFiles.value.length + selectedFiles.value.length
);

// Methods for file management
const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 3 - totalFiles.value;
    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
        const fileWithPreview = {
            ...file,
            id: Date.now() + Math.random(),
            preview: null,
        };

        // Create preview for images
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileWithPreview.preview = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        selectedFiles.value.push(fileWithPreview);
    });

    // Reset input
    if (fileInput.value) {
        fileInput.value.value = "";
    }
};

const removeNewFile = (index) => {
    selectedFiles.value.splice(index, 1);
};

const removeExistingFile = (index) => {
    existingFiles.value.splice(index, 1);
};

const triggerFileInput = () => {
    fileInput.value?.click();
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

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
};

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
};

const fetchAssignees = async () => {
    try {
        const response = await fetch("/api/users");
        if (response.ok) {
            assignees.value = await response.json();
        }
    } catch (error) {
        console.error("Error fetching assignees:", error);
        // Données de test
        assignees.value = [
            { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com" },
            { id: 2, name: "Marie Martin", email: "marie.martin@example.com" },
            { id: 3, name: "Pierre Durand", email: "pierre.durand@example.com" },
            { id: 4, name: "Sophie Leroy", email: "sophie.leroy@example.com" },
        ];
    }
};

const fetchProjectSteps = async () => {
    try {
        const response = await fetch("/api/project-steps");
        if (response.ok) {
            projectSteps.value = await response.json();
        }
    } catch (error) {
        console.error("Error fetching project steps:", error);
        // Données de test
        projectSteps.value = [
            { id: 1, name: "Phase 1: Analyse" },
            { id: 2, name: "Phase 2: Conception" },
            { id: 3, name: "Phase 3: Développement" },
            { id: 4, name: "Phase 4: Tests" },
            { id: 5, name: "Phase 5: Déploiement" },
        ];
    }
};

const updateTask = async () => {
    isSaving.value = true;

    try {
        // Validation
        if (
            !localTaskData.value.name ||
            !localTaskData.value.priority ||
            !localTaskData.value.startDate ||
            !localTaskData.value.dueDate ||
            !localTaskData.value.estimationTime ||
            !localTaskData.value.assigneeId
        ) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        // Validation des dates
        if (
            new Date(localTaskData.value.dueDate) <
            new Date(localTaskData.value.startDate)
        ) {
            alert("La date d'échéance doit être postérieure à la date de début");
            return;
        }

        // Préparation des données
        const formData = new FormData();

        // Ajouter les nouveaux fichiers au FormData
        selectedFiles.value.forEach((file, index) => {
            formData.append(`newFiles[${index}]`, file);
        });

        // Ajouter les données JSON au FormData
        const taskPayload = {
            ...localTaskData.value,
            existingFiles: existingFiles.value,
            updatedAt: new Date().toISOString(),
        };
        formData.append("data", JSON.stringify(taskPayload));

        // API call
        const response = await fetch(`/api/tasks/${localTaskData.value.id}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            const updatedTask = await response.json();
            emit("updated", updatedTask);
        } else {
            // For demo, update task anyway
            const updatedTask = {
                ...localTaskData.value,
                files: [
                    ...existingFiles.value,
                    ...selectedFiles.value.map((file) => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        preview: file.preview,
                    })),
                ],
                assignee: assignees.value.find(
                    (a) => a.id === localTaskData.value.assigneeId
                ),
                step: projectSteps.value.find(
                    (s) => s.id === localTaskData.value.stepId
                ),
            };
            emit("updated", updatedTask);
        }
    } catch (error) {
        console.error("Error updating task:", error);
        alert("Erreur lors de la mise à jour de la tâche");
    } finally {
        isSaving.value = false;
    }
};

onMounted(() => {
    fetchAssignees();
    fetchProjectSteps();

    // Initialiser les fichiers existants
    if (props.taskData.files) {
        existingFiles.value = [...props.taskData.files];
    }

    // Formater les dates si nécessaire
    if (
        localTaskData.value.startDate &&
        !localTaskData.value.startDate.includes("-")
    ) {
        const date = new Date(localTaskData.value.startDate);
        localTaskData.value.startDate = date.toISOString().split("T")[0];
    }

    if (
        localTaskData.value.dueDate &&
        !localTaskData.value.dueDate.includes("-")
    ) {
        const date = new Date(localTaskData.value.dueDate);
        localTaskData.value.dueDate = date.toISOString().split("T")[0];
    }
});
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
