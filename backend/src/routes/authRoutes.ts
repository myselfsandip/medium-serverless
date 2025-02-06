import { Hono } from 'hono'
import { signup, login } from '../controllers/authController' // Import controller functions

const router = new Hono()

router.post('/signup', signup)
router.post('/login', login)

export default router