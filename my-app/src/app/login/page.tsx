"use client"

import { useState } from 'react';


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <>
            <form onSubmit={()=>submitHandler}>
                <label htmlFor="email">Email: </label>
                <input id="email" name="email" value={email} type="email" onChange={(e)=>setEmail(e.target.value)}/>
                
                <label htmlFor="password">Password: </label>
                <input id="password" name="password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
                
            </form>
        
        
        </>
    )
    
}