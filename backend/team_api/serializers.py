from rest_framework.serializers import ModelSerializer
from .models import TeamMember


class TeamMemberSerializer(ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'first_name', 'last_name',
                  'email', 'phone', 'role', 'profile_pic_src']
