import React, { useEffect, useState } from "react";
import IngredientTypeCard from "../../GENERAL-COMPONENTS/IngredientTypeCard";
import {getAllIngredientTypes} from '../../SERVICES/IngredientService';
import SearchIcon from '@mui/icons-material/Search';
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import './ChooseIngredientsStyles.css'
import { IngredientType } from "../../MODELS/ENUMS/IngredientType";


interface ChooseIngredientProps{

}
export default  function ChooseIngredients(){
    
    ///CALLING THE INGREDIENT TYPES HERE 
    const [ingredientTypeInString , setIngredientTypeInString] = useState<string[]>([]);
    // USING USE EFFECT TO CALL A ASYNC FUNC 
    useEffect(()=>{
        (async ()=> {
            const allIngredientTypes =await getAllIngredientTypes();
            setIngredientTypeInString(allIngredientTypes);
        })();
    },[]);
    ////ADDING SELECTED INGREDIENT TYPES TO THE ARRAY
    const [selectedIngredients, setselectedIngredients] = useState<string[]>([])
    function addIng(ingredient:string){
        setselectedIngredients([...selectedIngredients,ingredient]);
    }
    
  function showIng(){
    console.log(selectedIngredients);
  }


    return(
       
       
       <>
       <div className="search-wrapper">
  <div className="search-container">
    <input type="text" className="search-input" placeholder="Search" />
    
  </div>
  </div>
  <button className="main-button">DONE</button>


        <div>
 {ingredientTypeInString.map((ing) => (
        
        <div className="ing-card-cont" key={ing} >
            <div className="ing-card" onClick={() => addIng(ing)}>
                <div className="ing-img-cont">
                    <img src={"https://www.bobtailfruit.co.uk/pub/media/catalog/product/cache/118fd06640efc949eafa2123c39b08e3/i/m/img_3622.png"}
                     alt={ing} />
                </div>
                <div className="dec-cont">
                    <h4 className="card-title">{ing}</h4>
                    <div className="cost-select">
                        <MoneyIcon sx={{fontSize:'1.7rem'}}/>
                        <MoneyIcon sx={{fontSize:'2rem'}}/>
                        <MoneyIcon sx={{fontSize:'2.5rem'}}/>
                    </div>
                </div>


            </div>
            
            </div>    
       ))}


        </div>
      
       
       </>



    )

       }