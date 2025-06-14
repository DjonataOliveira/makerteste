
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const app = express();

const SECRET_KEY = "sua_chave_secreta_super_segura";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('🗃️  Banco de dados conectado.');
});

// Criar tabela de usuários se não existir
db.run(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
\`);

// Rota de registro
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run(
    \`INSERT INTO users (name, email, password) VALUES (?, ?, ?)\`,
    [name, email, hashed],
    function (err) {
      if (err) return res.status(400).json({ error: "Usuário já existe ou erro ao registrar." });
      res.json({ message: "Registrado com sucesso!" });
    }
  );
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(\`SELECT * FROM users WHERE email = ?\`, [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: "Email ou senha incorretos." });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Email ou senha incorretos." });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: "Login bem-sucedido!", token });
  });
});


// Middleware para verificar token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rota protegida: perfil do usuário
app.get('/profile', verifyToken, (req, res) => {
  db.get("SELECT name, email FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (err || !user) return res.sendStatus(404);
    res.json(user);
  });
});


// Inicializar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:\${PORT}`));
