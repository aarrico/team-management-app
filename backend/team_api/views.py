from rest_framework.generics import ListCreateAPIView
from django.db.models import Count

from .serializers import TeamMemberSerializer
from .models import TeamMember


def get_role_name(role):
    return role[0].lower()


class TeamMemberListCreate(ListCreateAPIView):
    model = TeamMember
    queryset = TeamMember.objects.values(
        'id', 'first_name', 'last_name', 'email', 'phone').annotate(count=Count('id'))
    serializer_class = TeamMemberSerializer
