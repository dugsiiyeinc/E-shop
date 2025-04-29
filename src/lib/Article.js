import supabase from "./supabase";

export const  createErticle=async(article)=>{
    
    const articleData={
        title:article.title,
        content:article.content,
        tags:article.tags,
        user_id:article.authorId,
        publish:article.published || false,
        featured_image:[article.featuredImageUrl ]
    }

    // insertData to supabase
    const {data, error}=await supabase.from('blogs')
    .insert(articleData)
    .select()
    .single()

    if(error){
        console.error('error creating article', error)
        throw error
    }

    console.log('article was created successfully', data);
    return data
    

}


// export const getArticleByAuthor=async (authorId,{includeUnPublished=false, limit=10, offset=0})=>{


//     const query= supabase
//        .from('articles')
//        .select(`
//         *,
//         comments:comments(count)`)
//         .eq('author_id', authorId)
//         .order('created_at', {ascending:false}) 
//         .range(offset, offset + limit -1)

//         if(!includeUnPublished){
//             query=query.eq('published', true)
//         }


//         const {data, error, count}=await query

//         if(error) throw error

//         return{
//             articls:data,
//             count
//         }
// }

export const deleteArticle=async(articleId)=>{
     


    // finaly delete the article
    const {data, error}=await supabase.from('blogs').delete().eq('id', articleId)

    if(error){
        console.error('Error deleting coments', error)
        throw error
    }

    console.log('success fully deleted');
    
}


export const getAllArticles= async()=>{
    

    const {data, error}=await supabase
    .from('blogs')
    .select('*')
    // .single()

    if(error) {
        console.error(error)
        return
    }

    return data
}

export const updateRticle=async(id, updates)=>{
    
    const {data, error}=await supabase
    .from('blogs')
    .update({
        title:updates.title,
        content:updates.content,
        tags:updates.tags,
        publish:updates.published,
        featured_image:[updates.featuredImageUrl],
        updated_at: new Date()
    })
    .eq('id',id)
    .single()



    if(error) throw error

    console.log('successfully updated', data);
    return data
    
}



export async function getArticleById(articleId) {



    try {
     
      const { data, error } = await supabase
        .from('blogs') 
        .select('*')
        .eq('id', articleId)  
        .single();  
  
      if (error) {
        throw new Error(error.message);
      }
  
      
      return data;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;  
    }
  }



//   get all articles for blog page 
export const getBlogsPaginated = async (page = 1, limit = 6) => {
    // alert('')
    const from = (page - 1) * limit;
    const to = from + limit - 1;
   let pub= true
    const { data, error, count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .range(from, to)
      .eq('publish', pub)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
    console.log(data)
    return {
      blogs: data,
      total: count,
      totalPages: Math.ceil(count / limit),
    };
  };