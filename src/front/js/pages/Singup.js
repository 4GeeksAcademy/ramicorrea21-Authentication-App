import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

export const Singup = () =>{
    const Navigate = useNavigate()
    const {actions, store} = useContext(Context)
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [exists, setExists] = useState()

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        actions.singup(user)
        const registered = store.usersRegistered?.find((usr) => usr.email === user.email)
        if(registered != undefined){
            setExists(true)
        }
    }
    if(exists == true){
        Navigate("/login")
    }
    return(
        <div className="container">
            <h1 className="text-center">Singup</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Email</label>
                <input className="form-control form-control-lg my-2" type="mail" placeholder="example@example.com" name="email" value={user.email} onChange={handleChange}/>
                <label>Password</label>
                <input className="form-control form-control-lg my-2" type="password" placeholder="your password" name="password" value={user.password} onChange={handleChange}/>
                <div className="d-grid gap-2 my-2">
                    <button  className="btn btn-primary">Singup</button>
                </div>
            </form>
        </div>
    )
}