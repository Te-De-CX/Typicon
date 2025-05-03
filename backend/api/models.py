from django.db import models
from django.contrib.auth.models import User

class HighestScore(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s highest score: {self.score}"

    def update_score(self, new_score):
        """
        Updates the highest score if the new score is greater than the current highest score.
        Also creates a new ScoreHistory entry for the new score.
        """
        if new_score > self.score:
            self.score = new_score
            self.save()
        
        # Create a new ScoreHistory entry for the new score
        ScoreHistory.objects.create(user=self.user, score=new_score)


class ScoreHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='score_history')
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s score: {self.score} at {self.created_at}"