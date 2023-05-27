export default class OpenMeteoService {

    #baseUrl;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    async getTemperatures(lat, long, startDate, endDate, hourFrom, hourTo) {
        const response = await fetch(this.#getUrl(lat, long, startDate, endDate));
        const strResp = await response.json();
        const indexes = [];
        const dateAndTime = [];
        [...strResp.hourly.time].forEach((t, i) => {
            const dateTime = t.split('T');
            const hour = dateTime[1].split(':')[0];
            if (hour >= hourFrom && hour <= hourTo) {
                indexes.push(i);
                dateAndTime.push(dateTime);
            }
        });
        const tempr = strResp.hourly.temperature_2m;
        const apparentTempr = strResp.hourly.apparent_temperature;
        const res = [];
        res.length = indexes.length;
        indexes.forEach((index, i) => res.push({ date: dateAndTime[i][0], time: dateAndTime[i][1], temperature: tempr[index], apparentTemperature: apparentTempr[index] }));
        return res;
    }

    #getUrl(lat, long, startDate, endDate) {
        return `${this.#baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`
    }
}