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
import ContractPreview from "@/views/ContractPreview.vue";
import CompanieTeamMember from "@/components/compnanies/CompanieTeamMember.vue";

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
          path: "list-jobs",
          name: "jobs",
          component: ListJobs,
        },
        {
          path: "list-jobs/:id/jobs_details",
          name: "jobs_details",
          component: JobOffersDetails,
        },
        {
          path: "/list-companies",
          name: "companies",
          component: LisCompanies,
        },
        {
          path: "/list-freelancers",
          name: "freelancers",
          component: ListFreelancers,
        },
      ],
    },
    {
      path: "/account",
      name: "account",
      component: AccountDashboard,
      children: [
        {
          path: "profile",
          name: "profile",
          component: AccountProfile,
        },
        {
          path: "companies",
          redirect: "account/profile/?tab=companies",
          children: [
            {
              path: ":id/companie-details",
              name: "companie_details",
              component: CompanieDetail,
            },
          ],
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
          path: "team-members",
          name: "team_members",
          component: CompanieTeamMember,
        },
        {
          path: "list-news",
          name: "list_news",
          component: ListNews,
        },
        {
          path: "create_cv_profile",
          name: "create_cv_profile",
          component: Form_Create_or_Update_Cv_Profile,
        },
        {
          path: "create_job",
          name: "create_job",
          component: Form_Create_Job_Offers,
        },
        {
          path: "contract_creator",
          name: "contract_creator",
          component: FormContractCreator,
        },
        {
          path: "contract_preview",
          name: "contract_preview",
          component: ContractPreview,
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/auth/register",
      name: "register",
      component: RegisterForm,
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
      path: "/portofolio",
      name: "portofolio",
      component: Portofolio,
    },
  ],
});

export default router;
