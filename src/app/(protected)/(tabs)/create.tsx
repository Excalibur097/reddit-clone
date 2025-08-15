import {Pressable,Text,
  View,
  StyleSheet,
  TextInput,KeyboardAvoidingView,Platform,Image,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons"
import { router,Link } from 'expo-router';
import { useState } from 'react';
import { selectedGroupsAtom } from '../../../atoms';
import { useAtom } from 'jotai';

const Createscreen = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [group, setGroup] = useAtom(selectedGroupsAtom) 

  const goBack = ()=>{
    setTitle('')
    setBody('')
    router.back()
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", paddingHorizontal:10}}>
      <View style={{flexDirection:'row'}}>
        <AntDesign name = "close" size={24} color="black" onPress={()=>goBack()}/>
        <Pressable style={{marginLeft:'auto', alignItems:'center'}}>
          <Text style={styles.postText}>Post</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS ==="ios"?'padding':undefined} style={{flex:1}}>
        <ScrollView style={{paddingVertical:10}}>
          <Pressable onPress={()=>router.push('/groupSelector')}>
            {
              
            }
            <View style={styles.communityContainer}>
              <Text style={styles.rstyles}>r/</Text>
              <Text style={{fontWeight:600}}>Select community</Text>
            </View>
          </Pressable>

          <TextInput 
            placeholder='title'
            style ={{fontSize:20,fontWeight:'bold',paddingVertical:20}}
            value={title}
            onChangeText={(text)=>setTitle(text)}
            multiline
            scrollEnabled={false}
          />
          <TextInput 
            placeholder='body text (optional)'
            value={body}
            onChangeText={(text)=>setBody(text)}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
     
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  postText:{
    color:"white",
    backgroundColor:"#115BCA",
    fontWeight:'bold',
    paddingVertical:2,
    paddingHorizontal:7,
    borderRadius:10
  },
  rstyles:{
    backgroundColor:'black',
    color:'white',
    paddingVertical:1,
    paddingHorizontal:5,
    borderRadius:10,
    fontWeight:'bold'
  },
  communityContainer:{
    flexDirection:'row',
    backgroundColor:'#EDEDED',
    padding:10,
    borderRadius:20,
    gap:5,
    alignSelf:'flex-start',
    marginVertical:10
  }
})

export default Createscreen;