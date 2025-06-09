<template>
    <div class="w-full mx-auto ">
        <div class="container px-4 mx-auto mt-8">
            <div class="overflow-hidden bg-gray-100 rounded-3xl">
                <div class="flex flex-col-reverse">
                    <div class="w-full p-4 lg:p-8 ">
                        <div class="flex-wrap gap-2 mb-8 lg:flex">
                            <button v-for="category in categories" :key="category"
                                @click="handleCategoryClick(category)" :class="[
                                    'px-4 py-2 rounded-full text-sm font-medium',
                                    activeCategory === category
                                        ? 'bg-[#e4097f] text-white'
                                        : 'text-gray-700 bg-white border border-gray-300'
                                ]">
                                {{ category }}
                            </button>
                         
                        </div>
                        <div>
                            <form class="flex flex-col gap-3 sm:gap-0 sm:flex-row" @submit.prevent="handleFilter">
                                <input type="text" v-model="localFilters.keywords" @input="updateFilters"
                                    placeholder="Search by job, keyword, or company"
                                    class="rounded-l-full rounded-r-full sm:rounded-r-none  border border-gray-300 border-r-0 lg:h-14 pl-6 pr-4 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#e4097f] h-12" />
                                <input v-model="localFilters.location" @input="updateFilters"
                                    placeholder="City, state or country"
                                    class="rounded-l-full rounded-r-full sm:rounded-r-none sm:rounded-l-none border border-gray-300 border-r-0 lg:h-14 pl-6 pr-4 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#e4097f] h-12" />
                                <input v-model="localFilters.language" @input="updateFilters"
                                    placeholder="Programming language or skill"
                                    class="rounded-l-full sm:rounded-l-none rounded-r-full sm:rounded-r-none border border-gray-300 border-r-0 lg:h-14 pl-6 pr-4 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#e4097f] h-12" />
                                <button
                                    class="sm:rounded-l-none rounded-l-full mr-3 lg:h-14 h-12 rounded-r-full bg-[#e4097f] hover:bg-[#c8076f] px-6 text-white ">
                                    <SearchIcon class="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { SearchIcon, MoreHorizontalIcon } from 'lucide-vue-next';

const props = defineProps({
    filters: {
        type: Object,
        default: () => ({
            keywords: '',
            location: '',
            language: ''
        })
    },
    resultsCount: {
        type: Number,
        default: null
    }
});

const emit = defineEmits(['update:filters', 'search']);
const localFilters = ref({
    keywords: props.filters.keywords,
    location: props.filters.location,
    language: props.filters.language
});

const quickFilters = ref([
    {
        id: 'remote',
        label: 'Remote work',
        active: false,
        icon: 'HomeIcon'
    },
    {
        id: 'childcare',
        label: 'Childcare',
        active: false,
        icon: 'HeartIcon'
    },
    {
        id: 'education',
        label: 'Education',
        active: false,
        icon: 'AcademicCapIcon'
    },
    {
        id: 'fulltime',
        label: 'Full-time',
        active: false,
        icon: 'ClockIcon'
    }
]);

const categories = ref(['Category1', 'Category2', 'Category3']);
const activeCategory = ref(null);


watch(() => props.filters, (newFilters) => {
    localFilters.value = { ...newFilters };
}, { immediate: true, deep: true });

const updateFilters = () => {
    emit('update:filters', { ...localFilters.value });
};

const handleFilter = () => {
    emit('search', {
        ...localFilters.value,
        quickFilters: quickFilters.value.filter(f => f.active).map(f => f.id)
    });
};


const handleCategoryClick = (category) => {
    activeCategory.value = category;
    localFilters.value.keywords = category;
};

</script>

<style scoped></style>