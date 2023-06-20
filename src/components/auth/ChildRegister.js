import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Auth.css"
import { registerUser } from "../../managers/AuthManager";

export const Register = () => {
    const [child, setChild] = useState({ "account_type": "child" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()
  
    const handleRegister = (c) => {
      c.preventDefault()
      registerUser(child)
        .then(res => {
          if (res.status === 200) {
            return res.json()
          }
          return res.json().then((json) => {
            throw new Error(JSON.stringify(json))
          });
        })
        .then(createdUser => {
          localStorage.setItem("pickpay", JSON.stringify(createdUser))
          navigate("/")
        })
        .catch(error => {
          setFeedback(JSON.parse(error.message).message)
        })
    }
  
    useEffect(() => {
      if (serverFeedback !== "") {
        conflictDialog.current.showModal()
      }
    }, [serverFeedback])
  
    const updateChild = (evt) => {
      const copy = { ...child }
      copy[evt.target.name] = evt.target.value
      setChild(copy)
    }
  
  
    return (
      <main style={{ textAlign: "center" }}>
        <dialog className="dialog dialog--password" ref={conflictDialog}>
          <div>{serverFeedback}</div>
          <button className="button--close"
            onClick={e => {
              conflictDialog.current.close()
              setFeedback("")
            }}>Close</button>
        </dialog>
  
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="h3 mb-3 font-weight-normal">Register New Account</h1>
          <fieldset>
            <label htmlFor="first_name"> First Name </label>
            <input onChange={updateChild}
              type="text" name="first_name"
              className="form-control" required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="last_name"> Last Name </label>
            <input onChange={updateChild}
              type="text" name="last_name"
              className="form-control" required />
          </fieldset>
          <fieldset>
                    <label htmlFor="inputUsername"> Username </label>
                    <input onChange={updateChild} type="text"
                    name="username" 
                    className="form-control" placeholder="Username" required />
                </fieldset>
          <fieldset>
            <label htmlFor="financial_goal"> Financial Goal? </label>
            <input onChange={updateChild}
              type="number"
              name="financial_goal"
              className="form-control" required />
          </fieldset>
          <fieldset>
            <label htmlFor="email"> Email address </label>
            <input onChange={updateChild}
              type="email"
              name="email"
              className="form-control" required />
          </fieldset>
          <fieldset>
            <label htmlFor="password"> Password </label>
            <input onChange={updateChild}
              type="password"
              name="password"
              className="form-control" required />
          </fieldset>
          <fieldset>
            <label htmlFor="verify_password"> Verify Password </label>
            <input onChange={updateChild}
              type="password"
              name="verify_password"
              className="form-control" 
              placeholder="Verify password" required/>
          </fieldset>
          <fieldset></fieldset>
          <fieldset>
            <button type="submit"> Register </button>
          </fieldset>
        </form>
      </main>
    )
  }
  
  