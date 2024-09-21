
# Getting Started with Django REST Framework

This project is built using [Django REST Framework](https://www.django-rest-framework.org/).

## Prerequisites

Before you begin, ensure you have installed the following:
- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)

## Setting Up the Project

In the project directory, you can follow these steps:

### 1. Create and Activate a Virtual Environment

Create a virtual environment to keep the dependencies isolated:
```bash
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

### 2. Install Dependencies

Run the following command to install the necessary packages:
```bash
pip install django djangorestframework
```

### 3. Create Django Project

Create a new Django project with the following command:
```bash
django-admin startproject project_name .
```

### 4. Create a Django App

Create a Django app to manage the REST API endpoints:
```bash
python manage.py startapp app_name
```

### 5. Add REST Framework to Installed Apps

Open the `settings.py` file in your project folder and add `'rest_framework'` and your app name to the `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'app_name',
]
```

### 6. Create a Simple API View

In your `app_name/views.py` file, create a simple API view:
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})
```

### 7. Configure URL Routing

In your `app_name/urls.py`, set up the routing for your API:
```python
from django.urls import path
from .views import hello_world

urlpatterns = [
    path('api/hello/', hello_world),
]
```

In your `project_name/urls.py`, include your app's URLs:
```python
from django.urls import path, include

urlpatterns = [
    path('', include('app_name.urls')),
]
```

### 8. Run the Server

Now that your API is set up, run the development server:
```bash
python manage.py runserver
```

Open [http://localhost:8000/api/hello/](http://localhost:8000/api/hello/) to view your simple API.

## Learn More

To learn more about Django REST Framework, check out the [official documentation](https://www.django-rest-framework.org/).