import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import AppNavBar from './HEADER/AppNav';
import HomePage from './PAGES/Home';
import axios from 'axios';
import { FamilyContext } from './Provider/FamilyProvider';
import { getFamily } from './SERVICES/FamilyService';
import { Family } from './MODELS/Family';
import MyFamilyPage from './PAGES/My-Family/MyFamilyPage'
import AddNewUser from './PAGES/My-Family/AddNewUser/AddNewUserPage'
import EditMealPage from './PAGES/Edit-Meal/EditMealPage'
import MyFamilyRecipes from './PAGES/Family-Recipe/MyFamilyRecipes'
import AddNewRecipe from './PAGES/Family-Recipe/New-Recipe/NewRecipePage'
import CartPage from './PAGES/Cart/CartPage'
import Home from './PAGES/Home';

function App() {
  const defaultFamily :Family ={
    id:0,
    favoriteRecipes:[]
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
        console.log(family);
        setLoading(false);
      } catch (error:any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
<>


   <FamilyContext.Provider value={family}>
<AppNavBar/>

    <Router>
  <Routes>
  <Route path='' element={<HomePage/>}/>
  <Route path='/my-family' element={<MyFamilyPage/>}/>
  <Route path='/add-new-user' element={<AddNewUser/>}/>
  <Route path='/edit-meal' element={<EditMealPage/>}/>
  <Route path='/my-family-recipes' element={<MyFamilyRecipes/>}/>
  <Route path='/new-recipe' element={<AddNewRecipe/>}/>
  <Route path='/cart' element={<CartPage/>}/>



  </Routes>

</Router>
    </FamilyContext.Provider>
   
  </>
  );
 
}

export default App;
