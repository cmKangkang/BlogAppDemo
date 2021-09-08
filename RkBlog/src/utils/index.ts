import moment from 'moment'
export function fromNow(inter: number) {
  let year: number, month: number, day: number, hour: number, minute: number, second;
  let sec = Math.floor(inter / 1000);
	year = Math.floor(sec / 31536000);
	sec = sec % 31536000;
	month = Math.floor(sec / 2592000);
	sec = sec % 2592000;
	day = Math.floor(sec / 86400);
	sec = sec % 86400;
	hour = Math.floor(sec / 3600);
	sec = sec % 3600;
	minute = Math.floor(sec / 60);
	second = sec % 60;
	return `${year}年${month}月${day}天 ${hour}小时${minute}分钟${second}秒`;
}