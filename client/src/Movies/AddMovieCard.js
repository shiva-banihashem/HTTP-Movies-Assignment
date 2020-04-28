import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

import "../form.css";

export default function AddMovieCard(props) {
  console.log("props in add",props.movies);
  let max = ""
  let maxMovie = {}
  if (props.movies.length>1) {
    maxMovie  = props.movies.reduce((prev, current) =>
    (prev.id > current.id) ? prev : current)
    max = maxMovie.id;
  }
  else
    max = props.movies[0].id
  let id = max+1;

 console.log("id:", id);
  const { register, handleSubmit, errors } = useForm();
  const [newMovie,setNewMovie]=useState(
    {
        id: null,
        title: '',
        director: '',
        metascore: null,
        stars: []
      }
  );

  const [newStar,setNewStar] = useState();
  const [stars,setStars]= useState([]);
  
  
    const handleChange = (e) => {
     
      setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value,id:props.id
      })
      }      
    
    
    
    

    const onHandleSubmit = (e) => {
        
        e.preventDefault();

        
        console.log("in Add movieCard submit");
              
         
          
          // clears out the input values
          setNewMovie({id: null,
            title: '',
            director: '',
            metascore: null,
            stars: []
        });
    }

    const handleChangeStar = (e) => {
       
        setNewStar(e.targetValue)
        
        }
   
   const onHandleStars = (e)=>{
     setStars([...stars,newStar]);

   }
         
      
    console.log("star added:", newStar)



console.log("List of Stars:")
console.log(stars);
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

      {/* <label>Stars</label>
      <input
        name="stars"
        value={newMovie.stars}
        placeholder="Stars"
        ref={register({ required: true })}
      /> */}
      {/* {errors.stars && <p>This field is required</p>} */}
      <form onSubmit={handleSubmit(onHandleStars)}>
      <label>Stars</label>
      <input
        name="stars"
        value={newStar}
        onChange={handleChangeStar}
        placeholder="Stars"
        ref={register({ required: true })}
      /> 
      <button type="submit">Add Star</button>
      </form>
      <input type="submit" />
    </form>
  );
}