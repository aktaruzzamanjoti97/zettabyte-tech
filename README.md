# Mini Dashboard 

It implements a responsive mini-dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **NextAuth** and **Framer Motion**.

---

## 🚀 Tech Stack
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **JSONPlaceholder API** for sample posts and users
- **NextAuth for authentication

---

## ✨ Features
- **Dashboard Home**  
  - Static summary section with placeholder stats  
  - Animated header / card using Framer Motion  

- **Posts Page (`/posts`)**  
  - Fetches posts from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)  
  - Reusable **Card** components with staggered entrance animation  
  - Each card links to a dynamic details page (`/posts/[id]`)  

- **Single Post (`/posts/[id]`)**  
  - Displays full post details fetched via a custom `useFetch` hook  

- **Users Page (`/users`)**  
  - Responsive table listing name, email, and company  
  - Click a row to open an animated modal with full user details  

- **Profile Page (`/profile`)**  
  - Responsive profile page with authenticated user information 

- **Custom Hook**  
  - `useFetch` handles data fetching, loading, and error states  

- **Error Handling**  
  - Loading indicators and clear error messages  
  - Button to simulate a failed request for intentional error demonstration  

- **Animations**  
  - Smooth page and component transitions  
  - Staggered card animations  
  - Modal scale/opacity transitions  

---

## 🛠 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install    # or pnpm install / yarn install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
npm start
