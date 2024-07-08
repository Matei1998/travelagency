import React from 'react';
import { useNavigate } from "react-router-dom";
import { Pages } from "../Components/Router/router";
import "../styles.css";
import SignUp from "../Components/SignUp";



export const Inregistrare = (): JSX.Element =>{


return(
    <div className="background-inregistrare">
        <SignUp />
    </div>
)


}