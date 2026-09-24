from django.shortcuts import render

# Create your views here.
import json
import random
import re

from datetime import timedelta

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.hashers import check_password

from .models import User, OTPVerification


@csrf_exempt
def signup(request):

    if request.method != "POST":
        return JsonResponse(
            {"status": 405, "message": "Only POST method is allowed", "content": {}},
            status=405,
        )

    try:
        data = json.loads(request.body)

        name = data.get("name", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        confirm_password = data.get("confirm_password", "")
        phone = data.get("phone", "").strip()
        role = data.get("role", User.Role.CUSTOMER).upper()

        # -------------------------
        # Required field validation
        # -------------------------

        if not name:
            return JsonResponse(
                {"status": 400, "message": "Name is required", "content": {}},
                status=400,
            )

        if not email:
            return JsonResponse(
                {"status": 400, "message": "Email is required", "content": {}},
                status=400,
            )

        if not password:
            return JsonResponse(
                {"status": 400, "message": "Password is required", "content": {}},
                status=400,
            )

        if not confirm_password:
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Confirm password is required",
                    "content": {},
                },
                status=400,
            )

        if not phone:
            return JsonResponse(
                {"status": 400, "message": "Phone number is required", "content": {}},
                status=400,
            )

        # -------------------------
        # Email validation
        # -------------------------

        email_pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"

        if not re.match(email_pattern, email):
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Please enter a valid email address",
                    "content": {},
                },
                status=400,
            )

        # -------------------------
        # Password validation
        # -------------------------

        if len(password) < 8:
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Password must be at least 8 characters",
                    "content": {},
                },
                status=400,
            )

        if password != confirm_password:
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Password and confirm password do not match",
                    "content": {},
                },
                status=400,
            )

        # -------------------------
        # Phone validation
        # -------------------------

        if not phone.isdigit():
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Phone number must contain only digits",
                    "content": {},
                },
                status=400,
            )

        if len(phone) < 10 or len(phone) > 15:
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Phone number must be between 10 and 15 digits",
                    "content": {},
                },
                status=400,
            )

        # -------------------------
        # Role validation
        # -------------------------

        allowed_roles = [User.Role.CUSTOMER, User.Role.STAFF, User.Role.ADMIN]

        if role not in allowed_roles:
            return JsonResponse(
                {
                    "status": 400,
                    "message": "Invalid role. Allowed roles are CUSTOMER, STAFF and ADMIN",
                    "content": {},
                },
                status=400,
            )

        # -------------------------
        # Check email already exists
        # -------------------------

        if User.objects.filter(email=email).exists():
            return JsonResponse(
                {"status": 409, "message": "Email already exists", "content": {}},
                status=409,
            )

        # -------------------------
        # Create User
        # -------------------------

        user = User.objects.create(
            username=name,
            first_name=name,
            email=email,
            password=make_password(password),
            phone=phone,
            role=role,
            is_active=True,
        )

        return JsonResponse(
            {
                "status": 201,
                "message": "Signup successful",
                "content": {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role,
                },
            },
            status=201,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"status": 400, "message": "Invalid JSON data", "content": {}}, status=400
        )

    except Exception as e:
        return JsonResponse(
            {
                "status": 500,
                "message": "Something went wrong",
                "error": str(e),
                "content": {},
            },
            status=500,
        )


from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken


@csrf_exempt
def login(request):

    if request.method != "POST":
        return JsonResponse({
            "status": 405,
            "message": "Only POST method is allowed",
            "content": {}
        }, status=405)

    try:
        data = json.loads(request.body)

        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        if not email:
            return JsonResponse({
                "status": 400,
                "message": "Email is required",
                "content": {}
            }, status=400)

        if not password:
            return JsonResponse({
                "status": 400,
                "message": "Password is required",
                "content": {}
            }, status=400)

        # Find user
        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return JsonResponse({
                "status": 401,
                "message": "Invalid email or password",
                "content": {}
            }, status=401)

        # Check active user
        if not user.is_active:
            return JsonResponse({
                "status": 403,
                "message": "User account is inactive",
                "content": {}
            }, status=403)

        # Check password
        if not check_password(password, user.password):
            return JsonResponse({
                "status": 401,
                "message": "Invalid email or password",
                "content": {}
            }, status=401)

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return JsonResponse({
            "status": 200,
            "message": "Login successful",
            "content": {
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "name": user.first_name,
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role
                },
                "tokens": {
                    "access": access_token,
                    "refresh": refresh_token
                }
            }
        }, status=200)

    except json.JSONDecodeError:

        return JsonResponse({
            "status": 400,
            "message": "Invalid JSON data",
            "content": {}
        }, status=400)

    except Exception as e:

        return JsonResponse({
            "status": 500,
            "message": "Something went wrong",
            "error": str(e),
            "content": {}
        }, status=500)

@csrf_exempt
def send_otp(request):

    if request.method != "POST":
        return JsonResponse({
            "status": 405,
            "message": "Only POST method is allowed",
            "content": {}
        }, status=405)

    try:
        data = json.loads(request.body)

        email = data.get("email", "").strip().lower()

        if not email:
            return JsonResponse({
                "status": 400,
                "message": "Email is required",
                "content": {}
            }, status=400)

        # Find user
        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return JsonResponse({
                "status": 404,
                "message": "User with this email does not exist",
                "content": {}
            }, status=404)

        # Generate new OTP
        otp = str(random.randint(100000, 999999))

        # OTP expiry - 5 minutes
        expires_at = timezone.now() + timedelta(minutes=5)

        # ---------------------------------
        # Update existing OTP or create one
        # ---------------------------------

        OTPVerification.objects.update_or_create(
            user=user,
            defaults={
                "otp": otp,
                "is_verified": False,
                "expires_at": expires_at,
            }
        )

        # Send email
        send_mail(
            subject="Surtwala - OTP Verification",
            message=(
                f"Hello {user.first_name},\n\n"
                f"Your OTP is: {otp}\n\n"
                f"This OTP is valid for 5 minutes.\n\n"
                f"Please do not share this OTP with anyone."
            ),
            from_email=None,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return JsonResponse({
            "status": 200,
            "message": "OTP sent successfully",
            "content": {
                "email": user.email,
                "expires_in": 300
            }
        }, status=200)

    except json.JSONDecodeError:

        return JsonResponse({
            "status": 400,
            "message": "Invalid JSON data",
            "content": {}
        }, status=400)

    except Exception as e:

        return JsonResponse({
            "status": 500,
            "message": "Something went wrong",
            "error": str(e),
            "content": {}
        }, status=500)
@csrf_exempt
def verify_otp(request):

    if request.method != "POST":
        return JsonResponse({
            "status": 405,
            "message": "Only POST method is allowed",
            "content": {}
        }, status=405)

    try:
        data = json.loads(request.body)

        email = data.get("email", "").strip().lower()
        otp = data.get("otp", "").strip()

        if not email:
            return JsonResponse({
                "status": 400,
                "message": "Email is required",
                "content": {}
            }, status=400)

        if not otp:
            return JsonResponse({
                "status": 400,
                "message": "OTP is required",
                "content": {}
            }, status=400)

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return JsonResponse({
                "status": 404,
                "message": "User not found",
                "content": {}
            }, status=404)

        try:
            otp_record = user.otp_verification

        except OTPVerification.DoesNotExist:
            return JsonResponse({
                "status": 404,
                "message": "OTP not found. Please request a new OTP",
                "content": {}
            }, status=404)

        # Check OTP
        if otp_record.otp != otp:
            return JsonResponse({
                "status": 400,
                "message": "Invalid OTP",
                "content": {}
            }, status=400)

        # Check expiry
        if timezone.now() > otp_record.expires_at:
            return JsonResponse({
                "status": 400,
                "message": "OTP has expired. Please request a new OTP",
                "content": {}
            }, status=400)

        # Verify OTP
        otp_record.is_verified = True
        otp_record.save()

        return JsonResponse({
            "status": 200,
            "message": "OTP verified successfully",
            "content": {
                "email": user.email,
                "is_verified": True
            }
        }, status=200)

    except json.JSONDecodeError:

        return JsonResponse({
            "status": 400,
            "message": "Invalid JSON data",
            "content": {}
        }, status=400)

    except Exception as e:

        return JsonResponse({
            "status": 500,
            "message": "Something went wrong",
            "error": str(e),
            "content": {}
        }, status=500)
@csrf_exempt
def logout(request):

    if request.method != "POST":
        return JsonResponse({
            "status": 405,
            "message": "Only POST method is allowed",
            "content": {}
        }, status=405)

    try:
        data = json.loads(request.body)

        refresh_token = data.get("refresh_token")

        if not refresh_token:
            return JsonResponse({
                "status": 400,
                "message": "Refresh token is required",
                "content": {}
            }, status=400)

        token = RefreshToken(refresh_token)
        token.blacklist()

        return JsonResponse({
            "status": 200,
            "message": "Logout successful",
            "content": {}
        }, status=200)

    except Exception as e:

        return JsonResponse({
            "status": 400,
            "message": "Invalid or expired refresh token",
            "error": str(e),
            "content": {}
        }, status=400)
@csrf_exempt
def reset_password(request):

    if request.method != "POST":
        return JsonResponse({
            "status": 405,
            "message": "Only POST method is allowed",
            "content": {}
        }, status=405)

    try:
        data = json.loads(request.body)

        email = data.get("email", "").strip().lower()
        new_password = data.get("new_password", "")
        confirm_password = data.get("confirm_password", "")

        if not email:
            return JsonResponse({
                "status": 400,
                "message": "Email is required",
                "content": {}
            }, status=400)

        if not new_password:
            return JsonResponse({
                "status": 400,
                "message": "New password is required",
                "content": {}
            }, status=400)

        if not confirm_password:
            return JsonResponse({
                "status": 400,
                "message": "Confirm password is required",
                "content": {}
            }, status=400)

        if new_password != confirm_password:
            return JsonResponse({
                "status": 400,
                "message": "Password and confirm password do not match",
                "content": {}
            }, status=400)

        if len(new_password) < 8:
            return JsonResponse({
                "status": 400,
                "message": "Password must be at least 8 characters",
                "content": {}
            }, status=400)

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return JsonResponse({
                "status": 404,
                "message": "User not found",
                "content": {}
            }, status=404)

        try:
            otp_record = user.otp_verification

        except OTPVerification.DoesNotExist:
            return JsonResponse({
                "status": 400,
                "message": "Please verify OTP first",
                "content": {}
            }, status=400)

        if not otp_record.is_verified:
            return JsonResponse({
                "status": 400,
                "message": "Please verify OTP first",
                "content": {}
            }, status=400)

        # Update password
        user.set_password(new_password)
        user.save()

        # Reset OTP verification
        otp_record.is_verified = False
        otp_record.save()

        return JsonResponse({
            "status": 200,
            "message": "Password reset successfully",
            "content": {
                "email": user.email
            }
        }, status=200)

    except json.JSONDecodeError:

        return JsonResponse({
            "status": 400,
            "message": "Invalid JSON data",
            "content": {}
        }, status=400)

    except Exception as e:

        return JsonResponse({
            "status": 500,
            "message": "Something went wrong",
            "error": str(e),
            "content": {}
        }, status=500)
def change_password(request):

    if request.method != "POST":
        return JsonResponse({
            "status": 405,
            "message": "Only POST method is allowed",
            "content": {}
        }, status=405)

    try:
        auth = JWTAuthentication()

        result = auth.authenticate(request)

        if result is None:
            return JsonResponse({
                "status": 401,
                "message": "Authentication credentials were not provided",
                "content": {}
            }, status=401)

        user, token = result

        data = json.loads(request.body)

        old_password = data.get("old_password", "")
        new_password = data.get("new_password", "")
        confirm_password = data.get("confirm_password", "")

        if not old_password:
            return JsonResponse({
                "status": 400,
                "message": "Old password is required",
                "content": {}
            }, status=400)

        if not new_password:
            return JsonResponse({
                "status": 400,
                "message": "New password is required",
                "content": {}
            }, status=400)

        if new_password != confirm_password:
            return JsonResponse({
                "status": 400,
                "message": "Password and confirm password do not match",
                "content": {}
            }, status=400)

        if not check_password(old_password, user.password):
            return JsonResponse({
                "status": 400,
                "message": "Old password is incorrect",
                "content": {}
            }, status=400)

        if len(new_password) < 8:
            return JsonResponse({
                "status": 400,
                "message": "Password must be at least 8 characters",
                "content": {}
            }, status=400)

        user.set_password(new_password)
        user.save()

        return JsonResponse({
            "status": 200,
            "message": "Password changed successfully",
            "content": {}
        }, status=200)

    except json.JSONDecodeError:

        return JsonResponse({
            "status": 400,
            "message": "Invalid JSON data",
            "content": {}
        }, status=400)

    except Exception as e:

        return JsonResponse({
            "status": 500,
            "message": "Something went wrong",
            "error": str(e),
            "content": {}
        }, status=500)