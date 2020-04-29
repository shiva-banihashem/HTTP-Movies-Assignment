import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const updateMovie = () => {
    console.log("params.id:",params.id)
    console.log("movie",movie)
    props.history.push({
      pathname: `/update-movie/${params.id}`,
      state: movie
    });
    
  };
  const updatedList= () =>{
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => props.setMovieList(res.data))
      .catch(err => console.log(err.response));
  };
  
  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log('delete success', res.data)
        updatedList();
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={updateMovie}>
          Update
        </div>
        <div className="delete-button" onClick={deleteMovie}>
          Delete
        </div>
    </div>
  );
}

export default Movie;
