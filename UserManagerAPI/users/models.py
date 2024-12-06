from django.db import models


class User(models.Model):
    # The primary key `id` is automatically added by Django as an AutoField.
    # We can override if we want a custom field, but here we rely on the default.

    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
