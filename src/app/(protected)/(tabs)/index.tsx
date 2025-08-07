import {Text, View, FlatList } from "react-native"
import PostListComponent from "../../../components/PostListComponent";
import posts from '../../../../assets/data/posts.json';



const Homescreen = () => {
  

  return (
    <View>
     <FlatList
      data={posts}
      renderItem={({item})=> <PostListComponent post={item}/>}
     />
    </View>
    
  )
}



export default Homescreen