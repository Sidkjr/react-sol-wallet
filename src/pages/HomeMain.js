import React from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function HomeMain() {
    const navigate = useNavigate();
    const move_to_keygen = () => {
        navigate("/w-gen");
    }
    return(
        <div>
            <h1>
                Welcome to the main Page, Let's create a Wallet
            </h1>
            <Button onClick={move_to_keygen}>Generate Account</Button>
        </div>
            
    )
}

export default HomeMain