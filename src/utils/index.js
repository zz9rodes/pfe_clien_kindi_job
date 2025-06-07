 export const removeFile = (arrayData,index) => {
    arrayData.splice(index, 1)
}

export const  generateRandomId=(length = 36)=> {
    const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-';
    
    if (length > 36) {
      throw new Error('Length must be 36 characters or less.');
    }
  
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      randomId += validChars[randomIndex];
    }
  
    if (/^[^a-zA-Z0-9]/.test(randomId)) {
      randomId = 'a' + randomId.substring(1); 
    }
  
    return randomId;
  }

  export const  formatDateToYYYYMMDD=(date=null)=> {
    if(date==null){
      date= new Date()
    }
    // Vérifier si l'entrée est une instance de Date
    if (!(date instanceof Date)) {
      throw new Error("L'entrée doit être une instance de Date.");
    }
  
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Janvier est 0
    const dd = String(date.getDate()).padStart(2, '0');
  
    return `${yyyy}-${mm}-${dd}`;
  }

  export const hasEmptyFields = (data) => {
    return Object.values(data).some(value => value === null || value === '');
  };

  export const  stringContainsIgnoreCase=(mainString, searchString)=> {
    return mainString.toLowerCase().includes(searchString.toLowerCase());
}


  
  