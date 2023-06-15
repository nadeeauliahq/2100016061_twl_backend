import express, { Request, Response } from 'express';
import UserModel, { User } from '../models/User';

const userRouter = express.Router();

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email, displayName, password, profile } = req.body;

    const newUser: User = new UserModel({
      email,
      displayName,
      password,
      profile
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat pengguna baru.', error });
  }
});

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar pengguna.', error });
  }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil pengguna.', error });
  }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { email, displayName, password, profile } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { email, displayName, password, profile },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui pengguna.', error });
  }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserModel.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.json({ message: 'Pengguna berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus pengguna.', error });
  }
});

export default userRouter;
