import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

/*---- Criando usuário ----*/
app.post('/usuarios', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

/*---- Atualizando usuário ----*/
app.put('/usuarios/:id', async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),  // Convertendo o ID para número inteiro
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

/*---- Deletando usuário ----*/
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),  // Convertendo o ID para número inteiro
      },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

/*---- Buscando usuários ----*/
app.get('/usuarios', async (req, res) => {
  try {
    let users = [];
    if (req.query.name || req.query.email || req.query.age) {
      // Busca com filtros
      users = await prisma.user.findMany({
        where: {
          name: req.query.name,
          email: req.query.email,
          age: req.query.age ? parseInt(req.query.age) : undefined, // Convertendo a idade para número inteiro se houver
        },
      });
    } else {
      // Busca todos os usuários
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Ajustando a porta para funcionar corretamente na Vercel
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});







/* --------------------------------------------------------------------------------------------- */


// import express from 'express';
// import cors from 'cors';
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// const app = express();

// app.use(express.json());
// app.use(cors());

// /*---- Criando usuário----*/
// app.post('/usuarios', async (req, res) => {

//     await prisma.user.create({
//         data: {
//             email: req.body.email,
//             name: req.body.name,
//             age: req.body.age
//         }

//     })

//     res.status(201).json(req.body)


// })


// app.put('/usuarios/:id', async (req, res) => {

//     await prisma.user.update({
//         where: {
//             id: req.params.id
//         },
//         data: {
//             email: req.body.email,
//             name: req.body.name,
//             age: req.body.age
//         }

//     })

//     res.status(201).json(req.body)
// })

// app.delete('/usuarios/:id', async (req, res) => {
//     await prisma.user.delete({
//         where: {
//             id: req.params.id
//         }
//     })
//     res.status(201).json({ message: "Usuário deletado com Sucesso" })
// })

// app.get('/usuarios', async (req, res) => {
//     let users = [] /* Código para fazer filtro das informações do usuário */
//     if (req.query) {
//         users = await prisma.user.findMany({
//             where: {
//                 name: req.query.name,
//                 email: req.query.email,
//                 age: req.query.age

                
//             },
//         })

//     } else {
//         const users = await prisma.user.findMany() /* O findMany procuro todos os usuários dentro de user e vai me retornar retornar  */

//     }


//     res.status(200).json(users); /*A função send envia uma resposta HTTP com o texto "Hello, World!", o send envia uma resposta*/

// });

// app.listen(3000)





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