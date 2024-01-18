import { Request, Response, NextFunction } from "express";
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

  //Rota privada
  async privateRoute(req: Request, res: Response) {
    const id = req.params.id;

    //Verifica se o usuário existe
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    res.status(200).json({ user });
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      // Verifica se todas as informações necessárias foram fornecidas
      if (!name) {
        // Retorna uma resposta de erro se informações insuficientes foram fornecidas
        return res.status(422).json({ error: "Nome Obrigatório" });
      }
      if (!email) {
        return res.status(422).json({ error: "Email Obrigatório" });
      }
      if (!password) {
        return res.status(422).json({ error: "Senha Obrigatória" });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ error: "As senhas não conferem" });
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

  //Login users
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(422).json({ error: "Email Obrigatório" });
      }
      if (!password) {
        return res.status(422).json({ error: "Senha Obrigatória" });
      }

      //Verifica se o usuário já possui cadastro
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      //Verifica se a senha está correta
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(404).json({
          error: "Senha incorreta",
        });
      }

      const secret = process.env.SECRET;

      if (secret) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          secret
        );

        res
          .status(200)
          .json({ msg: "Autentificação realizada com sucesso", token });
      }
    } catch (error) {
      console.log("Erro ao fazer login", error);
      // Retorna uma resposta de erro detalhada para o cliente
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },

  checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Acesso negado" });
    }

    try {
      const secret = process.env.SECRET;

      if (secret) {
        jwt.verify(token, secret);
      }
    } catch (error) {
      return res.status(400).json({ msg: "Token Inválido" });
    }
    next();
  },
};

export default userController;
