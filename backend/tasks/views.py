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
        return Response({'status': 'Task marked as completed'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def completed(self, request):
        completed_tasks = Task.objects.filter(completed=True)
        serializer = self.get_serializer(completed_tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def due_soon(self, request):
        upcoming_tasks = Task.objects.filter(due_date__lte=timezone.now() + timezone.timedelta(days=1))  # Tasks due within the next day
        serializer = self.get_serializer(upcoming_tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Edit a task using PUT request
    @action(detail=True, methods=['put'])
    def edit_task(self, request, pk=None):
        task = self.get_object()
        serializer = self.get_serializer(task, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a task
    @action(detail=True, methods=['delete'])
    def delete_task(self, request, pk=None):
        task = self.get_object()
        task.delete()
        return Response({'status': 'Task deleted'}, status=status.HTTP_204_NO_CONTENT)
