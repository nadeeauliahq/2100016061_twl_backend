import { Request, Response, Router } from 'express';
import Product  from '../models/Product';
import { User } from '../models/User';

const router = Router();

router.get('/owner/:ownerId/:page/:limit', async (req: Request, res: Response) => {
    try {
      const ownerId = req.params.ownerId;
      const page = parseInt(req.params.page) || 1; // Halaman saat ini
      const limit = parseInt(req.params.limit) || 10; // Jumlah produk per halaman
  
      const skip = (page - 1) * limit;
  
      const countPromise = Product.countDocuments({ owner: ownerId }).exec();
      const productsPromise = Product.find({ owner: ownerId })
        .skip(skip)
        .limit(limit)
        .exec();
  
      const [count, products] = await Promise.all([countPromise, productsPromise]);
  
      const totalPages = Math.ceil(count / limit);
  
      res.json({
        page,
        limit,
        totalProducts: count,
        totalPages,
        products,
      });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil produk berdasarkan pemilik.', error });
    }
  });
  

export default router;
