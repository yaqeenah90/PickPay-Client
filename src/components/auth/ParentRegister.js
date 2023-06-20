import React, { useRef, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"

export const ParentRegister = (props) => {
    const [parent, setParent] = useState({"account_type": "parent"})
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()
    const firstName = useRef()
    const lastName = useRef()


    const handleRegister = (p) => {
      p.preventDefault()
      registerUser(parent)
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

    const updateParent = (evt) => {
      const copy = {...parent }
      copy[evt.target.name] = evt.target.value
      setParent(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{serverFeedback}</div>
                <button className="button--close" onClick={p => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register Parent Account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateParent} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateParent} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername"> Username </label>
                    <input onChange={updateParent} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input onChange={updateParent} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input onChange={updateParent} type="password" name="verifyPassword" className="form-control"  />
                </fieldset>
                <fieldset>
                    <label htmlFor="monthlyBudget"> Monthly Budget </label>
                    <input onChange={updateParent} type="text" name="monthlyBudget" className="form-control" placeholder="What is your monthly budget for household chores..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
