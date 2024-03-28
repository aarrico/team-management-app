from django.db import models
from enum import Enum
import uuid


class Roles(Enum):
    ADMIN = 0
    REGULAR = 1


ROLE_CHOICES = [(r.value, r.name) for r in Roles]


class TeamMember(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    role = models.IntegerField(
        choices=ROLE_CHOICES, default=Roles.REGULAR)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.first_name} + {self.last_name}' 

    class Meta:
        ordering = ["role", "first_name"]
