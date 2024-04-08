from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.utils import timezone

from .serializers import TeamMemberSerializer
from .models import TeamMember


class TeamMembersListCreate(ListCreateAPIView):
    queryset = TeamMember.objects.all().exclude(deleted_at__isnull=False)
    serializer_class = TeamMemberSerializer

class TeamMemberGetUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def perform_destroy(self, instance):
        instance.deleted_at = timezone.now()
        instance.save()
        
    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())
        return super().perform_update(serializer)
