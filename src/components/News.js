import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format } from "date-fns";

const News = ({ props }) => {

    var date = new Date(props.publishedAt);
    var formattedDate = format(date, "MMM dd, yyyy H:mma");

    return (
        <View style={styles.container}>
                <Image 
                    style={styles.newsImage}
                    source={{
                        uri: props.urlToImage,
                    }}
                />
                <Text style={styles.newsTitle}>{props.title}</Text>
                <View style={styles.newsInfo}>
                    <Text style={styles.newsDate}>{formattedDate}</Text>
                    <Text style={styles.sourceName}>{props.source.name}</Text> 
                </View>  
        </View>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    newsImage: {
        height: 200,
        width: "100%",
        borderRadius: 10,
    },

    newsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },

    newsInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 5,
    },

    newsDate: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    sourceName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    
});

export default News;