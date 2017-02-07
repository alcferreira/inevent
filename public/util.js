window.getFormattedDate = getFormattedDate;
window.URL_BASE = 'https://inevent.us/api/';

function getFormattedDate(date) {
	let formattedDate = new Date(Number(date));

	formattedDate = `${padZero(formattedDate.getDate())}/${padZero(formattedDate.getMonth() + 1)}
		${padZero(formattedDate.getHours())}:${padZero(formattedDate.getMinutes())}`;

	return formattedDate;

	function padZero(data) {
		let pad = data.toString();

		if (pad.length === 2) return pad;
		return `0${pad}`;
	}
};
