import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express();
app.use(express.json());
app.use(cors());

/*---- Criando usuário----*/
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }

    })

    res.status(201).json(req.body)


})


app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }

    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).json({ message: "Usuário deletado com Sucesso" })
})

app.get('/usuarios', async (req, res) => {
    let users = [] /* Código para fazer filtro das informações do usuário */
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age

                
            },
        })

    } else {
        const users = await prisma.user.findMany() /* O findMany procuro todos os usuários dentro de user e vai me retornar retornar  */

    }


    res.status(200).json(users); /*A função send envia uma resposta HTTP com o texto "Hello, World!", o send envia uma resposta*/

});

app.listen(3000)





/* 
Criar nossa API de usuários 
- Criar um usuários
- Lista todos os usuários
- Editar um usuários
- Deletar um usuários
*/






/* 
---Banco de dados---
Username: pedrolima
Password: KcFa5tI9ftzorE6J


*/