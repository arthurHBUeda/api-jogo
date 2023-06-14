const ModeloTabela = require('../rotas/jogos/ModeloTabelaJogos')

ModeloTabela
    .sync()
    .then( () => console.log('Tabela criada com sucesso'))
    .catch(console.log)