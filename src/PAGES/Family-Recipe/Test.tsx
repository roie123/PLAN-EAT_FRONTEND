import React from "react";
import Recipe from "../../MODELS/Recipe";


interface TestProps{
recipe :Recipe
}

export default function Test(props:TestProps){



    return(
        <><h1>HI</h1>
        <h1>{props.recipe.estimatedPrice}</h1>
        
        </>
    )
}