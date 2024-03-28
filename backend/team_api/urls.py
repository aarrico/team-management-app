from django.urls import path
from team_api.views import TeamMembersListCreate, TeamMemberGetUpdateDelete

urlpatterns = [
    path('team/', TeamMembersListCreate.as_view()),
    path('team/<str:pk>', TeamMemberGetUpdateDelete.as_view())
]
