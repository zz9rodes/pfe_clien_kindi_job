import { Client, Account, Storage } from 'appwrite';
import { generateRandomId } from '@/utils';

// Initialiser le client Appwrite
const appwriteUrl= import.meta.env.VITE_APP_WRITE_URL
const appwriteProjectId= import.meta.env.VITE_APP_WRITE_PROJECT_ID
const appwriteBucketId= import.meta.env.VITE_APP_WRITE_BUCKET_ID
const email = import.meta.env.VITE_APP_WRITE_EMAIL;
const password= import.meta.env.VITE_APP_WRITE_PASS


const client = new Client();
client 
  .setEndpoint(appwriteUrl) // Remplacez par votre endpoint
  .setProject(appwriteProjectId); // Remplacez par votre ID de projet

const account = new Account(client);
const storage = new Storage(client);

// await Appwritelogin()


/**
 * Authentifie l'utilisateur avec son email et son mot de passe.
 * @returns {Promise} - La promesse de l'authentification.
 */
export const Appwritelogin = async () => {
   const isAutheticated= await AppwritecheckSession()

   if(isAutheticated==null){
    try {
        const response = await account.createEmailPasswordSession(email, password);
        return response;
      } catch (error) {
        console.error('Erreur d\'authentification :', error);
        throw error; // Relancer l'erreur pour traitement ultérieur
      }

   }
   else{
    console.log("deja authentifier");
    
   }

  
};

export const AppwritecheckSession = async () => {
    try {
      const session = await account.getSession('current'); // Vérifie la session actuelle
      return session; // Retourne la session si l'utilisateur est authentifié
    } catch (error) {
      console.error('Aucune session active :', error);
      return null; // Retourne null si l'utilisateur n'est pas authentifié
    }
  };

/**
 * Uploade un fichier dans le bucket Appwrite.
 * @param {File} file - Le fichier à uploader.
 * @returns {Promise} - La promesse de l'upload.
 */
export const AppwriteuploadFile = async (file) => {
    // console.log(file)
    const fileId = generateRandomId()
    // console.log(fileId);
    
  try {
    const response = await storage.createFile(appwriteBucketId, fileId, file);
    console.log('Fichier uploadé avec succès :');
    return {
        isCreate:true,
        file:response,
        message:"File has Been Uploaded"
    };
  } catch (error) {
    console.error('Erreur lors de l\'upload :', error);
    return {
        isCreate:false,
        file:null,
        message:error?.message
    };
  }
};

export const AppwriteGetFile=async (fileId)=>{
    try {
        const result =  storage.getFileView(
            appwriteBucketId, 
            fileId
        );
        
        console.log(result);
    } catch (error) {
        console.log(error);

        return error.message
        
    }
}

export const AppwriteDeleteFile= async(fileId)=>{
  try {
      const result = await storage.deleteFile(
        appwriteBucketId, // bucketId
        fileId // fileId
    );
    console.log(result);

    return {
      isdeleted:true,
      message:"File has Been Deleted"
  };
    
  } catch (error) {

    return {
      isdeleted:false,
      message:error?.message
  };
  }
}