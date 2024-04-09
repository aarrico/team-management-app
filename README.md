# Instawork Interview - Team Management App

A CRUD application to manage simple data for a team.

## Requirements

Running the application requires the following are installed and their executables installed on your machine's PATH:

- Python 3.9+
- Node 18+

## Running the application

This assumes a unix based system. If on a Windows box [start here](#running-on-windows).

In a terminal from the project's root directory simply run:

```bash
source run.sh
```

This script will perform the following actions:

1. Kill any existing processes on the ports used by the frontend and backend
2. In a subshell, will create a venv and sqlite3 file if necessary, install requirements, and start the backend.
3. In another subshell, will install frontend packages and start the frontend.
4. It reports the process ID for each the backend and frontend after starting each.

### Running on Windows
#### Running the backend
From the project's root directory,

```powershell
cd backend
python -m venv venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Running the frontend
In a separate window from the backend, in the project's root directory,

```powershell
cd frontend
npm install
npm run start
```

## Stopping the application

In a terminal from the project's root directory, pass the `--stop` flag to the run script:

```bash
source run.sh --stop
```

For Window's systems, use ctrl-c to stop each process in the powershell window.

## Running tests

*** Unit tests are not complete in this project, I just did a sample of how to set them up for the backend.

In a terminal from the project's root directory run:

```bash
source run.sh --test
```

## Viewing API Documentation

While the backend is running, navigate to `http://localhost:8000/api/docs/` in your browser to view swagger docs for the API.


## Notes & Design Considerations
- I spent about 8-9 hours on this in total. I admittedly had some ramp up time while working with the backend since it had been some time since I used Django. I wanted to be sure I was still folllowing best practices.
- I did not test the Windows instructions given above as I'm working on macOS, but wanted to add them for completeness to this document.
- In larger React applications, I would use Redux to manage state. I thought it seemed like a lot of unneccessary boilerplate and setup for this size of a project, but also looking at my code now that I'm finished, it might not have been much different..
- I added the profile pic src field to the database, but since there is no way to set it from the frontend in the project requirements, it is not passed back in the frontend's post request. Since I was using the MUI Avatar component, if it is passed an invalid path, it defaults to the icon specified in the requirements.
- I would normally use Docker Compose to run the application locally, but in the interest of time and complexity the `run.sh` script was easier to throw together.
- Since there is only one user, permissions on the backend were not implemented.
- I only built in support for US based phone numbers. In a production app, I'd use a package to handle phone validation and save them in database stripped of unecessary characters with the country code prepended.