import React from "react";
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import './IngredientTypeCardStyles.css'
interface IngredientTypeProps{
    ingredientTypeName:string,
    ingredientImg:string
}

export default function IngredientTypeCard(ingredientTypeProp:IngredientTypeProps){




    return(
        <>
        
        <div className="ing-card-cont" key={ingredientTypeProp.ingredientTypeName} >
            <div className="ing-card">
                <div className="ing-img-cont">
                    <img src={ingredientTypeProp.ingredientImg} alt={ingredientTypeProp.ingredientTypeName} />
                </div>
                <div className="dec-cont">
                    <h4 className="card-title">{ingredientTypeProp.ingredientTypeName}</h4>
                    <div className="cost-select">
                        <MoneyIcon sx={{fontSize:'1.7rem'}}/>
                        <MoneyIcon sx={{fontSize:'2rem'}}/>
                        <MoneyIcon sx={{fontSize:'2.5rem'}}/>
                    </div>
                </div>


            </div>
            
            </div>        
        
        
        </>
    )
}