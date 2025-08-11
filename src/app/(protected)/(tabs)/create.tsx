import {Pressable, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons"
import { router } from 'expo-router';

const Createscreen = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <View style={{flexDirection:'row'}}>
        <AntDesign name = "close" size={24} color="black" onPress={()=>console}/>
        <Pressable style={{marginLeft:'auto', alignItems:'center'}}>
          <Text style={{color:"white",backgroundColor:"#115BCA",fontWeight:'bold'}}>Post</Text>
        </Pressable>
      </View>
     
    </SafeAreaView>
  )
}

export default Createscreen;