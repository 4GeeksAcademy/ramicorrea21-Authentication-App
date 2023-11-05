import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'

export const Singup = () =>{
    const {actions, store} = useContext(Context)


    const [user, setUser] = useState({
        email:"",
        password:""
    })

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
            console.log(registered)
        }
    }

    return(
        <div className="container">
            <h1 className="text-center">Singup</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Email</label>
                <input className="form-control form-control-lg my-2" type="email" placeholder="example@example.com" name="email" value={user.email} onChange={handleChange}/>
                <label>Password</label>
                <input className="form-control form-control-lg my-2" type="password" placeholder="your password" name="password" value={user.password} onChange={handleChange}/>
                <div className="d-grid gap-2 my-2">
                    <button  className="btn btn-primary">Singup</button>
                </div>
            </form>
        </div>
    )
}