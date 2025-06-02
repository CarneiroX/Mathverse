import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, idade, email, senha } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO usuarios (nome, idade, email, senha) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, idade, email, senha]
    );

    req.session.userId = resultado.rows[0].id;

    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (resultado.rows.length > 0) {
      req.session.userId = resultado.rows[0].id;
      res.status(200).send('Login realizado com sucesso!');
    } else {
      res.status(401).send('Email ou senha inválidos');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

router.get('/check-login', (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

router.post('/pontos-jogo', async (req, res) => {
  const { nome_jogo, pontos } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send('Usuário não está logado.');
  }

  try {
    // Sempre insere uma nova linha, sem verificar
    await pool.query(
      'INSERT INTO pontos_jogos (usuario_id, nome_jogo, pontos) VALUES ($1, $2, $3)',
      [userId, nome_jogo, pontos]
    );

    res.status(200).send('Pontos registrados.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar pontos.');
  }
});

export default router;