import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   TouchableOpacity,
   FlatList,
   Image,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
   {
      id: 'Uber-X-123',
      title: 'UberX',
      multiplier: 1,
      image: 'https://links.papareact.com/3pn',
   },
   {
      id: 'Uber-XL-456',
      title: 'Uber XL',
      multiplier: 1.25,
      image: 'https://links.papareact.com/5w8',
   },
   {
      id: 'Uber-LUX-789',
      title: 'Uber LUX',
      multiplier: 1.7,
      image: 'https://links.papareact.com/7pf',
   },
];

// if we have surge pricing, price goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
   const navigation = useNavigation();
   const travelTimeInformation = useSelector(selectTravelTimeInformation);
   const [selected, setSelected] = useState(null);

   return (
      <SafeAreaView style={tw`bg-white flex-grow`}>
         <View>
            <TouchableOpacity
               style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}
               onPress={() => navigation.navigate('NavigateCard')}
            >
               <Icon name='chevron-left' type='font-awesome' />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>
               Select a ride - {travelTimeInformation?.distance?.text}
            </Text>
         </View>
         <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item: { id, title, multiplier, image }, item }) => (
               <TouchableOpacity
                  onPress={() => setSelected(item)}
                  style={tw`flex-row items-center justify-between px-10 ${
                     id === selected?.id && 'bg-gray-200'
                  }`}
               >
                  <Image
                     style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                     }}
                     source={{ uri: image }}
                  />
                  <View style={tw`-ml-6`}>
                     <Text style={tw`text-lg font-semibold`}>{title}</Text>
                     <Text>
                        {travelTimeInformation?.duration?.text} Travel Time...
                     </Text>
                  </View>

                  <Text style={tw`text-xl`}>
                     {new Intl.NumberFormat('en-gb', {
                        style: 'currency',
                        currency: 'GBP',
                     }).format(
                        (travelTimeInformation?.duration?.value *
                           SURGE_CHARGE_RATE *
                           multiplier) /
                           100
                     )}
                  </Text>
               </TouchableOpacity>
            )}
         />
         <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity
               style={tw`bg-black ${!selected && 'bg-gray-300'}`}
               disabled={!selected}
            >
               <Text style={tw`text-center text-white text-xl px-2`}>
                  Choose {selected?.title}
               </Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
