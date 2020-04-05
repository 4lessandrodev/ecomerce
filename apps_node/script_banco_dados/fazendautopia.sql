-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fazendautopia
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fazendautopia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fazendautopia` DEFAULT CHARACTER SET latin1 ;
USE `fazendautopia` ;

-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_categoria_cestas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_categoria_cestas` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_categoria_cestas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(256) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `categoria_c_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_categoria_produtos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_categoria_produtos` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_categoria_produtos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(30) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categoria_p_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_cestas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_cestas` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_cestas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `imagem` MEDIUMBLOB NOT NULL,
  `descricao` VARCHAR(30) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `id_categoria_cesta` INT(11) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `preco` DECIMAL(8,2) NOT NULL,
  `alteracoes_permitidas` INT(2) NOT NULL,
  `informacoes_nutricionais` VARCHAR(256) NULL DEFAULT NULL,
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cesta_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_tb_cestas_2_idx` (`id_categoria_cesta` ASC),
  CONSTRAINT `fk_tb_cestas_2`
    FOREIGN KEY (`id_categoria_cesta`)
    REFERENCES `fazendautopia`.`tb_categoria_cestas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_usuarios` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(120) NOT NULL,
  `senha` VARCHAR(30) NOT NULL,
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_excluido` TINYINT(1) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_regioes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_regioes` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_regioes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(256) NULL DEFAULT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `regiao_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_clientes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_clientes` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_clientes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `cep` VARCHAR(8) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `endereco` VARCHAR(50) NOT NULL,
  `codigo_ibge` VARCHAR(20) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `id_regiao` INT(11) NOT NULL,
  `regiao_atendida` TINYINT(1) NOT NULL DEFAULT '1',
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cliente_excluido` TINYINT(1) NOT NULL DEFAULT '0',
  `bairro` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_clientes_2_idx` (`id_regiao` ASC),
  INDEX `fk_tb_clientes_1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_tb_clientes_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `fazendautopia`.`tb_usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_clientes_2`
    FOREIGN KEY (`id_regiao`)
    REFERENCES `fazendautopia`.`tb_regioes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_compras`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_compras` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_compras` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `data_compra` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pedido_aberto` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_tb_compras_10_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_tb_compras_10`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `fazendautopia`.`tb_clientes` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_cestas_compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_cestas_compra` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_cestas_compra` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_cesta` INT(11) NOT NULL,
  `id_compra` INT(11) NOT NULL,
  `quantidade` INT(11) NOT NULL,
  `preco_unitario` DECIMAL(8,2) NOT NULL,
  `produtos` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_cestas_compras_1_idx` (`id_cesta` ASC),
  INDEX `fk_tb_cestas_compras_2_idx` (`id_compra` ASC),
  CONSTRAINT `fk_tb_cestas_compras_1`
    FOREIGN KEY (`id_cesta`)
    REFERENCES `fazendautopia`.`tb_cestas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_cestas_compras_2`
    FOREIGN KEY (`id_compra`)
    REFERENCES `fazendautopia`.`tb_compras` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 57
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_contatos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_contatos` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_contatos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `mensagem` VARCHAR(250) NOT NULL,
  `data_envio` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mensagem_lida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_fornecedores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_fornecedores` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_fornecedores` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(50) NOT NULL,
  `nome_fantasia` VARCHAR(50) NULL DEFAULT NULL,
  `cnpj_cpf` VARCHAR(14) NULL DEFAULT NULL,
  `cep` VARCHAR(8) NULL DEFAULT NULL,
  `cidade` VARCHAR(50) NULL DEFAULT NULL,
  `estado` VARCHAR(2) NULL DEFAULT NULL,
  `endereco` VARCHAR(30) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `bairro` VARCHAR(30) NULL DEFAULT NULL,
  `fornecedor_excluido` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_und_medidas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_und_medidas` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_und_medidas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(256) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `categoria_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_produtos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_produtos` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_produtos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(256) NOT NULL,
  `imagem` MEDIUMBLOB NULL DEFAULT NULL,
  `info_nutricional` VARCHAR(256) NULL DEFAULT NULL,
  `id_categoria_produto` INT(11) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `produto_especial` TINYINT(1) NOT NULL,
  `fator_multiplicador` INT(2) NOT NULL,
  `preco_venda` DECIMAL(10,2) NOT NULL,
  `produto_excluido` TINYINT(1) NOT NULL DEFAULT '0',
  `id_unidade_medida` INT(11) NOT NULL,
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_produtos_1_idx` (`id_categoria_produto` ASC),
  INDEX `fk_tb_produtos_2_idx` (`id_unidade_medida` ASC),
  CONSTRAINT `fk_tb_produtos_1`
    FOREIGN KEY (`id_categoria_produto`)
    REFERENCES `fazendautopia`.`tb_categoria_produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_produtos_2`
    FOREIGN KEY (`id_unidade_medida`)
    REFERENCES `fazendautopia`.`tb_und_medidas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_fornecedor_produtos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_fornecedor_produtos` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_fornecedor_produtos` (
  `id` INT(11) NOT NULL,
  `id_fornecedor` INT(11) NOT NULL,
  `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_fornecedor_produtos_1_idx` (`id_fornecedor` ASC),
  INDEX `fk_tb_fornecedor_produtos_2_idx` (`id_produto` ASC),
  CONSTRAINT `fk_tb_fornecedor_produtos_1`
    FOREIGN KEY (`id_fornecedor`)
    REFERENCES `fazendautopia`.`tb_fornecedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_fornecedor_produtos_2`
    FOREIGN KEY (`id_produto`)
    REFERENCES `fazendautopia`.`tb_produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_lojas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_lojas` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_lojas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(50) NOT NULL,
  `nome_fantasia` VARCHAR(50) NOT NULL,
  `cnpj_cpf` VARCHAR(14) NOT NULL,
  `cep` VARCHAR(8) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `endereco` VARCHAR(30) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `bairro` VARCHAR(30) NOT NULL,
  `loja_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  `id_regiao` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_lojas_1_idx` (`id_regiao` ASC),
  CONSTRAINT `fk_tb_lojas_1`
    FOREIGN KEY (`id_regiao`)
    REFERENCES `fazendautopia`.`tb_regioes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_fretes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_fretes` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_fretes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_origem` INT(11) NOT NULL,
  `id_destino` INT(11) NOT NULL,
  `preco` DECIMAL(8,2) NOT NULL,
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tabela_excluida` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_tb_fretes_1_idx` (`id_destino` ASC),
  INDEX `fk_tb_fretes_2_idx` (`id_origem` ASC),
  CONSTRAINT `fk_tb_fretes_1`
    FOREIGN KEY (`id_destino`)
    REFERENCES `fazendautopia`.`tb_regioes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_fretes_2`
    FOREIGN KEY (`id_origem`)
    REFERENCES `fazendautopia`.`tb_lojas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_inscricoes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_inscricoes` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_inscricoes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `data_inscricao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `emailNewsletter_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_pacotes_planos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_pacotes_planos` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_pacotes_planos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantidade_cestas` INT(11) NOT NULL,
  `id_cesta` INT(11) NOT NULL,
  `preco` DECIMAL(8,2) NOT NULL,
  `descricao` VARCHAR(200) NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `plano_excluido` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_tb_pacotes_planos_1_idx` (`id_cesta` ASC),
  CONSTRAINT `fk_tb_pacotes_planos_1`
    FOREIGN KEY (`id_cesta`)
    REFERENCES `fazendautopia`.`tb_cestas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_tipos_pagamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_tipos_pagamento` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_tipos_pagamento` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `desconto` INT(11) NOT NULL,
  `descricao_regras` VARCHAR(256) NULL DEFAULT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `tipo_pagamento_excluido` TINYINT(1) NOT NULL DEFAULT '0',
  `descricao` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_status_pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_status_pedido` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_status_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_pedidos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_pedidos` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_pedidos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ecobag_adicional` TINYINT(1) NOT NULL,
  `id_tipo_de_pagamento` INT(11) NOT NULL,
  `retirar_na_loja` INT(11) NOT NULL DEFAULT '0',
  `anotacoes` VARCHAR(256) NULL DEFAULT NULL,
  `status` INT(11) NOT NULL DEFAULT '1',
  `id_compras` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_pedidos_2_idx` (`id_compras` ASC),
  INDEX `fk_tb_pedidos_1_idx` (`id_tipo_de_pagamento` ASC),
  INDEX `fk_tb_pedidos_3_idx` (`status` ASC),
  CONSTRAINT `fk_tb_pedidos_1`
    FOREIGN KEY (`id_tipo_de_pagamento`)
    REFERENCES `fazendautopia`.`tb_tipos_pagamento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_pedidos_2`
    FOREIGN KEY (`id_compras`)
    REFERENCES `fazendautopia`.`tb_compras` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_pedidos_3`
    FOREIGN KEY (`status`)
    REFERENCES `fazendautopia`.`tb_status_pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_planos_compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_planos_compra` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_planos_compra` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_plano` INT(11) NOT NULL,
  `id_compra` INT(11) NOT NULL,
  `quantidade` INT(11) NOT NULL,
  `preco_unitario` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_planos_compra_1_idx` (`id_plano` ASC),
  INDEX `fk_tb_planos_compra_2_idx` (`id_compra` ASC),
  CONSTRAINT `fk_tb_planos_compra_1`
    FOREIGN KEY (`id_plano`)
    REFERENCES `fazendautopia`.`tb_pacotes_planos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_planos_compra_2`
    FOREIGN KEY (`id_compra`)
    REFERENCES `fazendautopia`.`tb_compras` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_produtos_compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_produtos_compra` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_produtos_compra` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_produto` INT(11) NOT NULL,
  `id_compra` INT(11) NOT NULL,
  `quantidade` INT(11) NOT NULL,
  `preco_unitario` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_produtos_compra_1_idx` (`id_produto` ASC),
  INDEX `fk_tb_produtos_compra_2_idx` (`id_compra` ASC),
  CONSTRAINT `fk_tb_produtos_compra_1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `fazendautopia`.`tb_produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_produtos_compra_2`
    FOREIGN KEY (`id_compra`)
    REFERENCES `fazendautopia`.`tb_compras` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_produtos_para_cesta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_produtos_para_cesta` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_produtos_para_cesta` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_produto` INT(11) NOT NULL,
  `id_cesta` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produto_2_idx` (`id_cesta` ASC),
  INDEX `fk_produto_1_idx` (`id_produto` ASC),
  CONSTRAINT `fk_produto_1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `fazendautopia`.`tb_produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produto_2`
    FOREIGN KEY (`id_cesta`)
    REFERENCES `fazendautopia`.`tb_cestas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fazendautopia`.`tb_estoque`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fazendautopia`.`tb_estoque` ;

CREATE TABLE IF NOT EXISTS `fazendautopia`.`tb_estoque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_produto` INT NOT NULL,
  `id_compra` INT NOT NULL DEFAULT 0,
  `entrada` TINYINT(1) NOT NULL,
  `data_hora` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_produto_1_idx` (`id_produto` ASC),
  CONSTRAINT `fk_tb_produto_1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `fazendautopia`.`tb_produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO tb_status_pedido
  (descricao)
VALUE('Em aberto');
INSERT INTO tb_status_pedido
  (descricao)
VALUE('Em preparação');
INSERT INTO tb_status_pedido
  (descricao)
VALUE('Em trânsito');
INSERT INTO tb_status_pedido
  (descricao)
VALUE('Concluído');
INSERT INTO tb_status_pedido
  (descricao)
VALUE('Cancelado');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
