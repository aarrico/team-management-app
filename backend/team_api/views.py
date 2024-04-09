from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from .serializers import TeamMemberSerializer
from .models import TeamMember


class TeamMembersListCreate(ListCreateAPIView):
    queryset = TeamMember.objects.all().exclude(deleted_at__isnull=False)
    serializer_class = TeamMemberSerializer


class TeamMemberGetUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_anonymous and request.user.role != TeamMember.Role.ADMIN:
            return Response({'error': ['only admins can perform this operation']}, status=status.HTTP_401_UNAUTHORIZED)

        instance = self.get_object()

        if instance.role == TeamMember.Role.ADMIN and TeamMember.objects.filter(role=TeamMember.Role.ADMIN).count() == 1:
            return Response({'error': ['must have at least one admin user']}, status=status.HTTP_400_BAD_REQUEST)

        instance.deleted_at = timezone.now()
        instance.save()

        return Response({'message': f'{instance.first_name} {instance.last_name} successfully deleted!'})

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())
        return super().perform_update(serializer)
