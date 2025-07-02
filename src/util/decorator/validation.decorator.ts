import { Matches } from 'class-validator'

export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/

export function IsTimeString() {
  return Matches(TIME_REGEX, {
    message: '시간은 HH:mm 형식이어야 합니다 (00:00 ~ 23:59)',
  })
}
