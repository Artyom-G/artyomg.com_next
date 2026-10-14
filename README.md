# artyomg.com

The source code for my personal portfolio, [artyomg.com](https://artyomg.com). It is a statically exported **Next.js** frontend with a small **Express.js** API that serves the project write-ups and thumbnails.

[**Visit the site**](https://artyomg.com) · [Projects](https://artyomg.com/projects) · [Contact](https://artyomg.com/contact) · [Waterloo CS Webring](https://artyomg.com/waterloo-cs-ring)

## Features

- **Animated landing page** with an interactive particle background and a typed tagline
- **Projects gallery** with filtering by category (Featured, Web, GameDev, AI, ...)
- **Project pages** rendered from Markdown, with support for YouTube videos, images and live embeds (itch.io games, websites)
- **Contact form** that sends email straight from the browser through [EmailJS](https://www.emailjs.com/)
- **Waterloo CS Webring** page, with a few virtual cookies for travelers
- Responsive layout with a desktop nav bar and a mobile bottom tab bar

## Tech stack

| Part | Tools |
| --- | --- |
| Frontend | Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS 4 |
| Visuals | tsParticles, react-typed, lucide-react, react-icons |
| Content | react-markdown + rehype-raw |
| Backend | Express 5, CORS, dotenv |
| Email | EmailJS |

## Project structure

```text
.
├── frontend/                 Next.js app (static export to frontend/out)
│   ├── public/               Static files (e.g. cookie.txt for the webring page)
│   └── src/
│       ├── app/              Routes: /, /projects, /project, /contact, /waterloo-cs-ring
│       ├── assets/           Logo, icons and tsParticles presets
│       └── components/       NavBar, buttons, Markdown renderers, contact form, ...
├── backend/                  Express API
│   ├── controllers/          Route handlers
│   ├── routes/               /projects routes
│   └── data/
│       ├── projects.json     Project cards (title, filters, tags, link)
│       ├── markdown/         One write-up per project
│       └── thumbnails/       One .jpg per project
└── scripts/
    └── rename_data.py        Normalizes markdown/thumbnail file names
```

## Getting started

Requires **Node.js 20+**.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
node server.js
```

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | Port the API listens on | `8000` |
| `FRONTEND` | Origin allowed by CORS | `http://localhost:3000` |

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_BACKEND_API` | Base URL of the backend, e.g. `http://localhost:8000` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID (uses the `user_name`, `user_email` and `message` fields) |

The contact form only needs the EmailJS variables. Everything else works without them.

## API

All routes are served by the backend under `/projects`.

| Method | Route | Returns |
| --- | --- | --- |
| `GET` | `/projects/get_all_project_cards` | Every project card, with a `thumbnail` URL |
| `GET` | `/projects/get_project_card/:title` | A single project card |
| `GET` | `/projects/get_project_markdown/:title` | The project's Markdown write-up |
| `GET` | `/projects/thumbnails/:file` | Thumbnail images |

`:title` is the project title in lowercase with spaces replaced by underscores, e.g. `Rats and Shells` becomes `rats_and_shells`.

## Adding a project

1. Add an entry to `backend/data/projects.json`:

   ```json
   {
       "title": "My Project",
       "filters": ["Featured", "Web"],
       "tags": ["React.js", "Express.js"],
       "link": "https://github.com/Artyom-G/my-project"
   }
   ```

   `filters` drive the filter chips on the projects page. `tags` are shown as smaller badges.

2. Add `backend/data/markdown/my_project.md` and `backend/data/thumbnails/my_project.jpg`. Running `python3 scripts/rename_data.py` from the `scripts/` folder fixes file names that don't follow the lowercase/underscore format.

### Markdown extras

On top of regular Markdown and HTML, write-ups can use these tags:

```html
<youtube embedid="dQw4w9WgXcQ"></youtube>
<picture src="https://example.com/image.jpg" alt="Description"></picture>
<embed src="https://itch.io/embed-upload/123" width="960" height="660" scrolling="no"></embed>
```

Embeds start behind a "Click to interact" overlay and are replaced with a notice on small screens.

## Building for production

```bash
cd frontend
npm run build
```

The site is exported as static files to `frontend/out/`, which can be served by any static host. The backend runs separately with `node server.js`, with `FRONTEND` set to the production origin.

## License

[MIT](LICENSE) © Artyom Gabtraupov
