import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timerDisplay: string = '0:00:00';
  timerSeconds: number = 0; // Inicialmente en 0
  timerPaused: boolean = false;
  timerInterval: any;
  inputHours: number = 0;
  inputMinutes: number = 0;
  inputSeconds: number = 0;

  ngOnInit(): void {
    // No iniciar el temporizador automáticamente
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
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      if (!this.timerPaused) {
        this.timerSeconds--;
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.timerDisplay = '0:00:00';
          alert('¡Tiempo agotado! El examen ha finalizado.');
          this.disableGame();
        } else {
          this.updateTimer();
        }
      }
    }, 1000);
  }

  setTimer(): void {
    this.timerSeconds = (this.inputHours * 3600) + (this.inputMinutes * 60) + this.inputSeconds;
    this.updateTimer();
    this.startTimer();
  }

  pauseTimer(): void {
    this.timerPaused = true;
  }

  resumeTimer(): void {
    this.timerPaused = false;
  }

  disableGame(): void {
    // Aquí iría la lógica para deshabilitar el juego.
  }
}
