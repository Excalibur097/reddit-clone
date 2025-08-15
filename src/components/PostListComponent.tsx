import { Text, View, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { formatDistanceToNowStrict } from "date-fns";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Post } from "../types";

type Postprops = {
  post:Post,
  isDetailedPost?:boolean
}

const PostListComponent = ({post, isDetailedPost}:Postprops)=>{
  const shouldShowImage = isDetailedPost || post.image
  const shouldShowDescription = isDetailedPost || !post.image
 
  return(
    <Link href={`post/${post.id}`}>
      <View style={{paddingVertical:10, paddingHorizontal:15, backgroundColor:"white"}}>
      {/*POST HEADER */}
        <View style={{flexDirection:"row", gap:10}}>
          <Image source={{uri:post.group.image}} style={{width:20, height:20, borderRadius:10}}/>
          <View>
            <View style={{flexDirection:"row", gap:5}}>
              <Text style={{fontWeight:"bold"}}>{post.group.name}</Text>
              <Text style={{color:"grey"}}>{formatDistanceToNowStrict(new Date(post.created_at))}</Text>
            </View>
            {isDetailedPost && <Text style={{fontSize:13,color:'#2E5DAA'}}>{post.user.name}</Text>}
          </View>
          <View style={{marginLeft:"auto"}}>
            <Text style={styles.joinButtonText}>Join</Text>
          </View>
        </View>

        {/*POST CONTENT*/}
        <Text style={{fontWeight:"bold",fontSize:17, letterSpacing:0.5}}>{post.title}</Text>
        {
          shouldShowImage && post.image &&
          <Image source={{uri:post.image}} style={{width:"100%", aspectRatio:4/3, borderRadius:15}}/>
        }
        {
          shouldShowDescription && post.description  &&
          <Text numberOfLines={isDetailedPost?undefined : 4}>{post.description}</Text>
        }
      

        {/*FOOTER*/}
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={[{ flexDirection: 'row' }, styles.iconBox]}>
                <MaterialCommunityIcons name="arrow-up-bold-outline" size={19} color="black" />
                <Text style={{ fontWeight: '500', marginLeft: 5, alignSelf: 'center' }}>{post.upvotes}</Text>
                <View style={{ width: 1, backgroundColor: '#D4D4D4', height: 14, marginHorizontal: 7, alignSelf: 'center' }} />
                <MaterialCommunityIcons name="arrow-down-bold-outline" size={19} color="black" />
              </View>
              <View style={[{ flexDirection: 'row' }, styles.iconBox]}>
                <MaterialCommunityIcons name="comment-outline" size={19} color="black" />
                <Text style={{ fontWeight: '500', marginLeft: 5, alignSelf: 'center' }}>{post.nr_of_comments}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 10 }}>
              <MaterialCommunityIcons name="trophy-outline" size={19} color="black" style={styles.iconBox} />
              <MaterialCommunityIcons name="share-outline" size={19} color="black" style={styles.iconBox} />
            </View>
        </View>
      </View>
    </Link>
   
  )
}

const styles = StyleSheet.create({
  joinButtonText:{
    backgroundColor:"#0d4696",
    color:"white",
    paddingVertical:2,
    paddingHorizontal:7,
    borderRadius:10,
    fontWeight:"bold"
  },
  iconBox: {
    borderWidth: 0.5,
    borderColor: '#D4D4D4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
})

export default PostListComponent;