import React, { useEffect, useState } from "react"
import { getJobs } from "../../managers/JobManager.js"

export const JobList = (props) => {
    const [ jobs, setJobs ] = useState([])

    useEffect(() => {
        getJobs().then(data => setJobs(data))
    }, [])

    return (
        <article className="jobs">
            {
                jobs.map(job => {
                    return <section key={`job--${job.id}`} className="job">
                        <div className="job__title">{job.title} by {job.parent}</div>
                        <div className="job__description"> Job Description {job.description}</div>
                        <div className="job__rate">{job.rate} Pay rate </div>
                    </section>
                })
            }
        </article>
    )
}