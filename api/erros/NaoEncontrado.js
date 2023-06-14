class NaoEncontrado extends Error {
    constructor () { 
        super('Jogo não foi encontrado')
        this.name = 'NaoEncontrado'
        this.idError = 4
    }
}

module.exports = NaoEncontrado