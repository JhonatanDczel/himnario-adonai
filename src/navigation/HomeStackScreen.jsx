import { createStackNavigator } from "@react-navigation/stack";
import Index from "../views/Index";
import Hymn from "../views/Hymn";
import Home from "../screens/Home";

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeStack" component={Home} />
      <HomeStack.Screen name="IndexStack" component={Index} />
      <HomeStack.Screen name="HymnStack" component={Hymn} />
    </HomeStack.Navigator>
  )
}