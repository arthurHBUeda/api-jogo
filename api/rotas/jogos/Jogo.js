const TabelaJogos = require('./TabelaJogos')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')
const CampoInvalido = require('../../erros/CampoInvalido')

class Jogo {
    constructor ({id, nome, categoria, notaMetaCritic, dataLancamento, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.nome = nome
        this.categoria = categoria
        this.notaMetaCritic = notaMetaCritic
        this.dataLancamento = dataLancamento
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        this.validar()
        const resultado = await TabelaJogos.inserir({
            nome: this.nome,
            categoria: this.categoria,
            notaMetaCritic: this.notaMetaCritic,
            dataLancamento: this.dataLancamento
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
        return resultado
       }

    async carregar () { 
        const encontrado = await TabelaJogos.pegarPorId(this.id)
        this.nome = encontrado.nome
        this.categoria = encontrado.categoria
        this.notaMetaCritic = encontrado.notaMetaCritic
        this.dataLancamento = encontrado.dataLancamento
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar () {
        await TabelaJogos.pegarPorId(this.id)
        const campos = ['nome','categoria','notaMetaCritic','dataLancamento']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0){
            throw new DadosNaoFornecidos()
        }

        await TabelaJogos.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TabelaJogos.remover(this.id)
    }

    validar () { 
        const campos = ['nome', 'categoria', 'notaMetaCritic', 'dataLancamento']

        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }


}

module.exports = Jogo
