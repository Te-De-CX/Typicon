// timer.ts
export class Timer {
    private intervalId: number | null = null;
    private startTime: number = 0;
    private remainingTime: number = 60 * 1000; // 1 minute in milliseconds
    private onUpdate: (time: string) => void;
  
    constructor(onUpdate: (time: string) => void) {
      this.onUpdate = onUpdate;
    }
  
    // Start the timer
    start() {
      if (this.intervalId !== null) return; // Prevent multiple intervals
  
      this.startTime = Date.now();
      this.intervalId = setInterval(() => this.update(), 10); // Update every 10ms
    }
  
    // Stop the timer
    stop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  
    // Reset the timer
    reset() {
      this.stop();
      this.remainingTime = 60 * 1000; // Reset to 1 minute
      this.onUpdate(this.formatTime(this.remainingTime));
    }
  
    // Update the timer
    private update() {
      const elapsedTime = Date.now() - this.startTime;
      this.remainingTime = Math.max(0, 60 * 1000 - elapsedTime); // Ensure it doesn't go below 0
  
      this.onUpdate(this.formatTime(this.remainingTime));
  
      if (this.remainingTime <= 0) {
        this.stop();
      }
    }
  
    // Format time as "MM:SS:MS" (minutes:seconds:milliseconds)
    private formatTime(time: number): string {
      const minutes = Math.floor(time / (60 * 1000));
      const seconds = Math.floor((time % (60 * 1000)) / 1000);
      const milliseconds = Math.floor((time % 1000) / 10); // Only show 2 digits for milliseconds
  
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
    }
  }