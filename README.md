# JobHub

**JobHub** is a responsive job portal application that streamlines the process of job searching and application. With a modern and user-friendly interface, JobHub offers seamless navigation, secure user authentication, and real-time job data updates.


---

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.  
- **User Authentication**: Secure login and registration with **Clerk**.  
- **Real-Time Job Listings**: Fetch and sync job data seamlessly using **Supabase**.  
- **Error Handling & Validation**: Input validation powered by **Zod** for secure data handling.

---

## 🛠️ Tech Stack

- **Frontend**: [ReactJS](https://reactjs.org/), [ShadcnUI](https://shadcn.dev/)  
- **Backend**: [Supabase](https://supabase.com/)  
- **Authentication**: [Clerk](https://clerk.dev/)  
- **Validation**: [Zod](https://zod.dev/)  

---

---

## 📂 Folder Structure

```
JobHub/
├── public/               # Static files
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # App pages (Home, Login, etc.)
│   ├── utils/            # Helper functions and constants
│   └── App.js            # Entry point
├── .env                  # Environment variables
└── package.json          # Project metadata
```

---

## ⚙️ Installation

Follow these steps to set up JobHub locally:

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/ProtyayMnd50/JobHub.git
   cd JobHub
   ```

2. **Install Dependencies**:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory with the following keys:
   ```env
   REACT_APP_CLERK_API_KEY=your_clerk_api_key
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_KEY=your_supabase_key
   ```

4. **Run the App**:  
   ```bash
   npm run dev
   ```


---

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature-branch`).  
3. Commit your changes (`git commit -m 'Add feature'`).  
4. Push to the branch (`git push origin feature-branch`).  
5. Open a pull request.

---

## 🔗 Links


- **Repository**: [https://github.com/ProtyayMnd50/JobHub](https://github.com/ProtyayMnd50/JobHub)  
- **Contact**: [Protyay Mondal](mailto:protyaymondal32@gmail.com)

---

