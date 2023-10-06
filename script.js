var pagina = 1; // número da página a ser carregada
var carregando = false; // indica se uma requisição Ajax está em andamento
var divImagens = document.getElementById("images"); // Elemento onde as imagens serão exibidas

// função para carregar mais imagens
function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  var url = "imagens.json"; // Caminho para o arquivo JSON com as imagens
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var images = JSON.parse(ajax.responseText);
      var imagensPagina = images.animals.slice((pagina - 1) * 10, pagina * 10);

      for (const image of imagensPagina) {
        var img = document.createElement("img");
        img.src = image.imagemUrl;
        img.alt = image.name;
        divImagens.appendChild(img);
        
        // Adicionar uma linha divisória entre as imagens
        var hr = document.createElement("hr");
        divImagens.appendChild(hr);
      }
      carregando = false;
      pagina++;
    }
  };
  ajax.send();
}

// detecta quando o usuário chegou no final da página e carrega mais imagens
window.addEventListener("scroll", function() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    carregarImagens();
  }
});

// Chame a função carregarImagens() para carregar imagens iniciais quando a página carrega
carregarImagens();
