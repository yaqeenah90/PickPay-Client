import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { ParentRegister } from "../components/auth/ParentRegister"
import { Register }from "../components/auth/ChildRegister"
import { Authorized } from "./Authorized"
import { JobList } from "../components/job/JobList"
import { JobAssignmentList } from "../components/jobAssignment/jobAssisgnmentList"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register-Parent" element={<ParentRegister />} />
            <Route path="/register"element={<Register />} />
            <Route element={<Authorized />}>
            <Route path="/jobs" element={<JobList />} />
            <Route path="/assignments" element={<JobAssignmentList />} />
            </Route>
        </Routes>
    </>
}

