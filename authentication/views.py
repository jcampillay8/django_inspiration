from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.models import User
import json
from validate_email import validate_email

# Create your views here.

class EmailValidationView(View):
    def post(self, request):
        data=json.loads(request.body)
        email=data.get('email')  # Use .get() instead of []
        print(str(email))
        #email=data['email']
        if email is None:
            return JsonResponse({'error':'No email provided'},status=400)
        if not validate_email(email):
            return JsonResponse({'email_error':'Email is invalid'},status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error':'Sorry email in use, please, choose another one'},status=409)
        return JsonResponse({'email_valid': True})


class UsernameValidationView(View):
    def post(self, request):
        data=json.loads(request.body)
        username=data['username']
        if not str(username).isalnum():
            return JsonResponse({'username_error':'username should only contain alphanumeric characters'},status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error':'Sorry username in use, choose another one'},status=409)
        return JsonResponse({'username_valid': True})


class RegistrationView(View):
    def get(self, request):
        return render(request,'authentication/register.html')