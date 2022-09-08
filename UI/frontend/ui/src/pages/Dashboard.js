import {React , useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken'

const Dashboard = () => {
    const navigate =useNavigate()
    
    const [quote, setQuote] = useState("");

    async function populateQuote(){
        const req = await fetch("http://localhost:4000/api/quote", {
            headers: {
                "x-access-token": localStorage.getItem("token") ,
            },
        })
        const data = req.json()
        if (data.status === "ok"){
            setQuote(data.quote)
        }else{
            alert('Error')
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
            const user = {}
            // const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem("token");
                // navigate("/login")
                navigate("/login");

            }else{
                populateQuote(user.quote)
            }
        
            
        }else{
            navigate("/login")
        }
    } , [])
    return (
        <div>
            <h1>Your Quote: {quote}|| 'no quote found'</h1>
        </div>
    )
}
export default Dashboard;
