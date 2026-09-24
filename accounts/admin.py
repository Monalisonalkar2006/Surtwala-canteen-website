

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, OTPVerification


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    model = User

    list_display = (
        'username',
        'email',
        'role',
        'phone',
        'is_active',
        'is_staff',
    )

    list_filter = (
        'role',
        'is_active',
        'is_staff',
    )

    search_fields = (
        'username',
        'email',
        'phone',
    )

    ordering = (
        'username',
    )


@admin.register(OTPVerification)
class OTPVerificationAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'user',
        'otp',
        'is_verified',
        'created_at',
        'expires_at',
    )

    list_filter = (
        'is_verified',
        'created_at',
    )

    search_fields = (
        'user__email',
        'otp',
    )

    ordering = (
        '-created_at',
    )