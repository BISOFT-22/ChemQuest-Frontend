import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timerDisplay: string = '1:00:00';
  timerSeconds: number = 3600; // 1 hora en segundos
  timerPaused: boolean = false;
  timerInterval: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  updateTimer(): void {
    this.timerDisplay = this.formatTime(this.timerSeconds);
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (!this.timerPaused) {
        this.timerSeconds--;
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.timerDisplay = '0:00:00';
          alert('¡Tiempo agotado! El examen ha finalizado.');
          this.disableExam();
        } else {
          this.updateTimer();
        }
      }
    }, 1000);
  }

  pauseTimer(): void {
    this.timerPaused = true;
  }

  resumeTimer(): void {
    this.timerPaused = false;
    this.startTimer();
  }

  disableExam(): void {
    // Aquí iría la lógica para deshabilitar el examen.
  }
}
