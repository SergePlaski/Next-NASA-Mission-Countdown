// read data from mission-data.json
fetch("./data/mission-data.json")
	.then((response) => {
		if (!response.ok) throw new Error("Error fetching the missions data");
		return response.json();
	})
	.then((data) => {
		const missions = data.missions;
		console.log(missions);
		// find the next mission
		const nextMission = missions.find(
			(mission) => new Date() < new Date(mission.Date)
		);
		console.log("Next Mission:", nextMission);
		if (nextMission) {
			// populate the Mission Info block
			const missionDate = new Date(nextMission.Date + " EST");
			document.getElementById("mission-date").innerHTML =
				missionDate.toDateString() + " EST";
			document.getElementById("mission-name").innerHTML =
				nextMission["Mission"];
			document.getElementById("mission-description").innerHTML =
				nextMission["Description"];
			// initialize and start the countdown
			const countdownDisplay = document.getElementById("countdown-time");
			setInterval(() => {
				countdownDisplay.innerText = getFormattedDateDiff(
					new Date(),
					missionDate
				);
			}, 1000);
		}
	})
	.catch((error) => console.log(error));

function getFormattedDateDiff(fromDate, toDate) {
	const dateDiff = toDate - fromDate;
	const daysDiff = (dateDiff / (86400 * 1000)) | 0; // whole days
	const hrsDiff = ((dateDiff % (86400 * 1000)) / (3600 * 1000)) | 0; // whole hrs
	const minDiff =
		((dateDiff - daysDiff * 86400 * 1000 - hrsDiff * 3600 * 1000) /
			(60 * 1000)) |
		0; // whole minutes
	const secDiff =
		((dateDiff -
			daysDiff * 86400 * 1000 -
			hrsDiff * 3600 * 1000 -
			minDiff * 60 * 1000) /
			1000) |
		0; // whole seconds
	return (
		daysDiff.toString().padStart(2, "0") +
		" : " +
		hrsDiff.toString().padStart(2, "0") +
		" : " +
		minDiff.toString().padStart(2, "0") +
		" : " +
		secDiff.toString().padStart(2, "0")
	);
}
