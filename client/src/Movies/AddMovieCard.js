import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

import "../form.css";

export default function AddMovieCard(props) {
  
  let max = 0
  let maxMovie = {}
  if (props.movies.length>1) {
    maxMovie  = props.movies.reduce((prev, current) =>
    (prev.id > current.id) ? prev : current)
    max = maxMovie.id;
  }
  else
    max = props.movies[0].id
  let id = max+1;

 
  const { register, handleSubmit, errors } = useForm();
  const [newMovie,setNewMovie]=useState(
    {
        id: null,
        title: '',
        director: '',
        metascore: null,
        stars: ""
      }
  );

  
  
  
    const handleChange = (e) => {
     
      setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value,id:id
      })
      }      
    
    
    
    

    const onHandleSubmit = (e) => {
        
        
        const addedData = {...newMovie, stars: newMovie.stars.split(',')}
        console.log(addedData);
       
       axios
         .post("http://localhost:5000/api/movies", addedData)
         .then(res => {
           let newList = props.movies;
           
           newList = [...newList,addedData]
           
          props.setMovieList(newList);
           props.history.push('/')
         })
         .catch(err => console.log(err));
      
         
     
          // clears out the input values
          setNewMovie({id: null,
            title: '',
            director: '',
            metascore: null,
            stars: ""
        });
    }

   
         
      
    

  return (
  
    
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <label>Title</label>
      <input
        name="title"
        placeholder="Title"
        value={newMovie.title}
        onChange={handleChange}
        ref={register({ required: true })}
      />

      <label>Director</label>
      <input
        name="director"
        value={newMovie.director}
        placeholder="Director"
        onChange={handleChange}
        ref={register({ required: true })}
      />
      {errors.director && <p>This field is required</p>}

      <label>Metascore</label>
      <input
        name="metascore"
        placeholder="Metascore"
        value={newMovie.metascore}
        onChange={handleChange}
        type="number"
        ref={register({ required: true })}
      />
      {errors.metascore && <p>This field is required</p>}

      
      <input
        name="stars"
        value={newMovie.stars}
        placeholder="Stars"
        onChange={handleChange}
        ref={register({ required: true })}
      />
      {errors.stars && <p>This field is required</p>}
    <input type="submit" /> 
    </form>
    
  );
}