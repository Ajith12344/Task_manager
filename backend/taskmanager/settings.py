import os
from pathlib import Path

# Base Directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret Key
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY','$14_w80r77t^aed1g*oj@1$r#+9_w9apfbkg!9pw44sxr@j@or')

# Debug Setting
DEBUG = False

# Allowed Hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Installed Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', 'corsheaders',
    'tasks',  # Your custom app
]

# Middleware
MIDDLEWARE = [
      'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL Configuration
ROOT_URLCONF = 'taskmanager.urls'

# REST Framework Config
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # Optional, specify the directory for custom templates
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'task_manager_db',  # Your database name
        'USER': 'root',  # Your MySQL username
        'PASSWORD': 'Ajith@123',  # Your MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_ALL_ORIGINS = True

# Static Files
STATIC_URL = '/static/'

# Default Auto Field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'





