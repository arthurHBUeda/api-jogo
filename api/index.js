const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const formatosAceitos = require('./Serializador').formatosAceitos
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1 ) {
        resposta.status(406)
        resposta.end()
        return
    }

    resposta.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

const roteador = require('./rotas/jogos')
app.use('/api/jogos',roteador)

app.use ((erro, requisicao, resposta, proximo) => {
    let status = 500

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status = 400
    }

    if(erro instanceof ValorNaoSuportado){
        status = 406
    }

    resposta.status(status)
    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(3000, () => console.log('A API está funcionando'))