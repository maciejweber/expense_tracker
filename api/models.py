from django.db import models
from django.contrib.auth.models import User


class Receipt(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name='author')
    users = models.ManyToManyField(
        User, related_name='users', blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    info = models.CharField(max_length=128)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.info

    def set_completed(self):
        if self.users.count() == 0:
            self.completed = True
            self.save()
