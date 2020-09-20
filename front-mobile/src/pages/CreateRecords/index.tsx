import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';


const CreateRecords = () => {
    return ( 
        <>
            <Header />
            <Text style={styles.text}>
                Hello Create Records!
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFF'
    }
  });

export default CreateRecords;