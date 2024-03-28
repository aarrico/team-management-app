from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import TeamMember, Roles


class TeamMemberSerializer(ModelSerializer):
    role_name = SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = ['id', 'first_name', 'last_name',
                  'email', 'phone', 'role_name']

    def get_role_name(self, obj):
        return Roles(obj.role).name
