from django.urls import path
from .views import TeamMembersListCreate, TeamMemberGetUpdateDelete

urlpatterns = [
    path(route='team/', view=TeamMembersListCreate.as_view(),
         name='member-list-create'),
    path(route='team/<str:pk>', view=TeamMemberGetUpdateDelete.as_view(),
         name='member-get-update-delete')
]
