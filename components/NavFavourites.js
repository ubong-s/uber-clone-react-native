import { useNavigation } from '@react-navigation/native';
import {
   StyleSheet,
   Text,
   View,
   FlatList,
   TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectDestination, selectOrigin } from '../slices/navSlice';

const data = [
   {
      id: '123',
      icon: 'home',
      location: 'Home',
      destination: 'Code Street, London, UK',
   },
   {
      id: '456',
      icon: 'briefcase',
      location: 'Work',
      destination: 'London Eye, London, UK',
   },
];

const NavFavourites = () => {
   const navigation = useNavigation();
   const origin = useSelector(selectOrigin);

   return (
      <FlatList
         data={data}
         keyExtractor={(item) => item.id}
         ItemSeparatorComponent={() => <View style={tw`h-1 bg-gray-200`} />}
         renderItem={({ item: { location, destination, icon } }) => (
            <TouchableOpacity
               style={tw`flex-row items-center p-5`}
               // onPress={() => navigation.navigate(item.screen)}
               // disabled={!origin}
            >
               <Icon
                  style={tw`mr-4 p-3 bg-gray-300 rounded-full`}
                  type='ionicon'
                  color='white'
                  name={icon}
                  size={18}
               />
               <View>
                  <Text style={tw`font-semibold text-lg`}>{location}</Text>
                  <Text style={tw`text-gray-500`}>{destination}</Text>
               </View>
            </TouchableOpacity>
         )}
      />
   );
};

export default NavFavourites;

const styles = StyleSheet.create({});
