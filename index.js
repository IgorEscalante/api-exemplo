const express = require('express');
const app = express();
const PORT = 3000;

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Exemplo',
      version: '1.0.0',
      description: 'Uma API simples com Swagger',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./index.js'], // Lê os comentários deste arquivo
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *         content:
 *           text/plain:
 *             example: "Olá, mundo! 🌎 API no GitHub!"
 */
app.get('/', (req, res) => {
  res.send('Olá, mundo! 🌎 API no GitHub!');
});

/**
 * @swagger
 * /user/{nome}:
 *   get:
 *     summary: Saudação personalizada
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário
 *     responses:
 *       200:
 *         description: Saudação com o nome fornecido
 *         content:
 *           text/plain:
 *             example: "Olá, João! 👋"
 */
app.get('/user/:nome', (req, res) => {
  res.send(`Olá, ${req.params.nome}! 👋`);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});