import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

ALLOWED_HOSTS = []

DOMAIN = 'http://localhost:8000/'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'djcelery_email',
    'rest_framework',
    'rest_framework_simplejwt',
    'djoser',
    'users.apps.UsersConfig',
    'tasks.apps.TasksConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'todos.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'todos.wsgi.application'


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': os.getenv('POSTGRES_PORT'),
    }
}

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Asia/Krasnoyarsk'

USE_I18N = True

USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = Path(BASE_DIR / 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = Path(BASE_DIR / 'mediafiles')


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.UserTodos'

EMAIL_USE_SSL = True
EMAIL_HOST = "smtp.yandex.ru"
EMAIL_PORT = 465
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = os.getenv("EMAIL_HOST_USER")
# Для указания имени сайта в сообщениях
SITE_NAME = "Todos on Control"

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]

# Для кроссдоменных запросов
# Не забыть установить django-cors-headers
CORS_ALLOW_ALL_ORIGINS = True

DJOSER = {
    'LOGIN_FIELD': 'email',
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}/',
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
    'TOKEN_MODEL': None,
    'SERIALIZERS': {
        'user_create': 'users.serializers.UserCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
        'user': 'users.serializers.UserSerializer',
        'current_user': 'users.serializers.UserSerializer',
    },
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer', 'JWT'),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
}


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': Path(BASE_DIR / 'logs/info.log'),
            'encoding': 'utf-8',
        },
    },
    'loggers': {'': {'level': 'INFO', 'handlers': ['file']}},
}


EMAIL_BACKEND = 'djcelery_email.backends.CeleryEmailBackend'

CELERY_BORKER_URL = os.getenv('CELERY_BROKER_URL')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND')
CELERY_TIMEZONE = 'Asia/Krasnoyarsk'
