export const getJobAssignments = () => {
    return fetch("http://localhost:8000/job_assignments/", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}