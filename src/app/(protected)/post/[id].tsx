import { View, Text,FlatList,TextInput,Pressable,StyleSheet,KeyboardAvoidingView,Platform} from "react-native";
import { useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json"
import PostListComponent from "../../../components/PostListComponent";
import comments from "../../../../assets/data/comments.json";
import CommentListItems from "../../../components/CommentListItems";
import { useState,useRef,useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Details = ()=>{
  const {id} = useLocalSearchParams()
  const detailedPost = posts.find((post)=> post.id === id)
  const [comment, setComment] = useState<string>('')
  const insets = useSafeAreaInsets()
  const [isInputFocus,setIsInputFocus] = useState<boolean>(false)
  const inputRef = useRef<null|TextInput>(null)

  const postComments = comments.filter((comment)=> comment.post_id === id)

  const handleReplyButton= useCallback((commentId:string)=>{
    console.log(commentId)
    inputRef.current?.focus()
  }, [])

  if (!detailedPost){
    return(
      <Text>Post not found</Text>
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
          <PostListComponent post={detailedPost} isDetailedPost={true}/>
        }
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