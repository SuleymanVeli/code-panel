const uploadImage= async (file:any): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
     const res = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });
    
      return await res.json(); 
    } catch (error) {
        return null;
    }
  };

  export default uploadImage;