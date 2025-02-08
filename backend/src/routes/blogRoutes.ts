import { Hono } from "hono";
import { createBlog, getBlogs, updateBlog } from "../controllers/blogControllers";

const router = new Hono();

router.post('/', createBlog);
router.put('/:id', updateBlog);
router.get('/:id', getBlogs);


export default router;




