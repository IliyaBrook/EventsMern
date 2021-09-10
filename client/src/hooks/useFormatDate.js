export const useFormatDate = (Date) => {
	let day = Date.getDate()
	let month = Date.getMonth() + 1
	if (month === 0) {
		month = "12"
	} else if (month.toString().length < 2 && month !== 0) {
		month = "0" + month.toString()
	} else month.toString()
	day = day.toString().length < 2 ? "0" + day.toString() : day.toString()
	return `${Date.getFullYear()}-${month}-${day}`
}