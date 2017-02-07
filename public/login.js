(function init() {
	if (sessionStorage.getItem('tokenId')) return window.location = 'eventList.html';
})();

$("#loginForm" ).submit(login);

function login(event) {
  event.preventDefault();

	// Get data from form
  const $form = $(this);
  const username = $form.find("input[id='username']").val();
	const password = $form.find("input[id='password']").val();
	const $errorMessage = $form.find("#errorMessage");
	const $loginButton = $form.find('#loginButton');

	$loginButton.prop('disabled', true);
	$errorMessage.empty().hide();

	// Check form errors
	if (!username) $errorMessage.append('* Informe o usuário<br/>').show();
	if (!password) $errorMessage.append('* Informe a senha').show();
	if (!username || !password) return $loginButton.prop('disabled', false);

	// Prepare params
	const uri = `${URL_BASE}?action=person.signIn&username=${username}`;
	const reqBody = `password=${password}`;
	const headers = {
		'content-type': 'application/x-www-form-urlencoded'
	};

	// Make request
	$.post(uri, reqBody, headers)
		.done(loginSuccess)
		.fail(loginError);

	function loginSuccess(data) {
		sessionStorage.setItem('tokenId', data.data[0].tokenID);
		window.location = 'eventList.html';
	}

	function loginError(err) {
		$loginButton.prop('disabled', false);
		const message = err.status === 401
			? 'Usuário e/ou senha inválidos.'
			: 'Ocorreu um erro ao efetuar login';

		$errorMessage.append(message).show();
	}
}
