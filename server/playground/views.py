from django.shortcuts import render, HttpResponse
from django.core.mail import send_mail, BadHeaderError
from djoser.serializers import SendEmailResetSerializer


def test(request):
    print("Hello World\n\n\n\n\n")
    try:
        send_mail("Subject", "Message",
                  "brijsiyag@gmail.com", ['prakashram9571@gmail.com'])
    except BadHeaderError:
        print("Error in sending mail")
    return HttpResponse("Done")
