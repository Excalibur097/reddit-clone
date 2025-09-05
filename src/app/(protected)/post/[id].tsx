import { View, Text,FlatList,TextInput,Pressable,StyleSheet,KeyboardAvoidingView,Platform, ActivityIndicator, Alert} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json"
import PostListComponent from "../../../components/PostListComponent";
import comments from "../../../../assets/data/comments.json";
import CommentListItems from "../../../components/CommentListItems";
import { useState,useRef,useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSupabase } from "../../../lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SupabaseClient } from "@supabase/supabase-js";
import {Stack} from "expo-router"
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons"

const fetchPostById =async(id:string|string[],supabase:SupabaseClient)=>{
  const {data,error} = await supabase
    .from('posts')
    .select('*,group:groups(*)'/*,user:users!posts_user_id_fkey(*)*/)
    .eq('id',id)
    .single()
  if (error){
    throw Error
  }else{
    return data
  }
  
}

const deletePostById = async(id:string|string[],supabase:SupabaseClient)=>{
  const {data,error} = await supabase.from("posts").delete().eq("id", id)
  if(error){
    throw Error
  }else{
    return data
  }
}


const Details = ()=>{
  const {id} = useLocalSearchParams()
  const [comment, setComment] = useState<string>('')
  const insets = useSafeAreaInsets()
  const [isInputFocus,setIsInputFocus] = useState<boolean>(false)
  const inputRef = useRef<null|TextInput>(null)
  const supabase = useSupabase()
  const queryClient = useQueryClient(); // Initialize queryClient

  const postComments = comments.filter((comment)=> comment.post_id === id)

  const {data,isLoading,error} = useQuery({
   queryKey:['posts',id],
   queryFn:()=>fetchPostById(id,supabase) 
  })

  const {mutate} = useMutation({
    mutationFn:()=> deletePostById(id,supabase),
    onSuccess:()=>{
      router.back()
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError:(error)=>{
      Alert.alert("Error",error.message)
    }

  })

  const handleReplyButton= useCallback((commentId:string)=>{
    console.log(commentId)
    inputRef.current?.focus()
  }, [])

  if (isLoading){
    return(
      <ActivityIndicator style={{flex:1}}/>
    )
  }

  if(error){
    return(
      <Text>Could not load resource</Text>
    )
  }

  return(
    <KeyboardAvoidingView style={{flex:1}}
    behavior={Platform.OS ==='ios'?'padding' : 'height'}
    keyboardVerticalOffset={insets.top +25}>
      <FlatList 
        data={comments}
        renderItem={({item})=> <CommentListItems comment={item} depth={0}handleReplyButton={handleReplyButton}/>}
        ListHeaderComponent={
          <PostListComponent post={data} isDetailedPost={true}/>
        }
      />
      <Stack.Screen
        options={{
          headerRight: ()=>
            <View style={{flexDirection:"row", gap:10}}>
              <Entypo name="trash"size={24} color="white" onPress={()=>mutate()}/>
              <AntDesign name="search1"size={24} color="white"/>
              <MaterialIcons name="sort"size={24} color="white"/>
              <Entypo name="dots-three-horizontal"size={24} color="white"/>
            </View>,
          animation:"slide_from_bottom"
        }}
      />
      <View style={[styles.inputContainer, {paddingBottom: insets.bottom }]}>
        <TextInput
          ref={inputRef}
          placeholder="Join the conversation"
          style={{backgroundColor:'#E4E4E4',padding:5,borderRadius:5}}
          value={comment}
          onChangeText={(text)=>setComment(text)}
          multiline
          onFocus={()=>setIsInputFocus(true)}
          onBlur={()=>setIsInputFocus(false)}
        />
        {isInputFocus &&
        <Pressable style={{backgroundColor:'#8d469b',borderRadius:15,marginLeft:'auto',marginTop:15}}>
          <Text style={styles.inputText}>Reply</Text>
        </Pressable>
        }
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputContainer:{
    borderBottomWidth:1,
    borderBottomColor:'lightgrey',
    padding:10,backgroundColor:'white',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity:  0.20,
    shadowRadius: 5.62,
    elevation: 8 
  },
  inputText:{
    color:'white',
    paddingVertical:5,
    paddingHorizontal:10,
    fontWeight:"bold",
    fontSize:13,
  }
  
})

export default Details