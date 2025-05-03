export class Timer {
  private intervalId: number | null = null;
  private startTime: number = 0;
  private remainingTime: number;
  private onUpdate: (time: string) => void;
  private onComplete: () => void;
  private duration: number;

  constructor(onUpdate: (time: string) => void, onComplete: () => void, duration: number = 60 * 1000) {
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
    this.duration = duration;
    this.remainingTime = duration;
  }

  start() {
    if (this.intervalId !== null) return;

    this.startTime = Date.now() - (this.duration - this.remainingTime);
    this.intervalId = window.setInterval(() => this.update(), 10);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.remainingTime = this.duration;
    this.onUpdate(this.formatTime(this.remainingTime));
  }

  private update() {
    const elapsedTime = Date.now() - this.startTime;
    this.remainingTime = Math.max(0, this.duration - elapsedTime);

    this.onUpdate(this.formatTime(this.remainingTime));

    if (this.remainingTime <= 0) {
      this.stop();
      this.onComplete();
    }
  }

  private formatTime(time: number): string {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  }

  getRemainingTime(): number {
    return this.remainingTime;
  }
}