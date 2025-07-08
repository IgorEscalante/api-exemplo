const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Configuração do Swagger com customizações visuais
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Igor',
      version: '1.0.0',
      description: 'API Node.js com documentação Swagger',
      contact: {
        name: 'Igor Escalante',
        url: 'https://github.com/IgorEscalante'
      },
      license: {
        name: 'MIT',
      }
    },
    servers: [
      { 
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
  },
  apis: ['./index.js'],
};

const specs = swaggerJsDoc(swaggerOptions);

// Configuração visual do Swagger UI
const swaggerUIOptions = {
  customCss: `
    .topbar {
      background-color: #2c3e50;
      padding: 15px 0;
    }
    .topbar-wrapper img {
      content:url('https://nodejs.org/static/images/logo.svg');
      height: 40px;
      width: auto;
    }
    .swagger-ui .info {
      margin: 20px 0;
    }
    .opblock-get {
      background: rgba(97, 175, 254, 0.1);
      border-color: #61affe;
    }
    .opblock-get .opblock-summary-method {
      background: #61affe;
    }
  `,
  customSiteTitle: "API do Igor | Documentação",
  customfavIcon: "/favicon.ico"
};

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, swaggerUIOptions));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     tags: [Principal]
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
 *     tags: [Usuários]
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
  console.log(`\n🚀 API rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger em http://localhost:${PORT}/api-docs`);
  console.log(`🌍 Página inicial em http://localhost:${PORT}\n`);
});