import { Hono } from 'hono'
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

const app = new Hono()

app.route('/api/v1', authRoutes)
app.route('/api/v1/blog', blogRoutes)

app.get('/', (c) => c.text('Welcome to the main page!'))

export default app


