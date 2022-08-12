from .common import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-%oht$c#7&_45kzo^ded+2gjp(^)$m1)*)&q6*ielb(1=qtmxkr'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# CORS_ALLOWED_ORIGINS = [
#     'localhost:8000',
#     '127.0.0.1:8000',
# ]

CORS_ALLOW_ALL_ORIGINS = True

# # EMAIL ADDRESSES
# SENDER_EMAIL = config("SENDER_EMAIL")
# ADMINS_EMAIL = ast.literal_eval(config("ADMINS_EMAIL"))
