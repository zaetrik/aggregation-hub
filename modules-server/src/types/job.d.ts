interface Job {
  moduleId: string;
  interval: number;
  lastExecuted: number;
  execute: boolean;
  running: boolean;
}
