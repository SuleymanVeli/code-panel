const getImageInfoFromURL = (imageUrl:string):string => {
    const urlParts = imageUrl.split('/');
    const imageNameWithExtension = urlParts[urlParts.length - 1];
  
    return imageNameWithExtension
  };

  export default getImageInfoFromURL;