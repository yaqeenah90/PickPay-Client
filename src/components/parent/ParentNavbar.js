import { Link } from "react-router-dom"
import "./NavBar.css"

export const ParentNavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/ParentRegister">Register Parent Account</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/ChildRegister">Register Child Account</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/">Job Assignments</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/login"
          onClick={
            () => {
              localStorage.removeItem("pickpay")
            }
          }>
          Logout
        </Link>
      </li>
    </ul>
  )
}
