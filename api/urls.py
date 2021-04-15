from django.urls import path, re_path
from .api import (ReceiptList, BalanceList, ResetBalance,
                  SearchUser, ListFriends, RejectRequest,
                  AcceptFriend, ListInvites, RemoveFriend,
                  AddFriend, ReceiptDetail)

urlpatterns = [
    path('receipts/', ReceiptList.as_view()),
    path('delete_receipt/<int:pk>/', ReceiptDetail.as_view()),

    path('balance/', BalanceList.as_view()),
    path('balance/<int:pk>/', ResetBalance.as_view()),

    path('friends/', ListFriends.as_view()),
    path('friend/<int:pk>/', RemoveFriend.as_view()),

    path('send_request/<int:pk>/', AddFriend.as_view()),
    path('requests/', ListInvites.as_view()),
    path('accept_request/<int:pk>/', AcceptFriend.as_view()),
    path('reject_request/<int:pk>/', RejectRequest.as_view()),

    path('search_friend/<str:username>/', SearchUser.as_view()),

]
