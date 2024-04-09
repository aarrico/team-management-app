from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import TeamMembersListCreate, TeamMemberGetUpdateDelete

urlpatterns = [
    path(route='team/', view=TeamMembersListCreate.as_view(),
         name='member-list-create'),
    path(route='team/<str:pk>', view=TeamMemberGetUpdateDelete.as_view(),
         name='member-get-update-delete'),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "docs/",
        SpectacularSwaggerView.as_view(
            template_name="swagger-ui.html", url_name="schema"
        ),
        name="swagger-ui",
    ),
]

urlpatterns += static(settings.SCHEMA_URL, document_root=settings.SCHEMA_ROOT)

print(urlpatterns)