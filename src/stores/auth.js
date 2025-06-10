import { ref, unref } from "vue";
import { defineStore,acceptHMRUpdate } from "pinia";
// import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useRouter } from 'vue-router';
const router=useRouter()

console.log(router)
export const useAuthStore = defineStore("auth", () => {
  const user = localStorage.getItem("user")
    ? ref(JSON.parse(localStorage.getItem("user")))
    : ref(null);
  const token = ref(localStorage.getItem("token"));

    const userCompany = localStorage.getItem("company")
    ? ref(JSON.parse(localStorage.getItem("company")))
    : ref(null);

  async function api(method, url, payload = {}, notify = true) {
    const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });
    console.log("la methode : ",method)
    try {
      const response = await fetch(`http://localhost:3333/v1/api${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: method !== "GET" ? JSON.stringify(unref(payload)) : undefined,
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        notyf.error("Erreur : réponse non lisible");
        throw new Error("Réponse du serveur invalide");
      }

      if (!response.ok) {
        console.log(responseData)
        console.log(responseData?.statusCode);
        
        switch (responseData?.statusCode ?? responseData.status) {
          case 422:
            notyf.error(responseData.errors?.[0]?.message || "Erreur serveur");
          break;

          case 500:
            notyf.error(responseData.message || "Erreur serveur");
          break;

          case 404:
            notyf.error("Entity Not Found");
            console.log(router)
            // router.push({name:"profile"})
          break;

          default:
            notyf.error(responseData.message || "Erreur serveur");
          break;
        }
        // if (notify) notyf.error(responseData.message || "Erreur serveur");
        return responseData
      }

      if (notify) notyf.success(responseData.message);
      return responseData;
    } catch (error) {
      console.error("Erreur API:", error);
     notyf.error(error.message || "Erreur inconnue");
      throw error;
    }
  }


  async function login(payload) {
    try {
      const result = await api("POST", "/auth/users/login", payload);
      console.log(result);
      
      if (result && result.success) {
        console.log(result.data);
        authenticate(result.data);
      }
      return result;
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  }

  async function register(payload) {
    try {
      console.log("dans la fonctio Register");

      const result = await api("POST", "/auth/users/accounts/create", payload);
      return result;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    }
  }

  async function logout() {
    try {
      await api("DELETE", "auth/logout", {}, false);
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.$toast("success", "Déconnexion", "Vous avez été déconnecté");
    }
  }

  async function me() {
    try {
      const result = await api("GET", "/me");
      user.value = result.user;
      return user.value;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      // L'erreur a déjà été gérée dans la fonction api
    }
  }

  async function isAuthentificated() {
    console.log(token);

    return token ? true : false;
  }

  function authenticate(result) {
    console.log(result);
    token.value = result.token.token;
    localStorage.setItem("token", token.value);
    localStorage.setItem(
      "user",
      JSON.stringify(result.user)
    );
    user.value = result.user;
  }

  function setCompany(company) {
    localStorage.setItem(
      "company",
      JSON.stringify(company)
    );
    userCompany.value = company;
  }

  return { user, userCompany,api, login, register, logout,setCompany, me, isAuthentificated };
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  console.log("[HMR] authStore hot reloaded");
}