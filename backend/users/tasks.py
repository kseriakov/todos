from celery import shared_task

from django.core.mail import send_mail


@shared_task
def send_no_blocking_mail(
    subject: str,
    message: str,
    from_email: str,
    recipient_list: list[str],
    html_message: str,
    fail_silently=True,
):
    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=recipient_list,
        fail_silently=fail_silently,
        html_message=html_message,
    )
