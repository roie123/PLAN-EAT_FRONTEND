import React, { useEffect, useState } from "react";
import { getAllIngredientTypes } from "../../SERVICES/IngredientService";





export default function IngredientTypeList(){

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
    if(!selectedIngredients.includes(ingredient)){
        setselectedIngredients([...selectedIngredients,ingredient]);

    }
}




    return(
        <>
        <div className="map-cont">
 {ingredientTypeInString.map((ing) => (
        
        <div className="ing-card-cont" key={ing} >
            <div className="ing-card" onClick={() => addIng(ing)}>
              
                <div className="dec-cont">
                    <h4 className="card-title">{ing}</h4>
                
                </div>


            </div>
            
            </div>    
       ))}


        </div>
        
        
        </>
    )
}