export function getDate():string {
    const date = new Date()
    return `${date.getDate()}_${date.getMonth() +1}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`
}