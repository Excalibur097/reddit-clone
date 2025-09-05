import { useState,useEffect } from "react";
import {Text, View, FlatList, ActivityIndicator } from "react-native"
import PostListComponent from "../../../components/PostListComponent";
//import posts from '../../../../assets/data/posts.json';
import { useSupabase } from "../../../lib/supabase";
import { useQuery } from "@tanstack/react-query";

import { Post } from "../../../types";
import { SupabaseClient } from "@supabase/supabase-js";
const fetchPost =async(supabase:SupabaseClient)=>{
  const {data,error} = await supabase.from('posts')
  .select('*,group:groups(*)'/*,user:users!posts_user_id_fkey(*)'*/)
  .order('created_at',{ascending:false})
  if (error){
    throw Error
  }else{
    return data
  }
  
}

const Homescreen = () => {
  //const [posts,setPosts] = useState<null|Post[]>([])
  //const [isLoading, setIsLoading] = useState<null|string>('Loading');
  const supabase = useSupabase()

  const {data:posts,isLoading,error,refetch,isRefetching} = useQuery({
    queryKey:['posts'],
    queryFn:async ()=>fetchPost(supabase)
  })

  

  if(isLoading){
    return(
      <ActivityIndicator style={{flex:1}}/>
    )
  }

  if(error){
    return(
      <Text style={{flex:1}}>Error loding content</Text>
    )
  }
  return (
    <View>
     <FlatList
        data={posts}
        renderItem={({item})=> <PostListComponent post={item}/>}
        onRefresh={refetch}
        refreshing={isRefetching}
     />
    </View>
    
  )
}



export default Homescreen