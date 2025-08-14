# Shortify

Shortify is a URL shortening service that allows you to create and manage short links easily.

### Backend

ASP.Net Core Web Api

### Frontend

React + SWC

### Database

SQLite LocalDb

## Features

- Shorten long URLs
- Track your short links by special secret link
  - You can view how many times and who viewed your short link.

## Getting Started

### Download

Clone the repository:

```bash
git clone https://github.com/yourusername/shortify.git
cd shortify
```

### Installation

1. Ensure you have [.NET SDK](https://dotnet.microsoft.com/download) installed.
2. Restore dependencies:

```bash
dotnet restore
```

### Running the Application

Start the backend server:

```bash
dotnet run
```

The application will be available at `http://localhost:5001` (or as configured).

## Database Migrations

If you want to add a new model to the backend:

1. Create your new Model.
2. Add it to `Database/ApplicationDbContext.cs` as DbSet<>
3. Open the **Package Manager Console** in Visual Studio.
4. Run the following command to add a migration (replace `[name-of-the-migration]`):

```
add-migration [name-of-the-migration]
```

3. Apply the migration to update the database:

```
update-database
```

## Running the React Application

The frontend is built with React and located in the `frontend` directory.

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

The React app will be available at `http://localhost:5173/` by default.
