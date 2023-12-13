import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const newFileName = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, newFileName);
    (req as any).uploadedFileName = newFileName; 
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, 
  },
};

const uploadHandler = async (req: any, res: any) => {
  upload.single('image')(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const name = (req as any).uploadedFileName; 
      return res.status(200).json({ path:  '/uploads/'+name, name });
    } catch (error) {
      return res.status(500).json({ error: 'Dosya yüklenirken bir hata oluştu.' });
    }
  });
};

export default uploadHandler;