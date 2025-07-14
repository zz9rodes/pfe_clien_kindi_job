import { createRouter, createWebHistory } from "vue-router";
import ListJobs from "../views/ListJobs.vue";
import HomeView from "@/views/HomeView.vue";
import LisCompanies from "@/views/LisCompanies.vue";
import ListFreelancers from "@/views/ListFreelancers.vue";
import RegisterForm from "@/components/authFom/registerForm.vue";
import LoginForm from "@/components/authFom/loginForm.vue";
import BaseLayout from "@/views/BaseLayout.vue";
import forgotPasswordForm from "@/components/authFom/forgotPasswordForm.vue";
import ResetPasswordForm from "@/components/authFom/resetPasswordForm.vue";
import AccountDashboard from "@/views/AccountLayout.vue";
import AccountProfile from "@/views/accountProfile.vue";
import CompanieDetail from "@/views/CompanieDetail.vue";
import ListNews from "@/views/ListNews.vue";
import Form_Create_or_Update_Cv_Profile from "@/views/Form_Create_or_Update_Cv_Profile.vue";
import Portofolio from "@/views/Portofolio.vue";
import Form_Create_Job_Offers from "@/views/Form_Create_Job_Offers.vue";
import JobOffersDetails from "@/views/JobOffersDetails.vue";
import FormContractCreator from "@/views/FormContractCreator.vue";
// import ContractPreview from "@/views/ContractPreview.vue";
import CompanieTeamMember from "@/components/compnanies/CompanieTeamMember.vue";
import PreviewContract from "@/views/ContractItemPreviewContract.vue";
import ListContract from "@/views/ListContract.vue";
import FormUpdateContract from "@/views/FormUpdateContract.vue";
import ExempleUpdatContract from "@/views/ExempleUpdatContract.vue";
import FormCreateJob from "@/views/FormCreateJob.vue";
import FormUpdateJobs from "@/views/FormUpdateJobs.vue";
import ProjectManagement from "@/views/ProjectManagement.vue";
import ProjectTasksView from "@/views/ProjectTasksView.vue";
import DrawSigrature from "@/components/profile/drawSigrature.vue";
import AccountDetail from "@/components/profile/accountDetail.vue";
import AccountCompanies from "@/views/AccountCompanies.vue";
import CompanyVersionsPage from "@/views/CompanyVersionsPage.vue";
import CompanieVersionDemo from "@/views/CompanieVersionDemo.vue";
import AdminDashBoard from "@/views/AdminDashBoard.vue";
import CompanyDetailsPage from "@/components/compnanies/CompanyDetailsPage.vue";
import AdminCompanieVersionView from "@/components/compnanies/AdminCompanieVersionView.vue";
import CompanieJobList from "@/components/compnanies/companieJobList.vue";
import AdminProfile from "@/views/AdminProfile.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import JobApplicantsList from "@/views/JobApplicantsList.vue";
import UserJobSApplication from "@/views/UserJobSApplication.vue";
import AgreementsList from "@/views/AgreementsList.vue";
import SignedContractDisplay from "@/views/SignedContractDisplay.vue";
import ExampleUsage from "@/components/globales/ExampleUsage.vue";
import ProjectDetailsPage from "@/views/ProjectDetailsPage.vue";
import GuestProjectManagement from "@/views/GuestProjectManagement.vue";
import CompaniesGuestList from "@/views/CompaniesGuest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: BaseLayout,
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "app/list-jobs",
          name: "jobs",
          component: ListJobs,
        },
        {
          path: "app/list-jobs/:id/jobs_details",
          name: "jobs_details",
          component: JobOffersDetails,
        },
        {
          path: "app/list-companies",
          name: "companies",
          component: LisCompanies,
        },
        {
          path: "app/companies/:companyId/companie-details",
          name: "companie_details",
          component: CompanieDetail,
        },
        {
          path: "app/list-freelancers",
          name: "freelancers",
          component: ListFreelancers,
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminDashBoard,
      meta: { requiresAuth: true },
      redirect: { name: "admin_companies" },
      children: [
        {
          path: "profile",
          name: "admin_profile",
          component: AdminProfile,
          redirect: { name: "admin_companies" },
          meta: { requiresAuth: true },
          children: [
            {
              path: "details",
              name: "admin_profile_details",
              component: AccountDetail,
            },
            {
              path: "signature",
              name: "admin_signature",
              component: DrawSigrature,
              meta: { requiresAuth: true },
            },
            {
              path: "cv_profile",
              name: "admin_cv_profile",
              component: Form_Create_or_Update_Cv_Profile,
            },
          ],
        },
        {
          path: "companies",
          name: "admin_companies",
          component: CompanyVersionsPage,
          meta: { requiresAuth: true },
        },
        {
          path: "companies_version/:companyId",
          name: "companies_version",
          component: AdminCompanieVersionView,
        },
        {
          path: "companies_version/:companyId/details",
          name: "companies_version_details",
          component: CompanyDetailsPage,
          props: { showAction: false, isVersion: true },
        },
        {
          path: "companie_request/:companyId/details",
          name: "admin_companie_details",
          component: CompanyDetailsPage,
        },
      ],
    },
    {
      path: "/account",
      name: "account",
      redirect: { name: "profile" },
      component: AccountDashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "profile",
          name: "profile",
          component: AccountProfile,
          redirect: { name: "profile_details" },
          children: [
            {
              path: "details",
              name: "profile_details",
              component: AccountDetail,
            },
            {
              path: "companies/version/:versionId?",
              name: "companie_versions",
              component: CompanieVersionDemo,
            },
            {
              path: "companies",
              name: "profile_companies",
              component: AccountCompanies,
            },
            {
              path: "cv_profile",
              name: "cv_profile",
              component: Form_Create_or_Update_Cv_Profile,
            },
            {
              path: "signature",
              name: "signature",
              component: DrawSigrature,
            },
          ],
        },
        {
          path: "companies",
          redirect: "account/profile/?tab=companies",
          children: [
            {
              path: ":companyId/create_job",
              name: "create_job",
              component: Form_Create_Job_Offers,
            },
            {
              path: ":companyId/companie-details",
              name: "me_companie_details",
              component: CompanieDetail,
              props: { isAdmin: true },
            },
            {
              path: ":companyId/update_job/:jobId",
              name: "update_job",
              component: FormUpdateJobs,
            },
            {
              path: ":companyId/team-members",
              name: "team_members",
              component: CompanieTeamMember,
            },
            {
              path: ":companyId/list-jobs",
              name: "companie_list_jobs",
              component: CompanieJobList,
              props: { isAdmin: true },
            },
            {
              path: ":companyId/list_projects",
              name: "list_projects",
              component: ProjectManagement,
            },
            {
              path: ":companyId/guest/list_projects",
              name: "guest_list_projects",
              component: GuestProjectManagement,
            },
            {
              path: ":companyId/list_projects/:projectId/project_tasks",
              name: "project_tasks",
              component: ProjectDetailsPage /*ProjectTasksView*/,
            },
            {
              path: ":companyId/contracts/create",
              name: "contract_creator",
              component: FormContractCreator,
            },
            {
              path: ":companyId/contracts/",
              name: "contract_list",
              component: ListContract,
            },
            {
              path: ":companyId/contracts/:contractId",
              name: "update_contract",
              component: FormUpdateContract,
            },
            {
              path: ":companyId/job/:jobId/list-applications",
              name: "list_applications",
              component: JobApplicantsList,
            },
          ],
        },
        {
          path: "job_applies",
          name: "my_applications",
          component: UserJobSApplication,
        },
        {
          path: "list_companie_invitations",
          name: "list_companie_invitations",
          component: CompaniesGuestList,
        },
        {
          path: "list_agrement",
          name: "list_agrement",
          component: AgreementsList,
        },
        {
          path: "l_jobs",
          name: "l_jobs",
          component: ListJobs,
        },
        {
          path: "l_jobs/:id/jobs_details",
          name: "account_jobs_details",
          component: JobOffersDetails,
        },
        {
          path: "list-news",
          name: "list_news",
          component: ListNews,
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/auth/:type/register",
      name: "register",
      component: RegisterForm,
      beforeEnter: (to, from, next) => {
        if (to.params.type !== "personnal" && to.params.type !== "companies") {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/auth/password-forgot",
      name: "password_forgot",
      component: forgotPasswordForm,
    },
    {
      path: "/auth/reset-password",
      name: "reset_password",
      component: ResetPasswordForm,
    },
    {
      path: "/contracts/:contractId/preview",
      name: "contract_preview",
      component: PreviewContract,
    },
    {
      path: "/app/agrements/:agrementId/preview",
      name: "preview_agrement",
      component: SignedContractDisplay,
    },
    {
      path: "/portofolio/:cvId?",
      name: "portofolio",
      component: Portofolio,
    },
    {
      path: "/deoma/",
      name: "deoma",
      component: ExampleUsage,
    },
  ],
});

const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });

// Middleware d'authentification
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  // Si la route nécessite l'authentification
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.token || !auth.user) {
      notyf.error("You Need to Be Login");
      return next({ name: "login" });
    }
  }
  next();
});

// Middleware pour vérifier la présence de l'attribut 'account' dans user
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  // Liste des routes à protéger par la présence de l'account
  const routesNeedAccount = [
    "admin_signature",
    "profile_details",
    "companie_versions",
    "profile_companies",
    "cv_profile",
    "signature",
    // Ajoute ici d'autres routes si besoin
    "create_job",
    "me_companie_details",
    "update_job",
    "team_members",
    "companie_list_jobs",
    "list_projects",
    "project_tasks",
    "contract_creator",
    "contract_list",
    "update_contract",
    // Routes admin companies
    "admin_companies",
    "companies_version",
    "companies_version_details",
    "admin_companie_details",
    "admin_cv_profile",
  ];
  if (
    routesNeedAccount.includes(to.name) &&
    (!auth.user || !auth.user.account)
  ) {
    // Vérifie si c'est la dernière route matched
    if (to.matched[to.matched.length - 1].name === to.name) {
      if (
        to.name !== "profile_details" &&
        to.name !== "admin_profile_details"
      ) {
        notyf.error("You Need to Complete Your Profile Before");
      }
    }
    if (auth.user?.isAdmin) {
      return next({ name: "admin_profile_details" });
    }
    return next({ name: "profile_details" });
  }
  next();
});

const isAuthentificated = () => {
  const token = ref(localStorage.getItem("token"));

  return token.value ? true : false;
};

// router.beforeEach(async (to, from, next) => {
//   console.log(to);

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (isAuthentificated()) {
//       next();
//     } else {
//       next({ name: 'login' });
//     }
//   } else if ((to.path.includes('auth') ) && isAuthentificated()) {
//     next({ name: 'events' });
//   } else {
//     next();
//   }
// });

export default router;
