from django.db import models
from enum import Enum


class Roles(Enum):
    ADMIN = 0
    REGULAR = 1


ROLE_CHOICES = [(r.value, r.name) for r in Roles]


class TeamMember(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    role = models.IntegerField(
        choices=ROLE_CHOICES, default=Roles.REGULAR)
    addedAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(blank=True)

    class Meta:
        ordering = ["role", "first_name"]
