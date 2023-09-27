import dayjs from 'dayjs'

import type { TimeFormatter } from '@/types'

/**
 * 获取带格式化的时间
 */

export const formatTime = (
  time: string | number | Date,
  format: TimeFormatter = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(time).format(format)
}
