const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {

    nome:{
        type: Sequelize.STRING,
    },

    categoria:{
        type: Sequelize.STRING,
    },

    notaMetaCritic:{
        type: Sequelize.STRING,
    },

    dataLancamento:{
        type: Sequelize.STRING,
    }
    
}

const opcoes = {
    freezeTableName: true,
    tableName: 'jogos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'DataAtualizacao',
    version: 'versao'

}

module.exports = instancia.define('jogos', colunas, opcoes)