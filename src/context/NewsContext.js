import React, { useReducer, createContext } from 'react';

const NewsContext = createContext();

const init = { saved: [] };

const newsReducer = (state, action) => {
    switch (action.type) {
        case "add":
            return { ...state, saved: [ ...state.saved, action.payload] };    //insere nova noticia ao final da lista
        case "delete": {
            const newArray = state.saved.filter(bookmark => bookmark.title !== action.payload);   //filtra vetor do contexto em um vetor auxiliar
            return{                                                                                     //removendo elemento cujo id == id passado para contexto
                ...state, 
                saved: newArray                                                                         //substitui vetor do contexto
            }       
        }
        default:
            return { ...state}; //retorna contexto
    }
};

const NewsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(newsReducer, init);

    const add = (s, a, t, u, i, d, c) => {
        dispatch({ type: "add", payload: { name: s, author: a, title: t, url: u, urlToImage: i, publishedAt: d, content: c} });
    };

    const remove = (title) => {
        dispatch({ type: "delete", payload: title});
    };

    return(
        <NewsContext.Provider value={{ state, add, remove}}>
            {children}
        </NewsContext.Provider>
    )
};

export { NewsContext, NewsProvider };