(function() {
	if (!sessionStorage.getItem('tokenId')) return window.location = 'login.html';
	loadEvent();
})();

$('#activitiesModal').on('show.bs.modal', showModal);
$('#activitiesModal').on('hide.bs.modal', closeModal);

function closeModal(event) {
	$(this).find('#list-group-activities').children().remove();
}

function showModal(event) {
	const modal = $(this);

	// Get activities
	const id = event.relatedTarget.id;
	const tokenID = sessionStorage.getItem('tokenId');
	const uri = `${URL_BASE}?action=activity.find&tokenID=${tokenID}&eventID=${id}&selection=all`;

	$.get(uri)
		.done(loadSuccess)
		.fail(loadFail);

	function loadSuccess({ data }) {
		const $listGroup = modal.find('#list-group-activities');
		let elem, dateBegin, dateEnd;

		data.forEach(activity => {
			dateBegin = getFormattedDate(activity.dateBegin);
			dateEnd = getFormattedDate(activity.dateEnd);

			elem =
			 `<div class="list-group-item" id=${activity.activityID}">
			    <h4 class="list-group-item-heading">${activity.name}</h4>
					<p class="list-group-item-text">
						Início: ${dateBegin}
					</p>
					<p class="list-group-item-text">
						Fim: ${dateEnd}
					</p>
			  </div>`;

			$listGroup.append(elem);
		});
	}

	function loadFail(err) {
		console.log(err);
		alert('Ocorreu um erro :(');
	}
}

function loadEvent() {
	const tokenID = sessionStorage.getItem('tokenId');
	const uri = `${URL_BASE}?action=company.event.find&tokenID=${tokenID}&companyID=2&selection=all`;

	$.get(uri)
		.done(loadSuccess)
		.fail(loadFail);

	function loadSuccess({ data }) {
		const $listGroup = $('#list-group-events');
		let elem, dateBegin, dateEnd;
		data.forEach(event => {
			dateBegin = getFormattedDate(event.dateBegin);
			dateEnd = getFormattedDate(event.dateEnd);

			elem =
			 `<a href="#" class="list-group-item" id=${event.eventID} data-toggle="modal" data-target="#activitiesModal">
			    <h4 class="list-group-item-heading">${event.name}</h4>
					<p class="list-group-item-text">
						${event.city} - ${event.state}
					</p>
					<p class="list-group-item-text">
						Início: ${dateBegin}
					</p>
					<p class="list-group-item-text">
						Fim: ${dateEnd}
					</p>
			  </a>`;

			$listGroup.append(elem);
		});
	}

	function loadFail(err) {
		console.log(err);
		alert('Ocorreu um erro :(');
	}
}

function logout(event) {
	event.preventDefault();
	sessionStorage.removeItem('tokenId');
	window.location = 'login.html';
}
