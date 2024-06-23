// 状態管理クラスとアラームクラスを分けることで、それぞれをテストしやすいようにする。
// 目覚まし時計の状態
type State =
  | "normal" // 通常
  | "alarmSet" // アラームセット中
  | "alarmSounding" // アラーム鳴動中
  | "snoozing"; // スヌーズ中

// イベント時に発生するアクション
type Action =
  | "none" // 何もしない
  | "soundAlarm" // アラームを鳴らす
  | "stopAlarm"; // アラームを止める

// 状態遷移を管理するクラス
export class StateManager {
  protected state: State;

  constructor() {
    this.state = "normal";
  }

  setAlarm(): Action {
    switch (this.state) {
      case "normal":
        this.state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  cancelAlarm(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "normal";
        return "none";
      case "alarmSounding":
        this.state = "normal";
        return "stopAlarm";
      case "snoozing":
        this.state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  reachedToAlarmTime(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  snooze(): Action {
    switch (this.state) {
      case "alarmSounding":
        this.state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  elapseSnoozeTime(): Action {
    switch (this.state) {
      case "snoozing":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}

// アラームクラス
// 状態遷移の部分は全部StateManagerに任せる
export class AlarmClock {
  private stateManager: StateManager;

  constructor(stateManager: StateManager) {
    this.stateManager = stateManager;
  }

  setAlarm(): Action {
    return this.stateManager.setAlarm();
  }

  cancelAlarm(): Action {
    return this.stateManager.cancelAlarm();
  }

  reachedToAlarmTime(): Action {
    return this.stateManager.reachedToAlarmTime();
  }

  snooze(): Action {
    return this.stateManager.snooze();
  }

  elapseSnoozeTime(): Action {
    return this.stateManager.elapseSnoozeTime();
  }
}
