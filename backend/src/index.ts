import { Hono } from 'hono'
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import prismaMiddleware from './middleware/prismaMiddleware';




const app = new Hono<{ Bindings: { DATABASE_URL: string } }>();

app.use('*', prismaMiddleware);

app.route('/api/v1', authRoutes)
app.route('/api/v1/blog', blogRoutes)

app.get('/', (c) => c.text('Welcome to the main page!'))

export default app

