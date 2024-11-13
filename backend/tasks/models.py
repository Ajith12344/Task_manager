from django.db import models
from django.utils import timezone

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low')
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES, default='medium')
    completed = models.BooleanField(default=False)
    reminder_set = models.BooleanField(default=False)  # Indicates if a reminder is set

    def __str__(self):
        return self.title
