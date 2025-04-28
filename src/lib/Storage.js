import {v4 as uuidv4} from 'uuid'
import supabase from './supabase'


// upload product Thumbnail and imgs
export const uploadThumnail=async(file, userId,  bucket='thumbnail-image')=>{


    try {
        const fileEx=file.name.split().pop()
        const fileName=`${uuidv4()}.${fileEx}`
        const filePath=`${userId}/${fileName}`
       

        // upload supabase bucket
        const {data, error}=await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl:'3600',
            upsert:true,
            contentType:file.type
          } )

          if(error) throw error;

          const {data:{publicUrl} }= supabase.storage.from(bucket).getPublicUrl(filePath)


          return {publicUrl, filePath}
          

    } catch (error) {
        console.error(error)
    }

}



// delete thumbnail
export const deleteImage = async (filePath, bucket) => {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error('Error deleting image:', error.message);
  } else {
    console.log('Image deleted successfully:', data);
  }
};




export const uploadImage= async(file, userId, bucket='blogimg')=> {
  console.log(file);
  console.log(userId);
  


     try {
      const fileEx=file.name.split().pop()
      const fileName=`${uuidv4()}.${fileEx}`
      const filePath=`${userId}/${fileName}`
     

      // upload supabase bucket
      const {data, error}=await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl:'3600',
          upsert:true,
          contentType:file.type
        } )

        if(error) throw error;

        const {data:{publicUrl} }= supabase.storage.from(bucket).getPublicUrl(filePath)


        return {publicUrl, filePath}
        

  } catch (error) {
      console.error(error)
  }



     
}