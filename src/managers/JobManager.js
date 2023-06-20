export const getJobs = () => {
    return fetch("http://localhost:8000/jobs/", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}