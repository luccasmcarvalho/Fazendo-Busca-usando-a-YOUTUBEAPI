// Liberar o botao somente se estiver logado na API
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
  }
  
  // Procurando o assunto especifico
  function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet'
    });
  
    request.execute(function(response) {
      var str = JSON.stringify(response.result);
      $('#search-container').html('<p>' + str + '</p>');
    });
  }