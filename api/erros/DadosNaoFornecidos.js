class DadosNaoFornecidos extends Error { 
    constructor () {
        super ('Não foram fornecidos todos os dados necessários')
        this.name = 'DadosNaoFornecidos'
        this.idErro = 0
    }
}

module.exports = DadosNaoFornecidos