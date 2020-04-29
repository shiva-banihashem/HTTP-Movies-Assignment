import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

import "../form.css";

export default function UpdateMovieCard(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = movieData => {
    
    const updatedData = {...movieData, stars: movieData.stars.split(','),
     id: Number(props.match.params.id)}
    
    axios
      .put(`http://localhost:5000/api/movies/${props.location.state.id}`, updatedData)
      .then(res => {
        updatedList();
        props.history.push('/')
      })
      .catch(err => console.log(err.response));
  }; 

  const updatedList= () =>{
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => props.setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const { title, director, stars, metascore } = props.location.state;
  const starString = stars.join(",");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input
        name="title"
        placeholder="Title"
        defaultValue={title}
        ref={register({ required: true })}
      />

      <label>Director</label>
      <input
        name="director"
        defaultValue={director}
        placeholder="Director"
        ref={register({ required: true })}
      />
      {errors.director && <p>This field is required</p>}

      <label>Metascore</label>
      <input
        name="metascore"
        placeholder="Metascore"
        defaultValue={metascore}
        type="number"
        ref={register({ required: true })}
      />
      {errors.metascore && <p>This field is required</p>}

      <label>Stars</label>
      <input
        name="stars"
        defaultValue={starString}
        placeholder="Stars"
        ref={register({ required: true })}
      />
      {errors.stars && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
}