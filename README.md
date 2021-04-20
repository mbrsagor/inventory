# Inventory web app

> Basically the app for simple inventory management web app. Backend using Django restfully API and frontend data receive Angular.JS

### Setup

The following steps will walk you thru installation on a Mac. I think linux should be similar. It's also possible to develop on a Windows machine, but I have not documented the steps. If you've developed django apps on Windows, you should have little problem getting up and running.

##### Dependencies
> Prerequisites

- Python 3.6.6
- Django 2.2.20
- psql (PostgreSQL) 13.2

##### on Mac
```
brew install pyenv
pyenv install 3.6.6
```

Then create a virtualenv inside the project directory. Please follw the command
```
brew install pyenv-virtualenv
pyenv virtualenv 3.6.6 env_name
```
###### Active your virtualenv
``` source env_name/bin/activate ```

#### Install dependencies and active project.
```
pip install -r requirements.txt
./manage.py migrate
./manage.py runserver
```
