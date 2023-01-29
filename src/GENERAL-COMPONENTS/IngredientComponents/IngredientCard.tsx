import react from 'react';
import { Ingredient } from '../../MODELS/Ingredient';
import './IngredientCardStyles.css'
interface IngredientCardProps{
    ingredient:Ingredient;
    onClick  : (newValue:Ingredient)=> void

}


export default function IngredientCard(props:IngredientCardProps){


    const handleAddButton =(ingredient:Ingredient) => {
        console.log("INGREDEINT FROM CARD ")
        props.onClick(ingredient);
    }




    return(

        <>
        <div className="ing-card-comp-cont">
            <div className="ing-comp-card">
                <div className="ing-img-cont">
                    <img className='ing-img' src={props.ingredient.imgUrl} alt={props.ingredient.name} />
                </div>
                <div className="ing-card-desc">
                <div className="ing-card-name">
                    <h4>{props.ingredient.name}</h4>
                </div>
                <div className="ing-price-and-cat">
                    <p>{(props.ingredient.price)?.toPrecision(3)}$</p>
                    <p>{props.ingredient.priceCategory}</p>

                </div>


                </div>
              
                <div className="ing-but-cont">
                    <button className='ing-add-butt' onClick={() => props.onClick(props.ingredient)}>Add</button>
                </div>
            </div>
        </div>
        
        
        
        </>
    )
}