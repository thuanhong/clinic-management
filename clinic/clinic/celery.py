import os
from celery import Celery
from clinic.settings import BROKER_URL
# Setup Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'clinic.settings')

app = Celery('clinic', broker=BROKER_URL)

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()