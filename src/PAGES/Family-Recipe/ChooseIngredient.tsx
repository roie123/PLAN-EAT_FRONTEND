import React, {FormEvent, useContext, useEffect, useState} from "react";
import IngredientTypeCard from "../../GENERAL-COMPONENTS/IngredientTypeCard";
import {getAllIngredientsBySearch, getAllIngredientTypes} from '../../SERVICES/IngredientService';
import SearchIcon from '@mui/icons-material/Search';
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import './ChooseIngredientsStyles.css'
import {IngredientType} from "../../MODELS/ENUMS/IngredientType";
import {Ingredient} from "../../MODELS/Ingredient";
import {SubmitHandler, useForm} from "react-hook-form";
import IngredientTypeList from "../../GENERAL-COMPONENTS/IngredientComponents/IngredientTypeList";
import IngredientCard from "../../GENERAL-COMPONENTS/IngredientComponents/IngredientCard";
import Recipe from "../../MODELS/Recipe";
import {createRecipe} from "../../SERVICES/RecipeService";
import {NewRecipeValuesContext} from "../../SERVICES/NewRecipeContext";
import {FamilyContext} from "../../Provider/FamilyProvider";
import {FamilyRole} from "../../MODELS/ENUMS/FamilyRole";
import {useNavigate} from "react-router-dom";
import store from "../../Redux/store";
import {Family} from "../../MODELS/Family";
import {FamilyActionTypes} from "../../Redux/reducers/actionTypes/FamilyActionTypes";




interface IngredientAndAmount {
    ingredient:Ingredient,
    amount:number
}

export default function ChooseIngredients() {
    let defaultRecipe: Recipe = {
        requestCreator: {
            id :0 ,
            isActive:true,
            name:"",
            favoriteRecipes:[],
            imgUrl:"",
            familyRole:FamilyRole.regular
        },
        id: 0,
        name: "",
        estimatedPrice: 0,
        ingredients: []
    }
    const recipe: Recipe = useContext(NewRecipeValuesContext);
    const [recipeFromParent, setRecipeFromParent] = useState<Recipe>(recipe);
    let familyId: number = useContext(FamilyContext).id
    useEffect(() => {
        setRecipeFromParent(recipe)
    }, [recipe])

    useEffect(() => {


    }, [recipeFromParent])

    //THE SELECTED INGREDIENTS TO MOVE TO CHOOSE INGREDIENT

    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

//ADDING THE USER IS FINISHED
// const [userIsFinished, setuserIsFinished] = useState<boolean>(false); 
    const [userIsFinished, setuserIsFinished] = useState(false);


    ///CALLING INGREDIENT ITEMS BY SEARCH FEATURE
    const [searchQuery, setsearchQuery] = useState<string>('c');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    //ADDING INGREDIENT FROM THE CHILD ELEMENT 


    const handleAddingIngredient =  (ingredient: Ingredient, finished: boolean) => {

        setSelectedIngredients([...selectedIngredients, ingredient])
        // const temp: IngredientAndAmount[]=[];
        // selectedIngredients.map(ing=>{
        //     if (temp.findIndex((ingredient)=> ingredient.ingredient.id===ing.id) > -1){
        //         const duplicateIngredient : number =temp.findIndex((ingredient)=> ingredient.ingredient.id===ing.id);
        //         let tempObject :IngredientAndAmount = {...temp.at(duplicateIngredient)!}!;
        //         let duplicateAmount:number = tempObject.amount;
        //         temp.splice(duplicateIngredient,1,{ingredient:tempObject.ingredient , amount:duplicateAmount+1});
        //
        //     }else temp.push({ingredient:ing , amount:0 });
        // })//end of map
        // setingredientsAndAmount(temp);

    }


    useEffect(() => {
        (async () => {
            if (searchQuery.length>2){
                const allIngredientsBySearch = await getAllIngredientsBySearch(searchQuery);
                setIngredients(allIngredientsBySearch);
            }

        })();
    }, [searchQuery]);
        const nav = useNavigate();
      async function sendUserToDB() {
        recipeFromParent.ingredients = selectedIngredients;
       let recipeFromDB :Recipe= await createRecipe(recipeFromParent, familyId);
       let newFamily :Family = store.getState().family;
       newFamily.favoriteRecipes.push(recipeFromDB);
       store.dispatch({type:FamilyActionTypes.SET_FAMILY , payload:newFamily});
        nav('/');

    }


    ///THE FORM SEARCH FEATURE
    interface SearchValue {
        value: string
    }

    const {register, handleSubmit} = useForm<SearchValue>();
    const onSave: SubmitHandler<SearchValue> = async (formValues) => {
        setIngredients(await getAllIngredientsBySearch(formValues.value));
    }


    function preventDefaultAndSetIngredientSearchQuery(event: FormEvent, value: string) {
        event.preventDefault();
    }

    const handleFormEvent = (event: FormEvent) => {
        event.preventDefault();
        handleSubmit(onSave)(event);
    }




    ///This section is for the ingredient selection presentation
    const [ingredientsAndAmount,setingredientsAndAmount] =useState<IngredientAndAmount[]>();

useEffect(()=> {
    const temp: IngredientAndAmount[]=[];
    selectedIngredients.map(ing=>{
        if (temp.findIndex((ingredient)=> ingredient.ingredient.id===ing.id) > -1){
            const duplicateIngredient : number =temp.findIndex((ingredient)=> ingredient.ingredient.id===ing.id);
            let tempObject :IngredientAndAmount = {...temp.at(duplicateIngredient)!}!;
            let duplicateAmount:number = tempObject.amount;
            temp.splice(duplicateIngredient,1,{ingredient:tempObject.ingredient , amount:duplicateAmount+1});

        }else temp.push({ingredient:ing , amount:0 });
    })//end of map


    setingredientsAndAmount(temp);
    console.log(":s");
},[selectedIngredients])
//


    return (


        <>
            <div className="search-wrapper">
                <div className="search-container">
                    <form onChange={handleFormEvent}>
                        <input type="text" required={true} {...register("value")} className="search-input" placeholder="Search"/>

                    </form>

                </div>
            </div>
            <div className="filter-buttons-cont">
                <button className="search-button">Filter</button>
                <button className="search-button">Sort</button>
                <button className="search-button" onClick={() => sendUserToDB()}>DONE</button>

            </div>


            {ingredients.map((ing) => (<><IngredientCard ingredient={ing}
                                                         onClick={() => handleAddingIngredient(ing, userIsFinished)}/></>))}


            <div className={'bottom-ing-display'}>
                {ingredientsAndAmount?.map(item=> (
                    <div  className={'ing-cont'}>
                        <p>{item.ingredient.name}</p>
                        <div className={'amount'}>
                            {item.amount+1}
                        </div>
                        <div className={'img-cont'}>


                            <img src={item.ingredient.imgUrl} alt={item.ingredient.name}/>
                        </div>
                    </div>

                ))}
            </div>

        </>


    )

}