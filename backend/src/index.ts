import { Hono } from 'hono'
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import prismaMiddleware from './middleware/prismaMiddleware';
import authMiddleware from './middleware/authMiddleware';
import errorHandler from './middleware/errorHandler';
import { cors } from 'hono/cors';




const app = new Hono<{ Bindings: { DATABASE_URL: string } }>();


app.use('*', cors());
app.use('*', prismaMiddleware);
app.use('/api/v1/blog/*', authMiddleware);


app.route('/api/v1', authRoutes);
app.route('/api/v1/blog', blogRoutes);

app.get('/', (c) => c.text('Welcome to the main page!'))

app.use("*", errorHandler);  // Error Handling Middleware

export default app

