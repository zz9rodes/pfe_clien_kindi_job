<template>
  <div class="container px-4 py-8 mx-auto mt-24">
    <AppInputFilterFreelancer/>
    <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        <FreelancerCard  
            @click="viewProfile(freelancer)"
            v-for="freelancer in freelancers" 
            :key="freelancer.id" 
            :freelancer="freelancer"
        />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const emit=defineEmits()
import AppInputFilterFreelancer from '@/components/AppInputFilterFreelancer.vue'
import FreelancerCard from '@/components/FreelancerCard.vue'

    const      freelancers= ref( [
        {
          id: 1,
          name: 'Kristin Watson',
          title: 'UX Designer',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          rating: 4.9,
          reviewCount: 302,
          skills: ['Figma', 'Sketch', 'HTML5', 'CSS3', 'JavaScript'],
          location: 'London',
          hourlyRate: 90,
          jobSuccess: 98,
          isOnline: true
        },
        {
          id: 2,
          name: 'Darrell Steward',
          title: 'Mobile App Developer',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          rating: 4.8,
          reviewCount: 256,
          skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
          location: 'London',
          hourlyRate: 85,
          jobSuccess: 96,
          isOnline: false
        },
        {
          id: 3,
          name: 'Theresa Webb',
          title: 'Marketing Consultant',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          rating: 4.9,
          reviewCount: 189,
          skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
          location: 'London',
          hourlyRate: 75,
          jobSuccess: 94,
          isOnline: true
        },
        {
          id: 4,
          name: 'Jerome Bell',
          title: 'Full Stack Developer',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          rating: 4.7,
          reviewCount: 423,
          skills: ['React', 'Node.js', 'Python', 'PostgreSQL'],
          location: 'New York',
          hourlyRate: 95,
          jobSuccess: 97,
          isOnline: true
        },
        {
          id: 5,
          name: 'Arlene McCoy',
          title: 'Graphic Designer',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          rating: 4.8,
          reviewCount: 167,
          skills: ['Photoshop', 'Illustrator', 'InDesign'],
          location: 'Paris',
          hourlyRate: 65,
          jobSuccess: 95,
          isOnline: false
        },
        {
          id: 6,
          name: 'Brooklyn Simmons',
          title: 'Data Scientist',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          rating: 4.9,
          reviewCount: 234,
          skills: ['Python', 'Machine Learning', 'SQL'],
          location: 'Berlin',
          hourlyRate: 110,
          jobSuccess: 99,
          isOnline: true
        }
      ])

   const viewProfile=(freelancer) =>{
      emit('view-profile', freelancer);
      console.log('Viewing profile for:', freelancer.name);
    }
   const  loadMore=()=> {
      emit('load-more');
      console.log('Loading more freelancers...');
    }

</script>

<style scoped>
.freelancer-card:hover .profile-image {
  transform: scale(1.1);
}

* {
  transition: all 0.2s ease;
}
</style>
