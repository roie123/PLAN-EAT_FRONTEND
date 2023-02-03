import react, {useContext, useEffect, useState} from 'react'
import './AddToMealStyle.css'
import {Family} from "../../MODELS/Family";
import {FamilyContext} from "../../Provider/FamilyProvider";
import {Meal} from "../../MODELS/Meal";
import {EditMealContext} from "../../Provider/EditMealProvider";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../Redux/reducers";
import {bindActionCreators} from "redux";
import {updateMealAction} from "../../Redux/action-creators/mealActionCreator";
import Recipe from "../../MODELS/Recipe";
import {updateMeal} from "../../SERVICES/MealService";

interface AddRecipeToMealProps {
    recipes: Recipe[]
}

export default function AddToMeal(props: AddRecipeToMealProps) {
    /**
     * This const is the meal the user has selected in the home component
     */
    const selectedMealFromHomeComponent = useSelector((state: State) => state.meal);

    function sendMealToDBToBeUpdated() {
        const recepies: Recipe[] = [...selectedRecipes, ...selectedMealFromHomeComponent.recipeList];
        selectedMealFromHomeComponent.recipeList = recepies;
        updateMeal(selectedMealFromHomeComponent.id, selectedMealFromHomeComponent);
        window.location.href = '/'
    }

    /**
     * Those are the selected Recipes the user has clicked on
     */
    const [selectedRecipes, setselectedRecipes] = useState<Recipe[]>([]);

    /**
     * this function will handle the click on the recipe the user selected
     * @param recipe
     */
    function handleClickOnImage(recipe: Recipe) {
        recipe.id = 0;
        setselectedRecipes((prevState) => [...prevState, recipe]);

    }

    /**
     * This use Effect will track the selected Recipes
     */
    useEffect(() => {
        console.log(selectedRecipes);
    }, [selectedRecipes])

    /**
     * This method removes the Recipe the user wants from the selected
     * @param recipe the recipe to remove
     */
    function handleClickOnImageToRemove(recipe: Recipe) {
        recipe.id = 0;
        setselectedRecipes((recipes) => (selectedRecipes.filter((recipeFromArray) => recipeFromArray.name !== recipe.name)));

    }

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
            <div className="title-cont">
                <h4 className='title'>Please Select A Recipe To Add</h4>
            </div>


            <div className="cards-list">

                {props.recipes?.map((recipe) => (

                        <div key={recipe.id} className="card" onClick={() => handleClickOnImage(recipe)}>
                            <div className="card_image"><img src={recipe.imgUrl} alt={recipe.name}/></div>
                            <div className="card_title title-white">
                                <p>{recipe.name}</p>
                            </div>
                        </div>

                    )//End of thingy

                )}</div>


            <div className="selected-recipes-cont">
                {selectedRecipes.map((recipe) => (
                    <div key={recipe.id + 10} className="card" onClick={() => handleClickOnImageToRemove(recipe)}>
                        <div className="card_image"><img src={recipe.imgUrl} alt={recipe.name}/></div>
                        <div className="card_title title-white">
                            <p>{recipe.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="butt-cont">
                <button className='button-5' onClick={() => sendMealToDBToBeUpdated()}>DONE</button>
            </div>
        </>
    )
}