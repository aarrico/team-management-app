from django.db import models
from django.utils.translation import gettext_lazy as _


class TeamMember(models.Model):
    class Roles(models.IntegerChoices):
        ADMIN = 0, _("admin")
        REGULAR = 1, _("regular")

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    role = models.IntegerField(choices=Roles, default=Roles.REGULAR)
    addedAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField()
