const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador { 
    json (dados) {
        return JSON.stringify(dados)
    }

    serializar (dados) {
        if(this.contentType === 'application/json') {
            return this.json(
                this.filtrar(dados)
            )
        }

        throw new ValorNaoSuportado(contentType)
    }

    filtrarObjeto (dados) {
        const novoObjeto = {}

        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)){
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar (dados) {
        if(Array.isArray(dados)){
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    } 
}

class SerializadorJogo extends Serializador { 
    constructor(contentType) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'nome',
            'categoria',
            'notaMetaCritic',
            'dataLancamento'
        ]
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorJogo: SerializadorJogo,
    formatosAceitos: ['application/json']
}