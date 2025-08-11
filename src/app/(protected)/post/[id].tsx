import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json"
import PostListComponent from "../../../components/PostListComponent";

const Details = ()=>{
  const {id} = useLocalSearchParams()
  const detailedPost = posts.find((post)=> post.id === id)

  if (!detailedPost){
    return(
      <Text>Post not found</Text>
    )
  }

  return(
    <View>
      <PostListComponent post={detailedPost} isDetailedPost={true}/>
      
    </View>
  )
}

export default Details