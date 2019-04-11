//Nesse momento é feito a autenticação da chave para acesso a API 
//Para a criação da chave acesse https://console.developers.google.com/projectselector2/apis/dashboard?supportedpurview=project&project&folder&organizationId

var OAUTH2_CLIENT_ID = 'Colocar seu CLIENT_ID aqui';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Iniciando a API
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Verificando os dados da API pela chave
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Fazendo a chamada do resultado da Verificação
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Autorização concluida
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Criando a comunicação do autenticador Google para utilizar somente daods do YT
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Carregando os dados da GAPI (GOOGLE API) para YT
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}