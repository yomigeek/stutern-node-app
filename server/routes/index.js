import { Router } from 'express';
import authRouter from './auth';

const apiRoutes = Router();

apiRoutes.use('/auth', authRouter);


// Matches /api/v1 the API home route
apiRoutes.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "WELCOME TO MY API"
  });
});

export default apiRoutes;