import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, FlatList, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign} from  "@expo/vector-icons"
import { router } from 'expo-router';
import groups from '../../../assets/data/groups.json'

const groupSelector = () => {
  const [serarchValue, setSearchValue] = useState<string>('');
  const filteredGroup = groups.filter((group)=> group.name.toLowerCase().includes(serarchValue.toLowerCase()))

  return (
    <SafeAreaView style={{marginHorizontal:10}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <AntDesign name='close' size={30} color='black' onPress={()=>router.back()}/>
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
          value={serarchValue}
          onChangeText={(text)=> setSearchValue(text)}
        />
        <AntDesign name='closecircle' size={15} color='#E4E4E4' onPress={()=>setSearchValue('')}/>
      </View>

        <FlatList
          data={filteredGroup}
          renderItem={({item})=>(
            <Pressable style={{flexDirection:'row',alignItems:'center',gap:5,marginBottom:20}}>
              <Image source={{uri:item.image}} style={{width:40, aspectRatio:1,borderRadius:20}}/>
              <Text style={{fontWeight:'600'}}>{item.name}</Text>
            </Pressable>
          )}
        />
    </SafeAreaView>
  )
}

export default groupSelector
