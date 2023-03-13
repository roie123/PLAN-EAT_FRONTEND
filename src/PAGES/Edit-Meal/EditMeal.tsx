import react, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../Redux/reducers";
import {User} from "../../MODELS/User";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {deepOrange, red} from "@mui/material/colors";
import * as React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {MealTime} from "../../MODELS/ENUMS/MealTime";
import './EditMealStyle.css'
import {updateMeal} from "../../SERVICES/MealService";
import AddToMeal from "./AddToMeal";
import Recipe from "../../MODELS/Recipe";
import {bindActionCreators} from "redux";
import {updateMealAction} from "../../Redux/action-creators/mealActionCreator";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Meal} from "../../MODELS/Meal";

interface EditMealProps {
    recipes: Recipe[];
}

export default function EditMeal(props: EditMealProps) {

    /**
     * this method handles the display of the children
     * (1) the main component , the EditComponent
     * (2) the child , AddRecipeToMealComponent , the value of the selected meal is passed in redux
     * (3) the child , RemoveRecipe , not a component
     */
    const [displaySelection, setdisplaySelection] = useState<number>(1);

    const selectedMealFromHome = useSelector((state: State) => state.meal);//The selected meal the user picked in the home screen

    /**
     * This state is for the selected Meal Time , controlled by the radio buttons
     */
    const [mealTime, setmealTime] = useState<string>((selectedMealFromHome.mealTime));

    /**
     * This is the state that stores the number of eaters the user wants in the meal
     */
    const [numberOfEaters, setnumberOfEaters] = useState<number>(selectedMealFromHome.numberOfEaters);
    useEffect(() => {
    }, [numberOfEaters])

    /**
     * This function handle the change of the MealTime state
     * @param mealTimeFromForm the mealTime Selected by the user
     */
    function handleChangeOfMeal(mealTimeFromForm: MealTime) {
        setmealTime(mealTimeFromForm);

    }

    /**
     * utils from the redux
     */
    const dispatch = useDispatch();
    const updateMealFunc = bindActionCreators(updateMealAction, dispatch);


    /**
     * This method handels a click on the add button, it takes the values the user has given
     *if the user didn't give any , it will get the default value
     */
    function handleClickOnAddRecipes() {
        selectedMealFromHome.numberOfEaters = numberOfEaters;
        selectedMealFromHome.mealTime = mealTime;
        updateMealFunc(selectedMealFromHome);//this is the state the add recipes will get
        setdisplaySelection(2);

    }

    function handleChangeInNumberOfEaters(event: React.ChangeEvent<HTMLInputElement>) {
        setnumberOfEaters(event.currentTarget.valueAsNumber);
    }

    /**
     * This useStateStores the boolean value of showing the remove button in the recipe list
     */
    const [showingRemoveFeature, setshowingRemoveFeature] = useState<boolean>(false);

    /**
     * This states stores the updated array of the recipes for the meal
     */
    const [displayedRecipes, setdisplayedRecipes] = useState<Recipe[]>(selectedMealFromHome.recipeList);
    useEffect(() => {

        selectedMealFromHome.recipeList = displayedRecipes;
        updateMealFunc(selectedMealFromHome);
    }, [displayedRecipes])//for testing
    /**
     * This method removes a recipe from the meal's  recipe cont
     * @param recipe the recipe the user has selected to remove
     */
    function handleRemoveRecipeFeature(recipe: Recipe) {
        const recipeListWithoutSelectedRecipe: Recipe[] = displayedRecipes.filter((recipe1) => recipe1 !== recipe);
        setdisplayedRecipes(recipeListWithoutSelectedRecipe);

    }

    /**
     * This method sends the selected meal to be updated in the Database
     */
    function sendMealToDB() {
        selectedMealFromHome.numberOfEaters = numberOfEaters;
        selectedMealFromHome.mealTime = mealTime;
        console.log(selectedMealFromHome);
        updateMeal(selectedMealFromHome.id, selectedMealFromHome);
        window.location.href = '/'
    }


    return (
        <>
            {(displaySelection === 1) ? (<>
                <div className="edit-meal-cont">
                    <div className="title-cont">
                        <h2>Let's Change Our Meal</h2>
                    </div>

                    <label>How Many Of Us Are Eating</label>
                    <input type="number" onChange={(event) => handleChangeInNumberOfEaters(event)}
                           placeholder={selectedMealFromHome.numberOfEaters.toString()}
                           defaultValue={selectedMealFromHome.numberOfEaters}/>


                    <h4>When Are We Eating ?</h4>
                    <div className="radio-cont">
                        <div className="radio-label-cont">
                            <p>{MealTime.Breakfast}</p>
                            <input type="radio" className={'radio-style'} name={'MEALTIME'} value={MealTime.Breakfast}
                                   onChange={() => setmealTime(MealTime.Breakfast)}/>
                        </div>

                        <div className="radio-label-cont">
                            <p>{MealTime.Lunch}</p>
                            <input type="radio" className={'radio-style'} name={'MEALTIME'} value={MealTime.Lunch}
                                   onChange={() => setmealTime(MealTime.Lunch)}/>
                        </div>


                        <div className="radio-label-cont">
                            <p>{MealTime.Dinner}</p>
                            <input type="radio" className={'radio-style'} name={'MEALTIME'} value={MealTime.Dinner}
                                   onChange={() => setmealTime(MealTime.Dinner)}/>
                        </div>
                    </div>

                    <div className="add-and-remove-cont">
                        <button className={'button-5'} onClick={() => handleClickOnAddRecipes()}>Add Recipes</button>
                        <button className={'button-5'} onClick={() => setshowingRemoveFeature(true)}>Remove Recipes
                        </button>

                    </div>

                    <div className="recipe-list-cont">
                        {displayedRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-tag">
                                <img src={recipe.imgUrl} alt={recipe.name}/>
                                <p>{recipe.name}</p>
                                {(showingRemoveFeature) ?
                                    <button className={'useful-but'} onClick={() => handleRemoveRecipeFeature(recipe)}>
                                        <RemoveCircleOutlineIcon color={'warning'} sx={{fontSize: '3rem'}}/>

                                    </button> : null}
                            </div>
                        ))}
                    </div>

                </div>
                <button className={'button-5'} style={{fontSize: '2rem'}} onClick={() => sendMealToDB()}>Done</button>


            </>) : null}
            {(displaySelection === 2) ? (<AddToMeal recipes={props.recipes}/>) : null}


        </>

    )

}