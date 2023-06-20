import React, { useEffect, useState } from "react"
import { getJobAssignments } from "../../managers/JobAssignmentManager.js"

export const JobAssignmentList = (props) => {
    const [ jobAssignments, setJobAssignments ] = useState([])

    useEffect(() => {
        getJobAssignments().then(data => setJobAssignments(data))
    }, [])

    return (
        <article className="jobAssignments">
            {
                jobAssignments.map(jobAssignment => {
                    return <section key={`jobAssignment--${jobAssignment.id}`} className="jobAssignment">
                        <div className="jobAssignment__child">{jobAssignment.completed} by {jobAssignment.child}</div>
                        <div className="jobAssignment__parent"> Job Created By {jobAssignment.parent}</div>
                    </section>
                })
            }
        </article>
    )
}