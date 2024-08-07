import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timerDisplay: string = '00:00:00';
  timerSeconds: number = 0; // Initially set to 0
  timerPaused: boolean = false;
  timerInterval: any;
  @Input() inputHours: number = 0;
  @Input() inputMinutes: number = 0;
  @Input() inputSeconds: number = 0;

  @Input() showForm: boolean = false; 
  @Input() showControls: boolean = false; 
  @Input() showStart: boolean = false; 
  @Input() startBtnText: string = "";

  // Event emitters for pause, resume, and completion
  @Output() pauseEvent = new EventEmitter<void>();
  @Output() resumeEvent = new EventEmitter<void>();
  @Output() timeCompleteEvent = new EventEmitter<void>();

  ngOnInit(): void {
    // Do not start the timer automatically
    this.setTimer();
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
          // alert('¡Tiempo agotado! El examen ha finalizado.');
          this.emitTimeCompleteEvent();
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
    // this.startTimer();
  }

  pauseTimer(): void {
    this.timerPaused = true;
    this.emitPauseEvent();
  }

  resumeTimer(): void {
    this.timerPaused = false;
    this.emitResumeEvent();
  }

  disableGame(): void {
    // Logic to disable the game goes HERE.
  }


  public restartTimer(): void {
    clearInterval(this.timerInterval);
    console.log('Restarting timer...');
    this.timerInterval = setInterval(() => {
          this.timerSeconds = this.inputSeconds + 1;
          this.startTimer();
      },0);
  }


  // Emitters for custom events
  private emitPauseEvent(): void {
    this.pauseEvent.emit();
  }

  private emitResumeEvent(): void {
    this.resumeEvent.emit();
  }

  private emitTimeCompleteEvent(): void {
    this.timeCompleteEvent.emit();
  }

}
