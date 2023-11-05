import React from 'react'

export const Login = () =>{



  return (
    <div className="container">
            <h1 className="text-center">Login</h1>
            <form autoComplete="off">
                <label>Email</label>
                <input className="form-control form-control-lg my-2" type="email" placeholder="example@example.com" name="email" />
                <label>Password</label>
                <input className="form-control form-control-lg my-2" type="password" placeholder="your password" name="password"/>
                <div className="d-grid gap-2 my-2">
                    <button  className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
  )
}
