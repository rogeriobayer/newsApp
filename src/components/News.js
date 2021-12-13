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
            <View style={styles.titleContainer}>
                <View style={styles.imageBottom}><Image 
                    style={styles.newsImage}
                    source={{
                        uri: props.urlToImage,
                    }}
                /></View>
                <Text style={styles.newsTitle}>{props.title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        controlBookmark()   //chama funcao que controla icone
                    }}>
                    <Ionicons name={bookmarked?("md-bookmark-sharp"):("bookmark-outline")} style={styles.bookmarkIcon}/>
                </TouchableOpacity>
            </View>               
            <View style={styles.newsInfo}>
                <Text style={styles.newsDate}>{formattedDate}</Text>
                <Text style={styles.div}>  |  </Text>
                <Text style={styles.sourceName}>{props.source.name}</Text> 
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 15,
        borderBottomColor: '#2196f3',
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 10,
        marginTop: 5,
    },
    titleContainer: {
        flexDirection: 'row'
    },
    infoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    newsImage: {
        height: 85,
        width: 120,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    imageBottom: {
        borderBottomWidth: 7,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: '#2196f3',
    },
    newsTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
    },

    newsInfo: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
    },
    newsDate: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    sourceName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#2196f3',
        flex: 1,
    },
    div: {
        fontSize: 15,
        color: '#2196f3',
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 17,
    },
    bookmarkIcon: {
        fontSize: 30,
        alignItems: 'center',
        color: '#2196f3',
    }
});

export default News;