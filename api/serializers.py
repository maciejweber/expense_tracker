from .models import Receipt
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from friendship.models import Friend
from django.db.models import Sum
from accounts.serializers import UserSerializer
from friendship.models import FriendshipRequest
from django.shortcuts import get_object_or_404
from rest_framework import serializers


class ReceiptReadSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d - %H:%M", read_only=True)
    users = UserSerializer(many=True)

    class Meta:
        model = Receipt
        fields = ['id', 'info', 'value', 'author', 'users', 'created_at']


class ReceiptSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d - %H:%M", read_only=True)

    class Meta:
        model = Receipt
        fields = ['id', 'info', 'value', 'author', 'users', 'created_at']


class BalanceSerializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField('get_value')

    def get_value(self, obj):
        # Request.user
        user = self.context['request'].user
        friends = Friend.objects.friends(user)

        my_receipts = Receipt.objects.values('users').annotate(
            sum=Sum('value')).filter(author=user)
        receipts_for_me = Receipt.objects.values(
            'author').annotate(sum=Sum('value')).filter(users=user)

        value = 0

        for i in my_receipts:
            if i['users'] == obj.id:
                value += i['sum']
        for j in receipts_for_me:
            if j['author'] == obj.id:
                value -= j['sum']
        return value

    class Meta:
        model = User
        fields = ['id', 'username', 'value']


class FriendRequestSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')

    def get_username(self, obj):
        user = User.objects.get(id=obj.from_user.id)
        return user.username

    class Meta:
        model = FriendshipRequest
        fields = ['id', 'from_user', 'to_user', 'username']
