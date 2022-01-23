from rest_framework import serializers

from . import models


class TrackSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    moods = serializers.StringRelatedField(many=True)
    main_artists = serializers.StringRelatedField(many=True)
    featured_artists = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Track
        fields = [
            "id",
            "title",
            "length",
            "bpm",
            "genres",
            "moods",
            "main_artists",
            "featured_artists",
            "audio",
            "cover_art",
            "waveform",
            "spotify",
        ]


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="id"
    )

    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "title",
            "tracks"
        ]
