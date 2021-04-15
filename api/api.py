from .models import Receipt
from django.contrib.auth.models import User
from friendship.models import Friend, FriendshipRequest
from .serializers import ReceiptSerializer, BalanceSerializer, FriendRequestSerializer, ReceiptReadSerializer
from accounts.serializers import UserSerializer
from django.http import Http404
from django.db.models import Q
from django.db.models import Sum
from django.db.models import Count
from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer


class ReceiptList(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        receipt = Receipt.objects.filter(
            Q(author=request.user) | Q(users=request.user), completed=False).distinct().order_by('-created_at')
        serializer = ReceiptReadSerializer(receipt, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ReceiptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReceiptDetail(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(self, request, pk, format=None):
        receipt = Receipt.objects.get(id=pk)
        receipt.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BalanceList(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        friends = Friend.objects.friends(request.user)
        # For request.user
        context = {'request': request}

        serializer = BalanceSerializer(friends, many=True, context=context)

        return Response(serializer.data)


class ResetBalance(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(self, request, pk, format=None):
        friends = Friend.objects.friends(request.user)
        friend_list = []
        for friend in friends:
            friend_list.append(friend.id)

        if pk != request.user.id and pk in friend_list:
            receipts = Receipt.objects.filter(author=request.user, users=pk)
            for receipt in receipts:
                receipt.users.remove(pk)
                receipt.set_completed()

            receipts = Receipt.objects.filter(author=pk, users=request.user)
            for receipt in receipts:
                receipt.users.remove(request.user)
                receipt.set_completed()

            context = {'request': request}
            serializer = BalanceSerializer(friends, many=True, context=context)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Error"}, status=status.HTTP_400_BAD_REQUEST)


class SearchUser(APIView):
    # List of users
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, username, format=None):
        friends = Friend.objects.filter(
            from_user=request.user.id).values('to_user')
        requests = FriendshipRequest.objects.filter(
            to_user=request.user.id).values('from_user')
        sent_requests = FriendshipRequest.objects.filter(
            from_user=request.user.id).values('to_user')

        queryset = User.objects.filter(
            username__icontains=username).exclude(Q(id=request.user.id) | Q(id__in=friends) | Q(id__in=requests) | Q(id__in=sent_requests))

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class AddFriend(APIView):
    # Add friend
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(self, request, pk, format=None):
        user = User.objects.get(pk=pk)
        Friend.objects.add_friend(request.user, user)
        return Response(status=status.HTTP_201_CREATED)


class ListFriends(APIView):
    # List of request user friends
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        friends = Friend.objects.friends(request.user)
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)


class AcceptFriend(APIView):
    # Accpet friend
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(self, request, pk, format=None):
        friend_request = FriendshipRequest.objects.get(id=pk)
        friend_request.accept()
        return Response(status=status.HTTP_200_OK)


class RejectRequest(APIView):
    # Reject friend
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(self, request, pk, format=None):
        friend_request = FriendshipRequest.objects.get(id=pk)
        friend_request.reject()
        return Response(status=status.HTTP_200_OK)


class ListInvites(APIView):
    # List all unrejected friendship
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        unread_friendship = Friend.objects.unread_requests(user=request.user)
        serializer = FriendRequestSerializer(unread_friendship, many=True)
        return Response(serializer.data)


class RemoveFriend(APIView):
    # Remove friend
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(self, request, pk, format=None):
        friend = User.objects.get(id=pk)
        Friend.objects.remove_friend(request.user, friend)
        return Response(status=status.HTTP_204_NO_CONTENT)
