function fetchData() {
  const cep = document.getElementById("search").value;
  const erro = document.getElementById("erro");
  erro.textContent = ""; // limpa o conteúdo do elemento de erro

  if (!cep) {
    erro.textContent = "Preencha o campo de CEP."; // exibe mensagem de erro se o campo estiver vazio
    return;
  }
  if (cep.length < 8) {
    erro.textContent = "CEP Inválido!"; // exibe mensagem de erro se o CEP for inválido
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`; // URL da API com o CEP inserido pelo usuário

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      return response.json(); // converte a resposta em JSON
    })
    .then((data) => {
      document.getElementById("rua").textContent = `${data.logradouro}`; // preenche o campo com o logradouro
      document.getElementById("bairro").textContent = `${data.bairro}`; // preenche o campo com o bairro
      document.getElementById("cidade").textContent = `${data.localidade}`; // preenche o campo com o cidade
      document.getElementById("estado").textContent = `${data.uf}`; // preenche o campo com o estado
      console.log(data.logradouro); // faz algo com os dados recebidos
    })
    .catch((error) => {
      console.error("Erro:", error); // exibe o erro no console
      erro.textContent = "Erro ao buscar o CEP. Tente novamente."; // exibe mensagem de erro na tela
    });
  document.getElementById("search").value = ""; // limpa o campo de entrada após a busca
}
