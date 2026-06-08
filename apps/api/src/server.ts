import dotenv from 'dotenv'
dotenv.config();

import express, { Request, Response } from 'express';
import authRoutes from './Auth/routes/authRoute';
import dashboardRoute from './Dashboard/routes/dashboardRoute'
import reportRoute from './Report/routes/reportRoute'

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use('/api', authRoutes)
app.use('/api', dashboardRoute)
app.use('/api', reportRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "Backend server is running smoothly!",
    status: "OK"
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});