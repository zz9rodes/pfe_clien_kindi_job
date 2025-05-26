<template>
  <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">

    <div
      class="bg-white mx-3 rounded-md flex flex-col w-96 min-h-52 shadow-lg max-h-[70vh] overflow-y-auto modal-container">
      <div
        class="relative py-2 justify-center items-center w-[200px ] border border-gray-300 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:border-[#e4097f]">
        <input type="text" placeholder="What do you  looking for today?"
          class="w-full pl-3 pr-3 leading-5 placeholder-gray-500 border-none outline-none" v-model="searchQuery"
          @input="HandleGlobalSearch" />
      </div>

      <div class="flex items-center justify-center flex-1 h-full">
        <div v-if="isSearchLoading">
          <svg class="container" x="0px" y="0px" viewBox="0 0 37 37" height="37" width="37"
            preserveAspectRatio="xMidYMid meet">
            <path class="track" fill="none" stroke-width="5" pathLength="100"
              d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5">
            </path>
            <path class="car" fill="none" stroke-width="5" pathLength="100"
              d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5">
            </path>
          </svg>
        </div>
        <div v-else>
          Not Found Result
        </div>
      </div>
    </div>
  </AppModal>
  <accountHeader @open-search-modal="toggleOpenModal" />
  <div class="h-screen bg--500">
    <div class="flex max-h-[100vh]">
      <div id="desktopSideBar" :class="[
        ' shadow-lg   transition-all duration-300 ease-in relative z-[10] hidden sm:block  mt-[60px]',
        isExpanded ? 'w-48' : 'w-16',
      ]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <nav class="px-2 mt-3 ">
          <div class="space-y-2">
            <div v-for="(item, index) in menuItems" :key="item.title" class="relative font-bold group">
              <a :href="item.link" :class="[
                'flex items-center px-3 py-2 rounded-md transition-all duration-200 relative overflow-hidden',
                item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
              ]" @click="setActiveItem(index)">
                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
                  <component :is="item.icon" :class="[
                    'h-3 w-3 group-hover:h-4 group-hover:w-4 transition-colors duration-200',
                    item.active ? 'text-[#db147f] h-5 w-5' : '',
                  ]" />
                </div>
                <div :class="[
                  'ml-3 transition-all duration-300 ease-in-out',
                  isExpanded
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2',
                ]">
                  <span class="text-sm whitespace-nowrap">
                    {{ item.title }}
                  </span>
                </div>
              </a>

              <div v-if="!isExpanded"
                class="absolute z-50 px-2 py-1 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
                {{ item.title }}
                <div
                  class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900">
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200">
          <div class="relative group">
            <a href="/profile"
              class="flex items-center px-3 py-3 text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900">
              <!-- User Avatar -->
              <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
                <img src="/src/assets/logo.svg" alt="Profile" class="w-6 h-6 rounded-full" />
              </div>

              <!-- User Info -->
              <div :class="[
                'ml-3 transition-all duration-300 ease-in-out',
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              ]">
                <div class="text-sm font-medium whitespace-nowrap">John Doe</div>
              </div>
            </a>

            <!-- Profile Tooltip -->
            <div v-if="!isExpanded"
              class="absolute z-50 px-2 py-1 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
              Profile
              <div
                class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900">
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Le Menu Pour Les  Screen  Mobile  -->
      <div class="p-1 ">
        <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 sm:hidden">
          <div class="flex items-center justify-around h-16 gap-2 px-2 ">
              <button @click="toggleUserMenu" class="flex flex-col items-center justify-center flex-1 py-2 text-gray-400">
              <img src="/src/assets/logo.svg" alt="Profile" class="w-6 h-6 rounded-full" />
            </button>
            <button v-for="(item, index) in MoibilemenuItems" :key="item.title" @click="setActiveMobileItem(index)" :class="[
              'flex flex-col items-center   justify-center rounded-md flex-1 py-2 transition-colors duration-200',
                item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
            ]" class="flex items-center justify-center flex-1 gap-1 px-2 py-2 text-sm font-medium rounded-md cursor-pointer ">
              <div class="relative">
                <component :is="item.icon" class="w-6 h-5" />
              </div>
            </button>

          
            <button @click="toggleUserMenu" class="flex flex-col items-center justify-center flex-1 py-2 text-gray-400">
              <Menu  class="w-5 h-6 transition-colors duration-200 group-hover:h-4 group-hover:w-4" />
            </button>
          </div>
        </nav>
      </div>


      <div class="mt-[50px] pb-[100px] pt-9  px-8 overflow-auto">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
        consequuntur inventore rem explicabo ea, nulla fugit earum sunt optio
        vel ullam voluptate modi ut quo quas ab nihil quis at?

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem libero beatae aspernatur obcaecati nesciunt nam odit possimus voluptatem, quam qui officia quasi consectetur minima nulla accusantium, unde facere repudiandae, iusto repellat harum aliquid quibusdam laboriosam sed expedita. Laudantium explicabo beatae voluptate accusantium vitae earum cum est eius ducimus? Aspernatur veniam incidunt similique, tempora explicabo praesentium. Amet, neque. Est ut magnam expedita nobis, quidem a accusamus magni dolore deserunt assumenda cupiditate voluptas aut soluta impedit obcaecati quisquam incidunt eveniet ipsam. Harum sunt aut tempora et repellendus ut, illum deserunt similique minus doloribus illo officia? Id fugit, molestiae ipsa aperiam alias sunt culpa veniam minus perferendis eius explicabo necessitatibus, cumque quia distinctio! Adipisci amet qui animi dolores eligendi laudantium corrupti rem libero sapiente ipsum iure quisquam ullam nisi eum magnam, aspernatur consectetur iusto in ex? Modi exercitationem, earum quibusdam temporibus id eum eligendi maiores dignissimos, aspernatur veritatis nulla sequi reprehenderit repellendus nam quo! Molestiae ad rem deleniti voluptatem amet iste explicabo, neque officiis dignissimos? Officiis repudiandae veniam odio? Nihil pariatur eaque saepe explicabo ut veniam corrupti deserunt esse voluptates reprehenderit! Id, pariatur tempora necessitatibus ipsam quia, debitis eos natus deleniti magni vel et quidem impedit, incidunt amet maiores laudantium sed! Amet nisi ad ullam aspernatur esse aut cum laborum, ea nihil nobis, quo est voluptatum cumque odit accusantium quaerat error veniam temporibus mollitia. Quaerat distinctio tenetur itaque id. Libero, omnis. Officiis earum aliquid tempore repudiandae ea, impedit corrupti, nihil optio eveniet, tenetur ipsam inventore recusandae molestiae perspiciatis. Perspiciatis aliquam omnis suscipit totam reiciendis error architecto, cupiditate excepturi impedit ea dicta sequi itaque, saepe nobis explicabo fugiat. Doloribus eum, debitis, ipsa dolores amet, eligendi earum deserunt possimus blanditiis vel quisquam eius. Accusamus iure quos reprehenderit eligendi, porro in id, autem temporibus cumque consequatur voluptatibus eveniet repudiandae nemo. Possimus, sint. Nostrum cum adipisci assumenda, ex fuga voluptatum eos at ducimus accusantium. Pariatur, nulla. Esse, asperiores sunt nobis adipisci eum consectetur accusantium dignissimos neque provident doloremque dolorum? Quis aliquid eveniet, animi in nulla voluptate nihil consectetur! Pariatur ipsa quaerat ratione laboriosam itaque exercitationem sed optio eos libero, delectus modi esse fugit incidunt, eveniet unde! Fugiat maxime quaerat possimus temporibus reiciendis eaque repudiandae, repellat optio harum ad at, unde explicabo neque amet blanditiis ea? Odit, molestias sequi facere asperiores similique itaque eius veniam nisi consequatur facilis, in porro quisquam fugiat quo praesentium cumque voluptatibus amet repellat et maiores! Possimus, rerum illo. Eius eligendi eveniet et inventore.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam enim, aliquam rem placeat magni vero, asperiores temporibus facilis natus iure recusandae nesciunt! At quod veniam porro omnis, nobis alias architecto temporibus hic cum quaerat consectetur vel? Dolorum, nobis quas. Quibusdam deleniti cum libero debitis voluptatibus reprehenderit iste corporis ducimus, vero nesciunt dolorem animi laboriosam ratione necessitatibus sapiente doloribus reiciendis ad quod blanditiis accusantium aut temporibus rerum dolor nostrum. Aliquam aliquid, veritatis corporis expedita aut, fugiat labore eligendi sit, quod eum officiis fugit aspernatur perspiciatis? Porro deleniti tempore iste dolorum omnis vel voluptatibus nemo ipsa dignissimos inventore cum similique labore repellat quae, eaque velit minima ea adipisci debitis molestiae perspiciatis, voluptatum quidem? Vel veniam est porro repellat vero dolorum ratione architecto. Esse unde excepturi adipisci dicta sint, nihil eum eos hic aspernatur quidem officia doloremque suscipit nostrum aliquam, dolorum vel laudantium, illum obcaecati ut animi quod? Ipsam laborum numquam dolor quos consectetur ea reiciendis quibusdam quae delectus et accusantium officiis neque praesentium perferendis perspiciatis unde sint earum assumenda quisquam voluptatem veniam, facilis ad repellat omnis. Rem voluptatum modi eum eos? Obcaecati officia culpa facere quam, nesciunt doloremque quo cumque eveniet velit porro excepturi totam illo qui praesentium reprehenderit nulla in esse veritatis. Assumenda quaerat, delectus, fugit quis rerum unde totam temporibus ex est molestias cupiditate expedita ducimus amet. Dolores atque sapiente libero quis aut dignissimos pariatur ab. Accusamus ipsa hic maxime, itaque illum in necessitatibus molestiae quae dicta repellat blanditiis, eaque aliquid! Perferendis ratione asperiores repellat, temporibus rem recusandae molestias! Aliquam, adipisci libero! Repellat eveniet mollitia, iusto impedit fugiat odit maxime sapiente porro et nemo delectus molestiae cupiditate sed quos iure repudiandae aspernatur nisi earum dolorem totam laboriosam aperiam magnam nostrum. Quibusdam eum ipsam voluptatem minima a laudantium facilis itaque porro consequatur, consectetur eius reiciendis id nam dolorum? Dolorem, alias ab.
      </div>
      </div>
      
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import accountHeader from "@/components/accountDashboard/accountHeader.vue";
import AppModal from "@/components/globales/AppModal.vue";
import {
  Menu,
  Home,
  Heart,
  Calendar,
  MessageSquare,
  MessageCircleMore,
  Settings,
  BarChart3,
  MenuIcon,
  Users,
  FileText,
} from "lucide-vue-next";

// État de la sidebar
const isExpanded = ref(false);
const hoverTimeout = ref(null);
const searchQuery = ref("");
const isSearchLoading = ref(false)
const isModalOpen = ref(false)
// Menu items
const menuItems = ref([
  {
    icon: Home,
    title: "Dashboard",
    link: "#",
    active: true,
    badge: null,
  },
  {
    icon: Heart,
    title: "Contracts",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: Calendar,
    title: "Jobs",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: MessageCircleMore,
    title: "Applies",
    link: "#",
    active: false,
    badge: 3,
  },
  {
    icon: Users,
    title: "Projects",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Invoices",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: FileText,
    title: "Reviews",
    link: "#",
    active: false,
    badge: null,
  }
]);


const MoibilemenuItems = ref([
  {
    icon: Home,
    title: "Dashboard",
    link: "#",
    active: true,
    badge: null,
  },
    {
    icon: MessageCircleMore,
    title: "Applies",
    link: "#",
    active: false,
    badge: 3,
  },
    {
    icon: BarChart3,
    title: "Invoices",
    link: "#",
    active: false,
    badge: null,
  }
]);

const OvarleyMenuItems=[
  ,
  {
    icon: Heart,
    title: "Contracts",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: Calendar,
    title: "Jobs",
    link: "#",
    active: false,
    badge: null,
  },

  {
    icon: Users,
    title: "Projects",
    link: "#",
    active: false,
    badge: null,
  },

  {
    icon: FileText,
    title: "Reviews",
    link: "#",
    active: false,
    badge: null,
  }
]


const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value
};

const HandleGlobalSearch = () => {
  if (searchQuery.value.length > 2) {
    isSearchLoading.value = true
    setTimeout(() => {
      isSearchLoading.value = false
    }, 3000)
  }
}

const handleMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
  hoverTimeout.value = setTimeout(() => {
    if (!isExpanded.value) {
      isExpanded.value = true;
    }
  });
};

const handleMouseLeave = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
  hoverTimeout.value = setTimeout(() => {
    isExpanded.value = false;
  });
};

const setActiveItem = (index) => {
  menuItems.value.forEach((item, i) => {
    item.active = i === index;
  });
};

const setActiveMobileItem = (index) => {
  MoibilemenuItems.value.forEach((item, i) => {
    item.active = i === index;
  });
};
</script>

<style scoped>
/* Animations personnalisées */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Smooth transitions pour tous les éléments */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

<style scoped>
.container {
  --uib-size: 37px;
  --uib-color: black;
  --uib-speed: 0.9s;
  --uib-bg-opacity: 0.1;
  height: var(--uib-size);
  width: var(--uib-size);
  transform-origin: center;
  overflow: visible;
}

.car {
  fill: none;
  stroke: var(--uib-color);
  stroke-dasharray: 15, 85;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: travel var(--uib-speed) linear infinite;
  will-change: stroke-dasharray, stroke-dashoffset;
  transition: stroke 0.5s ease;
}

.track {
  stroke: var(--uib-color);
  opacity: var(--uib-bg-opacity);
  transition: stroke 0.5s ease;
}

@keyframes travel {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -100;
  }
}
</style>
