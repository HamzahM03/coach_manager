"use client"

import { useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const supabase = createBrowserSupabaseClient();


    const submitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error){
            setStatus(error.message)
        }
        else{
            setStatus("Signed In Successfully")
        }

    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email: </label>
                <input id="email" name="email" value={email} type="email" onChange={(e)=>setEmail(e.target.value)}/>
                
                <label htmlFor="password">Password: </label>
                <input id="password" name="password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
                
            </form>
            <p>{status}</p>
        
        
        </>
    )
    
}