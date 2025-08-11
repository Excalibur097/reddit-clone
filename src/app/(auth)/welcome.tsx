import { View,Text, } from "react-native"
import { Link } from "expo-router"

const Welcome = ()=>{
  return(
    <View>
      <Text>Hello, welcome to Reddit</Text>
      <Link href={'/sign-in'}><Text>Sign in</Text></Link>
      <Link href={'/sign-up'}><Text>Sign up</Text></Link>
    </View>
  )
}

export default Welcome