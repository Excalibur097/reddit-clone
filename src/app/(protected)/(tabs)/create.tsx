import {Pressable,Text,
  View,
  StyleSheet,
  TextInput,KeyboardAvoidingView,Platform,Image,ScrollView,
  ActivityIndicator,
  Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons"
import { router,Link } from 'expo-router';
import { useState } from 'react';
import { selectedGroupsAtom } from '../../../atoms';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '../../../lib/supabase';

const Createscreen = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [group,setGroup] = useAtom(selectedGroupsAtom) 
  //const group_id = '17ddda47-fefe-4850-8b83-5e4cbce585ec'
  const user_id = '11ee8254-3bfa-489a-90cf-e4f6bfa9cdc3'
  const queryClient = useQueryClient(); // Initialize queryClient
  const supabase = useSupabase()

  const goBack = ()=>{
    setTitle('')
    setBody('')
    router.back()
  }

  const resetValues = ()=>{
    setTitle('')
    setBody('')
  }

  const {mutate, data, isPending, isSuccess,error} =  useMutation({
    mutationFn:async()=>{
      resetValues()
      const {data,error} = await supabase.from('posts').insert({
        title,
        description:body,
        group_id:group?.id,
        //user_id: user_id
      })
      .select()
      if(error){
        throw Error
      }else{
        return data
      }
    },
    onSuccess:(data)=>{
      goBack()
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError:(error)=>{
      Alert.alert('failed to post',error.message)
    }
  })
  
  console.log(group)
  console.log(isSuccess)
  /*const addItem = async()=>{
    try{ 
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title,
            description:body,
            group_id:group_id,
            user_id: user_id
          },
        ])
        .select()  
      if (data){
        console.log(data)
      }else{
        throw Error
      }
    }catch(error){
      console.error(error)
    }
    
  }*/
  if(isPending){
    return(
      <ActivityIndicator style={{flex:1}}/>
    )
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", paddingHorizontal:10}}>
      <View style={{flexDirection:'row'}}>
        <AntDesign name = "close" size={24} color="black" onPress={()=>goBack()}/>
        <Pressable onPress={()=>mutate()} style={{marginLeft:'auto', alignItems:'center'}} disabled={isPending}>
          <Text style={styles.postText}>Post</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS ==="ios"?'padding':undefined} style={{flex:1}}>
        <ScrollView style={{paddingVertical:10}}>
          <Pressable onPress={()=>router.push('/groupSelector')}>
            <View style={styles.communityContainer}>
              {
                group ?(
                  <>
                    <Image source={{uri:group.image}} style={{width:20,height:20, borderRadius:10}}/>
                    <Text style={{fontWeight:'600'}}>{group.name}</Text>
                  </>
                ):(
                  <>
                    <Text style={styles.rstyles}>r/</Text>
                    <Text style={{fontWeight:'600'}}>Select community</Text>
                  </>
                )
              }
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