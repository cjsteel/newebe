# Django settings for newebe project.

# Main variables
DEBUG = True
TEMPLATE_DEBUG = DEBUG
SITE_ID = 1
SECRET_KEY = '*=$m*%d4u8gi$ry8#_ez&**3s#8wtv8x^a3_tdrk$snhd-uw_a'

# Db config is set to sqlite3 because django does not accept synchronize 
# command if nothing is set.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'newebe', 
        'USER': '',   
        'PASSWORD': '', 
        'HOST': '',    
        'PORT': '',    
    }
}

# Couchdb configuration
COUCHDB_DATABASES = (
    ('newebe.news', 'http://127.0.0.1:5984/newebe'),
    ('newebe.platform', 'http://127.0.0.1:5984/newebe'),
)

# Locale configuration
TIME_ZONE = 'America/Chicago'
LANGUAGE_CODE = 'fr-fr'
USE_I18N = True
USE_L10N = True

import os
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# Media configuration : path for CSS, JS and image files.
MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')
MEDIA_ROOT_JS = '%sjs/' % MEDIA_ROOT
MEDIA_ROOT_CSS = '%scss/' % MEDIA_ROOT
MEDIA_ROOT_IMAGES = '%simages/' % MEDIA_ROOT


# Django middleware. CSRF is disabled, because it causes me trouble to post
# data but it should be enabled when security features will be added to the
# project.
MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

# Root URLs module.
ROOT_URLCONF = 'newebe.urls'

# Path to the django templates.
TEMPLATE_ROOT = os.path.join(PROJECT_ROOT, 'templates')
TEMPLATE_DIRS= (
    TEMPLATE_ROOT
)

# App installed in newebe
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',

    'django.contrib.admin',
   # 'django.contrib.staticfiles',

    'couchdbkit.ext.django',
    'newebe.platform',
    'newebe.news',
)

# Fast-cgi need this line for working with Lighttpd.
FORCE_SCRIPT_NAME=""

# Logging stuff for debugging
import logging
logging.basicConfig(
    level = logging.DEBUG,
    format = '%(asctime)s %(levelname)s %(message)s',
    filename = 'newebe.log',
    filemode = 'w'
)

# Static files URLs
STATIC_URL = "/static/"

