const roteador = require('express').Router()
const TabelaJogos = require('./TabelaJogos')
const Jogo = require('./Jogo')
const SerializadorJogo = require('../../Serializador').SerializadorJogo

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaJogos.listar()
    resposta.status(200)
    const serializador = new SerializadorJogo(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try{
        const dadosRecebidos = requisicao.body
        const jogo = new Jogo(dadosRecebidos)
        const resultado = await jogo.criar()

        resposta.status(201)

        const serializador = new SerializadorJogo(
            resposta.getHeader('Content-Type')
        )
        
        resposta.send(
            serializador.serializar(resultado)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idJogo', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idJogo
        const jogo = new Jogo ({ id:id })
        await jogo.carregar()

        resposta.status(200)

        const serializador = new SerializadorJogo (
            resposta.header('Content-Type')
        )
        resposta.send(
            serializador.serializar(jogo)
        )
    } catch (erro) {
       proximo(erro)
    }
})

roteador.put('/:idJogo', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idJogo
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const jogo = new Jogo(dados)
        await jogo.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idJogo', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idJogo
        const jogo = new Jogo ({ id: id})
        await jogo.carregar()
        await jogo.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro){
        proximo(erro)
    }
}) 

module.exports = roteador