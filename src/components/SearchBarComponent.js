import * as React from "react";
import { SearchBar } from "react-native-elements";

const SearchBarComponent = ({ value, onTextChange, onTextSubmit }) => {
  
  return (
    <SearchBar
      platform="android"
      containerStyle={{
        borderWidth: 1, borderColor: 'gray', borderRadius: 8,
        marginHorizontal: 15,
        height: 45, justifyContent: 'center'
      }}
      inputContainerStyle={{}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onClearText={() => console.log('')}
      placeholder="What are you looking for?"
      placeholderTextColor="#888"
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log('')}
      value={value}
      onChangeText={newText => onTextChange(newText)}
      onEndEditing={() => onTextSubmit(value)}
      onBlur={() => onTextSubmit(value)}
    />
  );
}

export default SearchBarComponent;