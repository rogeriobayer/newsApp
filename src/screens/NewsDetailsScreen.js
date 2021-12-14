import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet, Image, Linking } from "react-native";
import { format } from "date-fns";
import newsApi from "../api/newsApi";
import { Button } from 'react-native-elements';

const NewsDetailsScreen = ({ navigation, route }) => {

  const [news, setNews] = useState([]);
  const [data, setData] = useState('');//Separado por causa da nova formatação
  const [conteudo, setConteudo] = useState('');//Separado por causa da nova formatação
  const [origem, setOrigem] = useState('');//Separado por causa da nova formatação

  useEffect( () => {
    getNews(route.params.title)
  }, [] );

  async function getNews(titulo){
    titulo=titulo.replace(/-.*/, '');//Remove o nome do autor que é concatenado no title
    try{
        const response = await newsApi.get(`top-headlines?q=${titulo}&country=br`
        );
        setNews(response.data.articles[0]);
        var date = new Date(response.data.articles[0].publishedAt);
        var formattedDate = format(date, "dd/MM/yyyy, H:mma");
        setData(formattedDate);

        //Se o resumo e conteúdo estiverem contidos um dentro do outro...
        if (response.data.articles[0].description.includes(//Se o resumo conter o conteudo
          response.data.articles[0].content.substring(0, response.data.articles[0].content.length - 20)
        )) 
          setConteudo(null);
        else if (response.data.articles[0].content.includes(//Se o conteudo conter o resumo
          response.data.articles[0].description.substring(0, response.data.articles[0].description.length - 20)
        )) 
          setConteudo(null);
        else //se forem diferentes
          setConteudo(response.data.articles[0].content.substring(0, response.data.articles[0].content.length - 13)); 
          //remove o final da string, -13 equivale ao +[1000char] que é concatenado automaticamente

        setOrigem(response.data.articles[0].source.name); 
        //Necessário atribuir o valor nesta etapa pois o navegador não interpreta a informação posteriormente
      }
    catch(err){
      console.log(err);
    }
}


  return (
    <View style={styles.tudo}>
      <View style={styles.container}>
        <Text style={styles.titulo}>{(news.title)}</Text>
        <View style={styles.centralizar}>
          <Image 
            style={styles.imagem}
            source={{uri: news.urlToImage}}
            />
        </View>
        {news.author == null //Se o autor estiver nulo, apresenta só origem
          ?<Text style={styles.publicado}>Publicado em {(origem)}, na data de {(data)} </Text>
          :<Text style={styles.publicado}>Publicado por {(news.author)}, em {(origem)}, na data de {(data)} </Text>
        }
        <Text style={styles.descricao}>{(news.description)}</Text>
         
        <Text style={styles.conteudo}>{(conteudo)}</Text>
        
        <View style={styles.centralizar}>
          <Button 
            title="Ler mais" 
            onPress={() => Linking.openURL(news.url)}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  tudo:{
    flex:1,
    backgroundColor: "#2196f3",
    fontSize: 14,
    color: "#000"
  },

  container: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
      padding: 15,
      borderRadius: 5,
      backgroundColor: "#fff",
      textAlign: "justify",
  },

  titulo:{
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  imagem: {
      height: 200,
      width: "90%",
      borderRadius: 8,
      alignSelf:"center",
      margin: 15,
      borderWidth:1,
      borderColor: "#5e5e5e"
  },
  
  centralizar:{
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },

  publicado:{
    fontSize: 13,
    fontWeight: "bold",
    color: "#4c4c4c",
    marginBottom: 10,
  },

  descricao:{
    margin: 5,
    marginBottom: 20,
    color: "#5e5e5e",
  },

  conteudo:{
    marginBottom: 15,
  },

});

export default NewsDetailsScreen;