import { Tabs } from "expo-router"
import {
  AntDesign, 
  Feather, 
  Octicons,
  MaterialIcons,
  Entypo
} from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

const Tablayout = ()=>{
  const {signOut} = useAuth()
  return(
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'black',
      headerRight: () =>
          <Feather
            name="log-out"
            size={22}
            color="black"
            style={{ paddingRight: 10 }}
            onPress={()=>signOut()}
          />
      }}>
      <Tabs.Screen 
      name="index"
      options={{
        title:'Home',
        headerTitle:'Reddit',
        headerTintColor: '#FF5700',
        tabBarIcon: ({color})=> <AntDesign name="home" size={24} color={color} />,
      }}/>

      <Tabs.Screen 
      name="chat"
      options={{
        title:'Chat',
        headerTitle:' Chat',
        headerTintColor: '#FF5700',
        tabBarIcon: ({color})=> <Entypo name="chat" size={24} color={color} />,
      }}/>

      <Tabs.Screen 
      name="inbox"
      options={{
        title:'Inbox',
        headerTitle:'Inbox',
        headerTintColor: '#FF5700',
        tabBarIcon: ({color})=> <Octicons name="inbox" size={24} color={color} />,
      }}/>

      <Tabs.Screen 
      name="create"
      options={{
        title:'Create',
        headerShown:false,
        tabBarStyle:{display:"none"},
        tabBarIcon: ({color})=> <MaterialIcons name="create" size={24} color={color} />,
      }}/>

      <Tabs.Screen 
      name="communities"
      options={{
        title:'Communities',
        headerTitle:'Communities',
        headerTintColor: '#FF5700',
        tabBarIcon: ({color})=> <Feather name="users" size={24} color={color} />,
      }}/>

    </Tabs>
  )
}

export default Tablayout;