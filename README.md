# React + PocketBase Auth (Login / Register / Dashboard)

A minimal React (Vite) frontend that implements **authentication with PocketBase**, **route protection**, and a clean UI for **Login**, **Register** (with T\&C modal), and a **Dashboard** that shows the signed-in user and allows logout.

---

## ✨ Features

* PocketBase auth (`authWithPassword`, `create`, `authRefresh`)
* Protected routes with a `PrivateRoute` wrapper
* Persisted session via `pb.authStore` (survives reloads)
* Login / Register forms with validation
* Terms & Conditions modal
* Dashboard with user email + logout
* Tailwind CSS styling, unified Inter font
* Font Awesome icons via `react-icons`

---

## 🚀 Setup


Clone or unzip this project, then:

**Mac/Linux**

```bash
cp .env.example .env          
npm install
npm run dev                
```

**Windows (PowerShell)**

```powershell
Copy-Item .env.example .env 
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## 🔧 Environment

Create `.env` with:

```
VITE_PB_URL=https://pb.devpgs.app
```


**Test account (for reviewers):**

* Email: `test@devpgs.app`
* Password: `Test@1234!`


---

## 🧠 How Auth Works

* `src/lib/pb.js` sets up the PocketBase client using `VITE_PB_URL`.
* `AuthContext` exposes:

  * `login(email, password)` → `pb.collection('users').authWithPassword(...)`
  * `register(email, password, passwordConfirm)` → `pb.collection('users').create(...)`
  * `logout()` → `pb.authStore.clear()`
  * `user` & `isAuthenticated`
* On app load, it attempts `authRefresh()` if a session exists so you stay signed in after refresh.
* **Route protection:** `PrivateRoute` redirects unauthenticated users to `/login`.

---

## 🧭 Routes

* `/login` — email/password login (redirects to `/` on success)
* `/register` — email/password/confirm + T\&C (redirects to `/login` on success)
* `/` — **Dashboard** (requires auth; shows user email; logout returns to `/login`)

`App.jsx` uses `react-router-dom` with `PrivateRoute` to guard the dashboard.

---

## 🖼️ UI Notes

* Global font: **Inter** (loaded in `index.html`, configured in Tailwind).
* Auth pages use a centered white background image via the `.auth-bg` class:

  * Place your image at `public/assets/lBhsaY.png`
  * Place your logo at `public/assets/TBBzMH.svg`
* Icons: **Font Awesome** via `react-icons`.

---

## 📜 Scripts

```bash
npm run dev       # start dev server (Vite)
npm run build     # production build
npm run preview   # preview production build locally
```

---

## ✅ Manual Test Checklist

* Wrong password → friendly error on Login
* Correct login → redirect to `/`
* Refresh on `/` → still authenticated
* Direct visit to `/` when logged out → redirected to `/login`
* Register validates Confirm Password + requires T\&C
* Logout button clears session and returns to `/login`

---

## 🛠️ Troubleshooting

* **Tailwind CLI on Windows**: If `npx tailwindcss init -p` fails,

  ```bash
  npm i -D tailwindcss postcss autoprefixer
  node node_modules/tailwindcss/lib/cli.js init -p
  ```
* **Images don’t show**: Ensure files are under `public/assets/`, paths start with `/assets/...`, then restart `npm run dev`.

---