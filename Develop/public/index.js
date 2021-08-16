init();

async function init() {
    if (location.search.split("=")[1] === undefined) {
        const workout = await API.getLastWorkout();
        if (workout) { //if there is a workout, search its location based upon its id in the URL
            location.search = "?id=" + workout._id;
        } else {
            document.querySelector("#continue-btn").classList.add("d-none") //otherwise, continue
        }
    }
}