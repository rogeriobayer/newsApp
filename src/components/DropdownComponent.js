import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { MaterialIcons } from '@expo/vector-icons';

  const data = [
    { label: 'Published At', value: 'publishedAt' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Relevancy', value: 'relevancy' },
  ];

  const DropdownComponent = ({ onSortChange }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SORT BY:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          maxHeight={180}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'select one' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            onSortChange(item.value);
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialIcons 
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="sort"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      width: '45%',
      alignSelf: 'flex-end',
    },

    dropdown: {
      height: 45,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
    },

    icon: {
      marginRight: 5,
    },

    placeholderStyle: {
      fontSize: 16,
    },

    selectedTextStyle: {
      fontSize: 16,
    },

    iconStyle: {
      width: 20,
      height: 20,
    },

    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

    title: {
      fontWeight: 'bold',
      textAlign: 'right',
      marginRight: 5,
    }

  });