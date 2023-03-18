import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import './App.css';
import AppNavBar from './HEADER/AppNav';
import HomePage from './PAGES/Home';
import {FamilyContext} from './Provider/FamilyProvider';
import {getFamily} from './SERVICES/FamilyService';
import {Family} from './MODELS/Family';
import MyFamilyRecipes from './PAGES/Family-Recipe/MyFamilyRecipes'
import AddNewRecipe from './PAGES/Family-Recipe/New-Recipe/NewRecipePage'
import CartPage from './PAGES/Cart/CartPage'
import ChooseIngredients from './PAGES/Family-Recipe/ChooseIngredient';
import {Meal} from "./MODELS/Meal";
import {Cart} from "./MODELS/Cart";

function App() {
    const defaultFamily: Family = {
        cart: new Cart(),
        dayList: [], email: "", familyMembers: [], imgUrl: "", isActive: false, name: "", password: "",
        id: 0,
        favoriteRecipes: []
    }

    const [family, setFamily] = useState<Family>(defaultFamily);
    // const [family, setFamily] = useContext(FamilyContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('null');
    useEffect(() => {
        (async () => {
            try {
                const family = await getFamily();
                setFamily(family);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>


            <FamilyContext.Provider value={family}>


                <Router>
                    <AppNavBar/>

                    <Routes>
                        <Route path='' element={<HomePage/>}/>


                        <Route path='/my-family-recipes' element={<MyFamilyRecipes/>}/>
                        <Route path='/new-recipe' element={<AddNewRecipe/>}/>
                        <Route path='/add-ingredients' element={<ChooseIngredients/>}/>
                        <Route path='/cart' element={<CartPage family={family}/>}/>


                    </Routes>

                </Router>

            </FamilyContext.Provider>

        </>
    );

}

export default App;
