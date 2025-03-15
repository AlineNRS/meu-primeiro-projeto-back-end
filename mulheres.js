const express = require("express")//estou iniciando o express
const router = express.Router()// estou configurando a primeira parte da rota
const cors = require('cors')//estou trazendo o pacote cors que permite consumir essa api no front end.
const conectaBancoDeDados = require('./bancoDeDados')//estou ligando ao arquivo bancoDeDados
conectaBancoDeDados()//eestou chamando a função que conecta o banco de dados

const mulher = require('./mulherModel')

const app = express()// estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333//estou criando a porta

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await mulher.find()

       response.json(mulheresVindasDoBancoDeDados)
    } catch (error) {
        console.log(erro)
    }
   }

//POST
async function criaMulher(request,response){
  const novaMulher = new mulher({    
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

  try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (error) {
    console.log(erro)
  }
}

//PATCH
async function corrigeMulher(request,response){
    try {
        const mulherEncontrada = await mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if(request.body.nome) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (error) {
        console.log(erro)
    }       
  }

//DELETE
async function deletaMulher(request,response) {
   try {
   await mulher.findByIdAndDelete(request.params.id)
   response.json({messagem:'Mulher deletada com sucesso!'}) 
   } catch (error) {
    console.log(erro)
   }
   }

  app.use(router.get('/mulheres', mostraMulheres))//configurei rota GET /mulheres
  app.use(router.post('/mulheres', criaMulher)) //configurei rota POST /mulheres
  app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei a rota PATCH /mulheres/:id
  app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei a rota DELETE //mulheres/:id

  //porta
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}


app.listen(porta,mostraPorta)//servidor ouvindo a porta