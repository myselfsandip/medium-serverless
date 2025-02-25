# Medium Blog Project

This is a Medium Blog project built with TypeScript, Prisma, and Hono, deployed on Cloudflare Workers.

## Project Structure

```
medium-blog/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── blogControllers.ts
│   │   ├── types/
│   │   │   ├── blogTypes.ts
│   │   │   ├── envTypes.ts
│   │   │   └── zodSchema.ts
│   │   ├── utils/
│   │   │   └── sendResponse.ts
│   │   └── index.ts
│   └── prisma/
│       └── schema.prisma
├── frontend/
│   └── ...
└── README.md
```

## Prerequisites

- Node.js
- pnpm
- Prisma
- Cloudflare Workers

## Getting Started

### Backend

1. **Install dependencies:**

    ```sh
    pnpm install
    ```

2. **Set up the database:**

    Make sure you have a PostgreSQL database running and update the `DATABASE_URL` in your `.env` file.

3. **Run Prisma migrations:**

    ```sh
    pnpm prisma migrate dev --name init
    ```

4. **Deploy to Cloudflare Workers:**

    Ensure you have the Cloudflare Workers CLI (`wrangler`) installed. If not, install it using:

    ```sh
    pnpm install -g wrangler
    ```

    Then, configure your Cloudflare Workers project by running:

    ```sh
    wrangler login
    wrangler init
    ```

    Finally, deploy your project:

    ```sh
    wrangler publish
    ```

### Frontend

1. **Navigate to the frontend directory:**

    ```sh
    cd frontend
    ```

2. **Install dependencies:**

    ```sh
    pnpm install
    ```

3. **Start the frontend server:**

    ```sh
    pnpm start
    ```

## API Endpoints

### Create Blog

- **URL:** `/api/blogs`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
        "title": "Blog Title",
        "content": "Blog Content",
        "published": true
    }
    ```

- **Response:**

    ```json
    {
        "success": true,
        "data": {
            "id": 1,
            "title": "Blog Title",
            "content": "Blog Content",
            "published": true,
            "authorId": 1
        }
    }
    ```

### Update Blog

- **URL:** `/api/blogs/:id`
- **Method:** `PUT`
- **Request Body:** (similar to create)

### Get Blogs

- **URL:** `/api/blogs`
- **Method:** `GET`
- **Response:**

    ```json
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "title": "Blog Title",
                "content": "Blog Content",
                "published": true,
                "authorId": 1
            }
        ]
    }
    ```

## Project Details

### Backend

- **Framework:** Hono
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Deployment:** Cloudflare Workers

### Frontend

- **Framework:** React JS

