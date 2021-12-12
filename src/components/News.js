import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { format } from "date-fns";
import { Ionicons } from '@expo/vector-icons';
import { NewsContext } from "../context/NewsContext";

const News = ({ props }) => {
    const newsContext = useContext(NewsContext);            //contexto com noticias salvas
    const [bookmarked, setBookmarked] = useState(false);    //controla se noticia foi salva

    //procura se noticias estao no contexto para marcar como salvos
    useFocusEffect(
        React.useCallback(() => {
            const bookmark = newsContext.state.saved.find(data => data.title === props.title);
            if (bookmark){
                setBookmarked(true);
            } else setBookmarked(false);
        })
    )
    
    //marca como salvo no contexto e muda estado que controla icone
    const controlBookmark = () => {
        if(bookmarked) {
            setBookmarked(false);
            newsContext.remove(props.title);
        }
        else {
            setBookmarked(true);
            newsContext.add(props.source.name, props.author, props.title, props.url, props.urlToImage, props.publishedAt, props.content);
        }
    }

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
                <TouchableOpacity
                    onPress={() => {
                        controlBookmark()   //chama funcao que controla icone
                    }}>
                    <Ionicons name={bookmarked?("bookmark"):("bookmark-outline")} style={styles.icon}/>
                </TouchableOpacity>
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
    icon: {
        fontSize: 20,
    }
});

export default News;