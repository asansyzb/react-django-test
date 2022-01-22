from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import requests
import json

from . import models, serializers

class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=["GET"], name="Get Waveform")
    def waveform(self, request, *args, **kwargs):
        url = request.GET.get('url', '')
        req = requests.get(url)
        result = json.loads(req.content.decode())
        return Response(result)