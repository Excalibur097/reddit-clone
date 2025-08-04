import { View } from "react-native"
import PostListComponent from "../../components/PostListComponent";
import posts from '../../../assets/data/posts.json';



const Homescreen = () => {
  

  return (
    <View>
      <PostListComponent post={posts[0]}/>
      <PostListComponent post={posts[1]} />
      <PostListComponent post={posts[2]}/>
      <PostListComponent post={posts[3]}/>
    </View>
    
  )
}



export default Homescreen