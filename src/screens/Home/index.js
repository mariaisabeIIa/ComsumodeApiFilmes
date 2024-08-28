
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import BannerMovies from '../../components/bannerFilmes';
import CardMovies from '../../components/cardMovies';
import Header from '../../components/header';
import SearchBar from '../../components/searchbar';
import Filmes from '../../data/movies';
import { useEffect,useState } from 'react';
export default function App() {

  const [movies, setMovies] = useState();
  

  useEffect(()=>{
    async function buscarFilmes(){
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=31a6556679cbcf97813eed182bf09d23&language=pt-br&page=1')
      const data = await response.json()
      console.log(data.results)
      setMovies(data.results)
    }

    buscarFilmes();


  },[] )
  return (
    <View style={styles.container}>
     <Header></Header>

     <SearchBar></SearchBar>

     <BannerMovies></BannerMovies>
     
    
     <View style = {{width :"90%"}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={movies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              
              <CardMovies
                titulo={item.title}
                imagem={item.poster_path}
                nota={item.vote_average}
              />
            )}
          />
        </View>
    
  

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#141a29',
    alignItems:'center'
    
    
  },
});
