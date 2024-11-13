from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=True, methods=['post'])
    def mark_completed(self, request, pk=None):
        task = self.get_object()
        task.completed = True
        task.save()
        return Response({'status': 'Task marked as completed'})

    @action(detail=False, methods=['get'])
    def completed(self, request):
        completed_tasks = Task.objects.filter(completed=True)
        serializer = self.get_serializer(completed_tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def due_soon(self, request):
        upcoming_tasks = Task.objects.filter(due_date__lte=timezone.now() + timezone.timedelta(days=1))  # Filtering tasks due within the next day
        serializer = self.get_serializer(upcoming_tasks, many=True)
        return Response(serializer.data)
