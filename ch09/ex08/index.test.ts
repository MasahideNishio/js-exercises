import { AlarmClock, StateManager } from "./index.ts"; // ts でも可

export class AlarmSetStateManager extends StateManager {
  constructor() {
    super();
    this.state = "alarmSet";
  }
}
export class AlarmSoundingStateManager extends StateManager {
  constructor() {
    super();
    this.state = "alarmSounding";
  }
}
export class SnoozingStateManager extends StateManager {
  constructor() {
    super();
    this.state = "snoozing";
  }
}
// テストに使う状態遷移の初期状態を取得する
function GetNormalStateManager() {
  return new StateManager();
}
function GetAlarmSetStateManager() {
  return new AlarmSetStateManager();
}
function GetAlarmSoundingStateManager() {
  return new AlarmSoundingStateManager();
}
function GetSnoozingStateManager() {
  return new SnoozingStateManager();
}

describe("AlarmClock", () => {
  describe("状態遷移テスト", () => {
    it("通常 -> アラームセット中: アラーム設定", () => {
      const clock = new AlarmClock(GetNormalStateManager());
      expect(clock.setAlarm()).toBe("none");
    });

    it("アラームセット中 -> 通常: アラーム解除", () => {
      const clock = new AlarmClock(GetAlarmSetStateManager());
      expect(clock.cancelAlarm()).toBe("none");
    });

    it("アラームセット中 -> アラーム鳴動中: アラーム設定時刻到達", () => {
      const clock = new AlarmClock(GetAlarmSetStateManager());
      expect(clock.reachedToAlarmTime()).toBe("soundAlarm");
    });

    it("アラーム鳴動中 -> 通常: アラーム解除", () => {
      const clock = new AlarmClock(GetAlarmSoundingStateManager());
      expect(clock.cancelAlarm()).toBe("stopAlarm");
    });

    it("アラーム鳴動中 -> スヌーズ中: スヌーズ", () => {
      const clock = new AlarmClock(GetAlarmSoundingStateManager());
      expect(clock.snooze()).toBe("stopAlarm");
    });

    it("スヌーズ中 -> アラーム鳴動中: スヌーズ設定時間経過", () => {
      const clock = new AlarmClock(GetSnoozingStateManager());
      expect(clock.elapseSnoozeTime()).toBe("soundAlarm");
    });

    it("スヌーズ中 -> 通常: アラーム解除", () => {
      const clock = new AlarmClock(GetSnoozingStateManager());
      expect(clock.cancelAlarm()).toBe("none");
    });
  });
});
