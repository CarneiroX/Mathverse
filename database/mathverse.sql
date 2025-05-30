-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/05/2025 às 22:55
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `mathverse`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `atividades`
--

CREATE TABLE `atividades` (
  `id_atividade` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `tipo` enum('quiz','jogo') NOT NULL,
  `descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `atividades`
--

INSERT INTO `atividades` (`id_atividade`, `nome`, `tipo`, `descricao`) VALUES
(1, 'funcoes 1', 'quiz', 'Perguntas sobre funções de primeiro grau.'),
(2, 'funcoes 2', 'quiz', 'Perguntas sobre funções de primeiro grau.'),
(3, 'polinomio1', 'quiz', 'Quiz sobre polinômios.'),
(4, 'polinomio2', 'quiz', 'Quiz sobre polinômios.'),
(5, 'polinomio3', 'quiz', 'Quiz sobre polinômios.'),
(6, 'sistemas lineares1', 'quiz', 'Quiz sobre sistemas lineares.'),
(7, 'sistemas lineares2', 'quiz', 'Quiz sobre sistemas lineares.'),
(8, 'jogo snake', 'jogo', 'O famoso jogo da cobrinha.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `resultados_jogo`
--

CREATE TABLE `resultados_jogo` (
  `id_resultado` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `pontos` int(11) NOT NULL,
  `data_realizacao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `resultados_quiz`
--

CREATE TABLE `resultados_quiz` (
  `id_resultado` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `acertos` int(11) NOT NULL,
  `data_realizacao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `data_cadastro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `atividades`
--
ALTER TABLE `atividades`
  ADD PRIMARY KEY (`id_atividade`);

--
-- Índices de tabela `resultados_jogo`
--
ALTER TABLE `resultados_jogo`
  ADD PRIMARY KEY (`id_resultado`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_atividade` (`id_atividade`);

--
-- Índices de tabela `resultados_quiz`
--
ALTER TABLE `resultados_quiz`
  ADD PRIMARY KEY (`id_resultado`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_atividade` (`id_atividade`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `atividades`
--
ALTER TABLE `atividades`
  MODIFY `id_atividade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `resultados_jogo`
--
ALTER TABLE `resultados_jogo`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `resultados_quiz`
--
ALTER TABLE `resultados_quiz`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `resultados_jogo`
--
ALTER TABLE `resultados_jogo`
  ADD CONSTRAINT `resultados_jogo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultados_jogo_ibfk_2` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`) ON DELETE CASCADE;

--
-- Restrições para tabelas `resultados_quiz`
--
ALTER TABLE `resultados_quiz`
  ADD CONSTRAINT `resultados_quiz_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultados_quiz_ibfk_2` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
