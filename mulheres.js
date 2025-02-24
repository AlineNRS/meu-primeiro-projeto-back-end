const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome:'Aline Rodrigues',
        imagem:'https://media.licdn.com/dms/image/v2/C4D22AQG5eUHFgsYRgA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1661433549707?e=1743033600&v=beta&t=GA8X0_SWlQqyKr4i-XquTFHZOIyR1i9t7VezwJV-6z0',
        minibio: 'Sou uma apaixonada pela qualidade de software (QA) e estou comprometida em garantir que nossos produtos atendam aos mais altos padrões. Minha abordagem voltada para resultados e minha capacidade de colaboração eficazmente com equipes multifuncionais me permite contribuir para o sucesso do projeto e a satisfação do cliente.'
    },
    {
        nome:'Maria Julia Rodrigues',
        imagem:'Dançarina',
        minibio:'Estudante dançarina'

    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta,mostraPorta)