import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, FlatList, Image, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign} from  "@expo/vector-icons"
import { router } from 'expo-router';
import { selectedGroupsAtom } from '../../atoms';
import { useSetAtom } from 'jotai/react';
import { type Group } from '../../types';
import { useSupabase } from '../../lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { SupabaseClient } from '@supabase/supabase-js';

const fetchGroups = async(search:string, supabase:SupabaseClient)=>{
  const {data,error} = await supabase
  .from('groups').select('*')
  .ilike('name', `%${search}%`)
  if (error){
    throw Error
  }else{
    return data
  }
  
}


const groupSelector = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const setGroup = useSetAtom(selectedGroupsAtom)
  const supabase = useSupabase()

  const handleGruopSelect = (group:Group)=>{
    setGroup(group)
    router.back()
  }

  const handleBackIcon = ()=>{
    setGroup(null)
    router.back()
  }

  const {data,isLoading,error} = useQuery({
    queryKey:['groups',searchValue],
    queryFn:async ()=>fetchGroups(searchValue,supabase),
    placeholderData :(previousData)=>previousData
  
  })

  if (isLoading){
    return(
      <ActivityIndicator style={{flex:1}}/>
    )
  }

  if (error ||!data){
    return(
        <Text style={{flex:1}}>Unable to load resources</Text>
    )
  }


  return (
    <SafeAreaView style={{marginHorizontal:10}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <AntDesign name='close' size={30} color='black' onPress={()=>handleBackIcon()}/>
        <Text style={{fontSize:16,fontWeight:'bold',flex:1,textAlign:'center', paddingRight:30}}>
          Post to
        </Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'lightgrey',borderRadius:5,
      marginVertical:10,gap:5,paddingHorizontal:5}}>
        <AntDesign name='search1' size={16} color='grey'/>
        <TextInput 
          placeholder='search for community'
          style={{paddingVertical:10,flex:1}}
          value={searchValue}
          onChangeText={(text)=> setSearchValue(text)}
        />
        <AntDesign name='closecircle' size={15} color='#E4E4E4' onPress={()=>setSearchValue('')}/>
      </View>

        <FlatList
          data={data}
          renderItem={({item})=>(
            <Pressable style={{flexDirection:'row',alignItems:'center',gap:5,marginBottom:20}}
            onPress={()=> handleGruopSelect(item)}>
              <Image source={{uri:item.image}} style={{width:40, aspectRatio:1,borderRadius:20}}/>
              <Text style={{fontWeight:'600'}}>{item.name}</Text>
            </Pressable>
          )}
        />
    </SafeAreaView>
  )
}

export default groupSelector
