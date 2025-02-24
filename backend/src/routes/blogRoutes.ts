import { Hono } from "hono";
import { createBlog, getAllBlogs, getBlogs, updateBlog } from "../controllers/blogControllers";

const router = new Hono();

router.post('/', createBlog);
router.get('/bulk', getAllBlogs);
router.put('/:id', updateBlog);
router.get('/:id', getBlogs);


export default router;




