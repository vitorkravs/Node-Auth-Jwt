import { Request, Response } from "express";
import User from "../models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  async read(req: Request, res: Response) {
    try {
      const usersList = await User.find();
      return res.json(usersList);
    } catch (error) {
      console.log("Erro ao na listagem de usuários:", error);
      // Retorna uma resposta de erro detalhada para o cliente
      return res
        .status(500)
        .json({ error: "Erro do Servidor Interno ao ler produtos" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      // Verifica se todas as informações necessárias foram fornecidas
      if (!name) {
        // Retorna uma resposta de erro se informações insuficientes foram fornecidas
        return res.status(400).json({ error: "Nome Obrigatório" });
      }
      if (!email) {
        return res.status(400).json({ error: "Email Obrigatório" });
      }
      if (!password) {
        return res.status(400).json({ error: "Senha Obrigatória" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "As senhas não conferem" });
      }

      //Verifica se o usuário já possui cadastro
      const userExist = await User.findOne({ email: email });

      if (userExist) {
        return res.status(400).json({
          error: "Usuário já existente, por favor utilize ouutro email",
        });
      }

      //cria uma senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      // Cria um novo user no banco de dados
      const productCreate = await User.create({
        name,
        email,
        password: passwordHash,
      });

      // Retorna o produto recém-criado como resposta
      return res.json(productCreate);
    } catch (error) {
      console.log("Erro ao criar anotação:", error);
      // Retorna uma resposta de erro detalhada para o cliente
      return res
        .status(500)
        .json({ error: "Erro do Servidor Interno ao criar produto" });
    }
  },
};

export default userController;
