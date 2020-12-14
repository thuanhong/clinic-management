from .celery import app
from celery import Task
import time
from django.core.mail import send_mail, BadHeaderError

class CallbackSendEmail(Task):
    def on_success(self, retval, task_id, args, kwargs):
        return task_id + 'ok'
        pass

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        pass
    pass


@app.task(name='send_email_tasks', base=CallbackSendEmail,)
def send_email(subject, data, receiver):
    try:
        a = send_mail(subject, data, '1751010127tai@ou.edu.vn', [receiver],)
        if a < 0:
            return "User can not receive email"
        return 'Email send success'
    except BadHeaderError:
        return 'bad header'
