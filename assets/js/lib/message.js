
class Message {

    constructor(xml) {
        this.userId = xml.getElementsByTagName("user-id")[0].innerHTML;
        this.message = xml.getElementsByTagName("message")[0].innerHTML;
        this.day = xml.getElementsByTagName("date")[0].getElementsByTagName("day")[0].innerHTML;
        this.month = xml.getElementsByTagName("date")[0].getElementsByTagName("month")[0].innerHTML;
        this.year = xml.getElementsByTagName("date")[0].getElementsByTagName("year")[0].innerHTML;
        this.hour = xml.getElementsByTagName("date")[0].getElementsByTagName("hour")[0].innerHTML;
        this.min = xml.getElementsByTagName("date")[0].getElementsByTagName("min")[0].innerHTML;
    }

    getFormatedDate() {
        return Utils.twoDigits(this.day) + "." +
               Utils.twoDigits(this.month) + "." +
               this.year + " | " +
               Utils.twoDigits(this.hour) + ":" +
               Utils.twoDigits(this.min);
    }


}