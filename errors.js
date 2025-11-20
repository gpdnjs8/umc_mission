export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 존재 x
export class MissionError extends Error {
  statusCode = 404;
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 중복된 미션
export class DuplicateMissionError extends Error {
  statusCode = 409;
  errorCode = "M002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 가게 존재 x
export class StoreError extends Error {
  statusCode = 404;
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 지역 존재 x
export class RegionError extends Error {
  statusCode = 404;
  errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
