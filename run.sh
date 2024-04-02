#!/bin/bash

kill_port () {
    if lsof -ti :"$1" -sTCP:LISTEN -t > /dev/null ; then
        lsof -ti :"$1" | xargs kill
    fi
}

echo "Killing existing processes..."
kill_port 8000
kill_port 3000

if [ "$1" != "--stop" ]; then

    echo "Starting backed..."
    (
        cd backend
        if [ ! -d "venv" ]; then
            echo "No virtual environment detected. Creating one..."
            python3 -m venv venv
        fi
        source venv/bin/activate
        echo "Installing requirements to venv..."
        pip install -r requirements.txt

        if [ ! -f db.sqlite3 ]; then
            echo "No sqlite db detected. Running migrate..."
            python manage.py migrate
        fi

        echo "Starting server..."
        nohup python manage.py runserver --noreload &
        be_pid=$!
        echo "Backend started with pid: $be_pid!"
    )

    echo "Starting frontend..."
    (
        cd frontend
        echo "Installing packages..."
        npm install
        echo "Running build..."
        nohup npm run start &
        fe_pid=$!
        echo "Frontend started with pid: $fe_pid!"
    )
fi