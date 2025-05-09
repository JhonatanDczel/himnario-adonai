import { TextInput, View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { HimnosContext } from "../context/HimnosContext";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ className }) => {
  const { searchQuery, setSearchQuery, searchHymns, isSearching } = useContext(HimnosContext);
  const navigation = useNavigation();
  const [localSearching, setLocalSearching] = useState(false);
  
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLocalSearching(true); // I
      
      try {
        await searchHymns(searchQuery);
        
        navigation.navigate('SearchResults', { query: searchQuery });
        
        setSearchQuery("");
      } catch (error) {
        console.error("Error en búsqueda:", error);
      } finally {
        setLocalSearching(false);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const searching = isSearching || localSearching;

  return (
    <View className={`relative ${className}`}>
      <View className="relative flex-row items-center">
        <TextInput
          className={`bg-gray-200 rounded-full py-3 px-5 pr-12 w-full font-josefin ${searching ? "opacity-70" : ""}`}
          placeholder={searching ? "Buscando..." : "Busca por número o título"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          editable={!searching}
        />
        
        {searchQuery && !searching ? (
          <TouchableOpacity 
            onPress={clearSearch}
            className="absolute right-12"
          >
            <Ionicons name="close-circle" size={18} color="gray" />
          </TouchableOpacity>
        ) : null}
        
        {searching ? (
          <View className="absolute right-4 flex-row items-center">
            <ActivityIndicator size="small" color="#666" />
          </View>
        ) : (
          <TouchableOpacity 
            onPress={handleSearch}
            className="absolute right-4"
          >
            <Ionicons name="search" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      
      {searching && (
        <Text className="text-center text-xs text-gray-500 mt-2 font-josefin">
          Buscando himnos que coincidan...
        </Text>
      )}
    </View>
  );
};

export default SearchBar;