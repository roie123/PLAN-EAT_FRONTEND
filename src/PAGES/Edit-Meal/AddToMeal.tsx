import {useEffect, useState} from 'react'
import './AddToMealStyle.css'
import {useSelector} from "react-redux";
import {State} from "../../Redux/reducers";
import Recipe from "../../MODELS/Recipe";
import {addPendingRecipes, updateMeal} from "../../SERVICES/MealService";
import store from "../../Redux/store";
import {FamilyRole} from "../../MODELS/ENUMS/FamilyRole";
import {Meal} from "../../MODELS/Meal";
import {Family} from "../../MODELS/Family";
import {Day} from "../../MODELS/Day";
import {FamilyActionTypes} from "../../Redux/reducers/actionTypes/FamilyActionTypes";
import {getFamily} from "../../SERVICES/FamilyService";

interface AddRecipeToMealProps {
    recipes: Recipe[],
    handleDone():void
}

export default function AddToMeal(props: AddRecipeToMealProps) {
    /**
     * This const is the meal the user has selected in the home component
     */
    const selectedMealFromHomeComponent = useSelector((state: State) => state.meal);

   async function sendMealToDBToBeUpdated() {
        const recepies: Recipe[] = [...selectedRecipes, ...selectedMealFromHomeComponent.approvedRecipes];
        selectedMealFromHomeComponent.approvedRecipes = recepies;
        switch (store.getState().currentUser.familyRole){
            case FamilyRole.mainUser:{
                await updateMeal(selectedMealFromHomeComponent.id, selectedMealFromHomeComponent);
                store.dispatch({type:FamilyActionTypes.SET_FAMILY, payload: await getFamily()});

                    props.handleDone();
              await  console.log("Meal Updated thru main user");
                return;
                break;
            }
            case FamilyRole.regular:{
                let userId :number = store.getState().currentUser.id;
            await    console.log( await addPendingRecipes(selectedMealFromHomeComponent.id,userId,selectedRecipes));
                store.dispatch({type:FamilyActionTypes.SET_FAMILY, payload: await getFamily()});
                props.handleDone();

                console.log("Meal Updated thru regular user");
                return;
            }

        }

       window.location.replace('http://localhost:3000/')
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
        // recipe.id = 0;
        setselectedRecipes((prevState) => [...prevState, recipe]);

    }

    /**
     * This use Effect will track the selected Recipes
     */
    useEffect(() => {
    }, [selectedRecipes])

    /**
     * This method removes the Recipe the user wants from the selected
     * @param recipe the recipe to remove
     */
    function handleClickOnImageToRemove(recipe: Recipe) {
        // recipe.id = 0;
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